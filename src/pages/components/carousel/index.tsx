import { Box, Flex, Spinner } from '@chakra-ui/react';
import Slider from "react-slick";
import Head from "next/head";
import { CarouselItem, Spell } from '../carousel-item';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks'

export const MagicCarousel = () => {
    // Fetch spells using axios hook
    const [slides, setSlides] = useState<Spell[]>([]);
    const [page, setPage] = useState(1)
    const [{ data, loading, error }] = useAxios(
        `https://startplaying.games/api/detect-magic/spells?page=${page}`,
    )
  
    // on hook finished loading, push spells into state
    useEffect(() => {         
        if (loading === false) {
            setSlides((currentSlides) => [...currentSlides, ...data.spells])
        }
    }, [data, loading])

    // when the current slide gets close to the end of the array, update page state var to trigger axios to fetch the next page
    function load(currentSlide: number) {
        if (slides.length - currentSlide < 4 && loading !== true) {
            setPage(page + 1);
        }
    }

    // Defined variables for the carousel
    const settings = {
        className: "center",
        centerMode: true,
        infinite: false,
        lazyLoad: true,
        slidesToShow: 1,
        speed: 200,
        arrows: false,
        centerPadding: "10%",
        focusOnSelect: loading === false,
        initialSlide: 0
    };

    // Render nothing until the slides have loaded
    // Normally I would use a spinner or skeleton, but the API is so fast it doesn't really matter
    if (loading && slides.length === 0) {
        return <></>
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Box width="100vw" height="100vh" backgroundColor="black">
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <Box width="100%" alignItems="center">
                        <Slider {...settings} lazyLoad="anticipated" afterChange={load}>
                            {slides.map((el, index) => <CarouselItem key={index} item={el}/>)}
                        </Slider>                      
                    </Box>                
                </Flex>                
            </Box>
        </>
    );
}