import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box width="100%">
      <HStack
        size='lg'
        gap="0px"
        width="inherit"
        bgColor="#06283D"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="20px"
      >
        <Button bgColor="transparent" color="#DFF6FF" size="lg" _hover={{opacity: '0.2'}}>
          Home
        </Button>
        <Button bgColor="transparent" color="#DFF6FF" size="lg" _hover={{opacity: '0.2'}}>
          Library
        </Button>
        <Button bgColor="transparent" color="#DFF6FF" size="lg" _hover={{opacity: '0.2'}}>
          Icon
        </Button>
        <Button bgColor="transparent" color="#DFF6FF" size="lg" _hover={{opacity: '0.2'}}>
          Contract
        </Button>
        <Button bgColor="transparent" color="#DFF6FF" size="lg" _hover={{opacity: '0.2'}}>
          Profile
        </Button>
      </HStack>
    </Box>
  );
};

export default Header;
