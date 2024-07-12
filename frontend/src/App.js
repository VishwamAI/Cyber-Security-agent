import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Chat from './components/Chat';

const App = () => {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Chat />
      </Box>
    </ChakraProvider>
  );
};

export default App;
