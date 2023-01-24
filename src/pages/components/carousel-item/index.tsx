import { Flex, Box, Text, Spacer, Heading } from "@chakra-ui/react"
import Image from "next/image"

export type Spell = {
    name: string,
    level: number,
    school: string,
    castTime: string,
    range: string,
    components: string,
    materials: string,
    duration: string,
    description: string,
    image: string
}

export const CarouselItem = (props: any) => {
    const { index, ...remainingProps } = props;
    const item: Spell = props.item
    return (
        <div {...remainingProps}>
            <Flex width="100%" flexDir="column" alignItems="start" justifyContent="start" borderColor="white" px="5">
                <Box border="2px" borderColor="whiteAlpha.900" borderRadius="lg" height="90vh" overflow="scroll">
                    <Box width="100%" height="50vh" flexDir="column" justifyContent="center" borderRadius={5} overflow="hidden" position="relative">
                        <Image src={item.image} alt={item.name} layout="fill" style={{ objectFit: "cover" }} />
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