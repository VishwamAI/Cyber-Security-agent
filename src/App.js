import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeContent, setChallengeContent] = useState('');

  const handleStartChallenge = async (challenge) => {
    setCurrentChallenge(challenge);
    try {
      const response = await fetch(`https://cyber-security-agent-5gzw9h0j.devinapps.com/exploits/${challenge}`);
      const data = await response.json();
      setChallengeContent(data.content);
    } catch (error) {
      console.error('Error fetching challenge content:', error);
      setChallengeContent('Failed to load challenge content.');
    }
  };

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
              <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge('sql-injection')}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Cross-Site Scripting (XSS)</Heading>
              <Text>Practice XSS vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge('xss')}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Cross-Site Request Forgery (CSRF)</Heading>
              <Text>Practice CSRF vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge('csrf')}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Remote Code Execution (RCE)</Heading>
              <Text>Practice RCE vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge('rce')}>Start Challenge</Button>
            </Box>
            <Box>
              <Heading as="h2" size="md">Local File Inclusion (LFI)</Heading>
              <Text>Practice LFI vulnerabilities.</Text>
              <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge('lfi')}>Start Challenge</Button>
            </Box>
          </VStack>
          {currentChallenge && (
            <Box mt={5}>
              <Heading as="h3" size="lg">{currentChallenge.replace('-', ' ').toUpperCase()} Challenge</Heading>
              <Text>{challengeContent}</Text>
            </Box>
          )}
        </header>
      </Box>
    </ChakraProvider>
  );
}

export default App;
