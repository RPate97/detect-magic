import { Box, Flex } from '@chakra-ui/react';
import Slider from "react-slick";
import Head from "next/head";
import { CarouselItem } from '../carousel-item';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks'

export const MagicCarousel = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        centerPadding: "300px",
    };    

    const [slides, setSlides] = useState([]);
    const [page, setPage] = useState(1)
    const [loadedPath, setLoadedPath] = useState(0)
    const [{ data, loading, error }, refetch] = useAxios(
        `https://startplaying.games/api/detect-magic/spells?page=${page}`,
    )

    console.log(data);
  
    useEffect(() => {
        if (loading === false) {
            // setSlides((currentSlides) => [...currentSlides, ...data])
        }
    }, [data, loading])

    function load(currentSlide: number) {
        if (slides.length - currentSlide < 5) {
            refetch();
        }
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Box width="100vw" height="100vh" backgroundColor="black">
                <Flex justifyContent="center" alignItems="center">
                    <Box width="95%" >
                        <Slider {...settings} lazyLoad="anticipated" afterChange={load}>
                            {slides.map((el, index) => <CarouselItem index={index} key={index} />)}
                        </Slider>                            
                    </Box>                
                </Flex>                
            </Box>
        </>
    );
}