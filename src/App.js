import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Box className="App" p={5}>
        <header className="App-header">
          <Heading as="h1" size="xl" mb={5}>
            Cybersecurity Challenges
          </Heading>
          <VStack spacing={4}>
            <Box>
              <Heading as="h2" size="md">SQL Injection</Heading>
              <Text>Practice SQL Injection vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Cross-Site Scripting (XSS)</Heading>
              <Text>Practice XSS vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Cross-Site Request Forgery (CSRF)</Heading>
              <Text>Practice CSRF vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Remote Code Execution (RCE)</Heading>
              <Text>Practice RCE vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Local File Inclusion (LFI)</Heading>
              <Text>Practice LFI vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2}>Start Challenge</Button>
            </Box>
          </VStack>
        </header>
      </Box>
    </ChakraProvider>
  );
}

export default App;
