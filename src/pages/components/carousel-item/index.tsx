import { Flex, Box, Text, Spacer, Heading } from "@chakra-ui/react"
import Image from "next/image"

const item = {
    name: "Globe Of Invulnerability",
    level: 6,
    school: "abjuration",
    castTime: "1 action",
    range: "self (10-foot radius)",
    components: "VSM",
    materials: "a glass or crystal bead that shatters when the spell ends",
    duration: "concentration, up to 1 minute",
    description: "An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration. Any spell of 5th level or lower cast from outside the barrier can't affect creatures or objects within it, even if the spell is cast using a higher level spell slot. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded fram the areas affected by such spells. At Higher Levels. When you cast this spell using a spell slot of 7th level or higher, the barrier blocks spells of one level higher for each slot level above 6th.",
    image: "https://coding-challenge-images.s3.us-west-1.amazonaws.com/globe_of_invulnerability.jpeg"
}

export const CarouselItem = (props: any) => {
    const { index, ...remainingProps } = props;
    return (
        <div {...remainingProps}>
            <Flex width="100%" flexDir="column" alignItems="start" justifyContent="start" borderColor="white" px="5">
                <Box border="2px" borderColor="whiteAlpha.900" borderRadius="lg">
                    <Box width="100%" height="60vh" flexDir="column" justifyContent="center" borderRadius={5} overflow="hidden" position="relative">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                        {/* <Box borderRadius="md">
                            <Image src={image} alt={image} width={400} height={300} />
                        </Box> */}
                    </Box> 
                    <Flex direction="row" mt="2" mx="2">
                        <Flex direction="column">
                            <Text color="whiteAlpha.900">
                                {item.name}
                            </Text>  
                            <Text color="whiteAlpha.900">
                                {item.school}
                            </Text>   
                            <Text color="whiteAlpha.900">
                                {item.duration}
                            </Text>   
                        </Flex>
                        <Spacer />
                        <Flex direction="column" alignItems="end">
                            <Text color="whiteAlpha.900">
                                {item.level}
                            </Text>  
                            <Text color="whiteAlpha.900">
                                {item.castTime}
                            </Text>   
                            <Text color="whiteAlpha.900">
                                {item.range}
                            </Text>   
                        </Flex>
                    </Flex>  
                    <Flex direction="column" mt="5" mx="2">
                        <Heading color="whiteAlpha.600" size="md">
                            Materials
                        </Heading>
                        <Text color="whiteAlpha.900">
                            {item.components}
                        </Text>    
                        <Text color="whiteAlpha.900">
                            {item.materials}
                        </Text>                      
                    </Flex>
                    <Flex direction="column" mt="5" mb="3" mx="2">
                        <Heading color="whiteAlpha.600" size="md">
                            Description
                        </Heading>
                        <Text color="whiteAlpha.900">
                            {item.description}
                        </Text>                      
                    </Flex> 
                </Box>
            </Flex>
        </div>
    )
}