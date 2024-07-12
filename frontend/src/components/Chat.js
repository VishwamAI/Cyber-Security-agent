import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    console.log('handleSubmit function called');
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
      console.log('Response from backend:', data);
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      console.error('Error details:', error.message);
      setResponse('An error occurred while generating the response.');
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl" textAlign="center">
        Chat with the AI Assistant
      </Text>
      <Input
        placeholder="Type your message here..."
        value={userInput}
        onChange={handleInputChange}
      />
      <Button colorScheme="teal" onClick={() => {
        console.log('Send button clicked');
        handleSubmit();
      }}>
        Send
      </Button>
      {response && (
        <Box p={4} bg="gray.100" borderRadius="md" w="100%">
          <Text>{response}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Chat;
