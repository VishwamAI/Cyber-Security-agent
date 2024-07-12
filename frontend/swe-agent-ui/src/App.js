import React from 'react';
import { ChakraProvider, Box, Flex, Heading, Text, Link } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" minH="100vh">
        <Box as="header" bg="teal.500" color="white" py={4}>
          <Heading as="h1" size="lg" textAlign="center">
            SWE-Agent
          </Heading>
        </Box>
        <Box as="main" flex="1" p={4}>
          <Text fontSize="xl" textAlign="center">
            Welcome to the SWE-Agent interface. Edit <code>src/App.js</code> and save to reload.
          </Text>
        </Box>
        <Box as="footer" bg="teal.500" color="white" py={4} textAlign="center">
          <Link href="https://reactjs.org" isExternal>
            Learn React
          </Link>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
