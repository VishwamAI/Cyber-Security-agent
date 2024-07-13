import React, { useState } from 'react';
import { Box, Textarea, Button, VStack, Text } from '@chakra-ui/react';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      const res = await fetch('http://localhost:5000/run_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while running the code.');
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl" textAlign="center">
        Code Editor
      </Text>
      <Textarea
        placeholder="Write your code here..."
        value={code}
        onChange={handleCodeChange}
        rows={10}
      />
      <Button colorScheme="teal" onClick={handleRunCode}>
        Run Code
      </Button>
      {output && (
        <Box p={4} bg="gray.100" borderRadius="md" w="100%">
          <Text>{output}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default CodeEditor;
