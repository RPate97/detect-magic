
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DBGM } from '../gm/[username]';
const sqlite3 = require('sqlite3').verbose();

type PopularityEntry = {
  username: string,
  popularity: number
}
type ErrorResponse = { error: string }

type Data = { data: PopularityEntry[] } | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = new sqlite3.Database('./sqlite/db');
  await db.all(`SELECT username, image, num_reviews, popularity from gms ORDER BY popularity desc`, async (err: any, rows: DBGM[]) => {
    if (err) {
        res.status(500).json({ error: "internal server error" });
        return
    }
        
    const results: PopularityEntry[] = rows.map((row) => { 
        return {
            username: row.username,
            popularity: row.popularity
        }
    });
    res.status(200).json({ data: results })
  });
}
