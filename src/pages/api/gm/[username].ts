// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
const sqlite3 = require('sqlite3').verbose();

type ApiGM = {
  id: string, 
  created: string,
  gmProfile: {
    description: string,
    yearsOfProfessionalGmExperience: number | null,
    yearsOfTtrpgExperience: number | null,
    gmStats: { nextSessionStartTime: string, numReviews: number }
  },
  image: string,
  lastname: string | null,
  modified: string,
  name: string,
  pronouns: null,
  username: string
};

export type DBGM = {
  username: string,
  image: string,
  num_reviews: number,
  popularity: number
}
type ErrorResponse = { error: string }

type Data = { data: DBGM } | ErrorResponse;

async function insertGM(username: string, res: NextApiResponse<Data>, db: any) {
  // fetch the gm from the db
  await axios.get(`https://startplaying.games/api/detect-magic/gms?page=0&username=${username}`)
    .then(function (response) {
      // create a gm object to respond with
      const gm: ApiGM = response.data.gms[0];
      const responseGM: DBGM = {
        username: gm.username,
        image: gm.image,
        num_reviews: gm.gmProfile.gmStats.numReviews,
        popularity: 1,
      };

      // insert gm into cache db
      db.run(`INSERT INTO gms VALUES ("${gm.id}", "${responseGM.username}", "${responseGM.image}", ${responseGM.num_reviews}, ${responseGM.popularity})`);
      res.status(200).json({ data: responseGM });
    })
    .catch(function (error) {
      // handle error fetching from api
      if (error) {
        res.status(500).json({ error: "error fetching gm from api" });
      }
    })
} 

function updateGM(username: string, res: NextApiResponse<Data>, db: any) {
  db.run(`UPDATE gms SET popularity = popularity + 1 WHERE username = "${username}"`);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = req.query

  if (typeof username !== "string") {
    // return an error response
    res.status(500).json({ error: 'you must specify exactly one username' })
    return 
  }

  const db = new sqlite3.Database('./sqlite/db');

  db.serialize(async () => {
    // Create the GMs table if it does not already exist
    db.run("CREATE TABLE IF NOT EXISTS gms (id TEXT PRIMARY KEY, username TEXT UNIQUE, image TEXT, num_reviews INTEGER, popularity INTEGER);");

    // Can I assume the username is unique? 
    // attempt to fetch the gm using their name
    await db.get(`SELECT username, image, num_reviews, popularity from gms WHERE username = "${username}"`, async (err: any, row: DBGM) => {
      if (err) {
        res.status(500).json({ error: "error reading from database" });
        return
      }

      if (row) {
        // if the gm was found in the db then update the fetch count and return the gm
        db.run(`UPDATE gms SET popularity = popularity + 1 WHERE username = "${username}"`);
        const responseGM: DBGM = {
          username: row.username,
          image: row.image,
          num_reviews: row.num_reviews,
          popularity: row.popularity + 1,
        };
        res.status(200).json({ data: responseGM });
      } else {
        await insertGM(username, res, db);
      }
    });
  });
}
