import React from "react";
import { Box, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";

const Reward = ({
  id,
  template,
}: {
  id: string;
  template: string;
}): JSX.Element => {
  const containerColor = useColorModeValue("#f1f1f1", "#232b3c");
  const hover = useColorModeValue("#dddddd", "#2b3449");
  return (
    <Box
      w={{ base: "100%", lg: "50%" }}
      bg={containerColor}
      p="5"
      _hover={{ bg: hover }}
      cursor="pointer"
    >
      <HStack justifyContent="start">
        <VStack alignItems="self-start" spacing={0}>
          <Text fontSize="sm" letterSpacing="widest">
            ID : {id}
          </Text>
          <Text fontSize="30px" fontWeight="semibold">
            {template}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Reward;
