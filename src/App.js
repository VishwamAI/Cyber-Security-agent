import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeContent, setChallengeContent] = useState('');

  const challenges = {
    sqlInjection: {
      title: 'SQL Injection',
      description: 'Practice SQL Injection vulnerabilities.',
      contentKey: 'sqlInjection'
    },
    xss: {
      title: 'Cross-Site Scripting (XSS)',
      description: 'Practice XSS vulnerabilities.',
      contentKey: 'xss'
    },
    csrf: {
      title: 'Cross-Site Request Forgery (CSRF)',
      description: 'Practice CSRF vulnerabilities.',
      contentKey: 'csrf'
    },
    rce: {
      title: 'Remote Code Execution (RCE)',
      description: 'Practice RCE vulnerabilities.',
      contentKey: 'rce'
    },
    lfi: {
      title: 'Local File Inclusion (LFI)',
      description: 'Practice LFI vulnerabilities.',
      contentKey: 'lfi'
    }
  };

  const handleStartChallenge = async (challengeKey) => {
    console.log(`Starting challenge: ${challengeKey}`);
    setCurrentChallenge(challenges[challengeKey]);
    console.log('Current challenge set to:', challenges[challengeKey]);
    try {
      console.log(`Fetching data from: https://cyber-security-agent-5gzw9h0j.devinapps.com/exploits/${challengeKey}`);
      const response = await fetch(`https://cyber-security-agent-5gzw9h0j.devinapps.com/exploits/${challengeKey}`);
      const data = await response.json();
      console.log('Fetched data:', data);
      if (Array.isArray(data.content)) {
        setChallengeContent(data.content);
      } else {
        setChallengeContent([data.content]);
      }
      console.log('Challenge content set to:', data.content);
    } catch (error) {
      console.error('Error fetching challenge content:', error);
      setChallengeContent('Failed to load challenge content.');
    }
  };

  const renderChallengeContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <Box key={index} p={2} borderWidth="1px" borderRadius="lg" mb={2}>
          <Text><strong>Date:</strong> {item.date}</Text>
          <Text><strong>Title:</strong> {item.title}</Text>
          <Text><strong>Type:</strong> {item.type}</Text>
          <Text><strong>Platform:</strong> {item.platform}</Text>
          <Text><strong>Author:</strong> {item.author}</Text>
        </Box>
      ));
    } else {
      return <Text>{content}</Text>;
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
            {Object.keys(challenges).map((key) => (
              <Box key={key}>
                <Heading as="h2" size="md">{challenges[key].title}</Heading>
                <Text>{challenges[key].description}</Text>
                <Button colorScheme="teal" mt={2} onClick={() => handleStartChallenge(key)}>Start Challenge</Button>
              </Box>
            ))}
          </VStack>
          {currentChallenge && (
            <Box mt={10}>
              <Heading as="h2" size="lg">{currentChallenge.title} Challenge</Heading>
              {renderChallengeContent(challengeContent)}
            </Box>
          )}
        </header>
      </Box>
    </ChakraProvider>
  );
}

export default App;
