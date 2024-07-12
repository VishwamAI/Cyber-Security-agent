import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Chat from './components/Chat';
import CodeEditor from './components/CodeEditor';
import Browser from './components/Browser';

const App = () => {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Chat />
        <CodeEditor />
        <Browser />
      </Box>
    </ChakraProvider>
  );
};

export default App;
