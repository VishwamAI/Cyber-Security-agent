import React, { useState } from 'react';
import { ChakraProvider, Box, Flex, Heading, Text, Input, Button, VStack } from '@chakra-ui/react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: userInput }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the response.');
    }
  };

  return (
    <ChakraProvider>
      <Flex direction="column" minH="100vh">
        <Box as="header" bg="teal.500" color="white" py={4}>
          <Heading as="h1" size="lg" textAlign="center">
            SWE-Agent
          </Heading>
        </Box>
        <Box as="main" flex="1" p={4}>
          <VStack spacing={4}>
            <Text fontSize="xl" textAlign="center">
              Welcome to the SWE-Agent interface. Enter your query below.
            </Text>
            <Input
              placeholder="Type your query here..."
              value={userInput}
              onChange={handleInputChange}
            />
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
            {response && (
              <Box p={4} bg="gray.100" borderRadius="md" w="100%">
                <Text>{response}</Text>
              </Box>
            )}
          </VStack>
        </Box>
        <Box as="footer" bg="teal.500" color="white" py={4} textAlign="center">
          {/* Footer content can be added here */}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
