import React, { useState } from 'react';
import { ChakraProvider, Box, Button, VStack } from '@chakra-ui/react';
import Chat from './components/Chat';
import CodeEditor from './components/CodeEditor';
import Browser from './components/Browser';
import AgentState from './types/AgentState';

const App = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [curAgentState, setCurAgentState] = useState(AgentState.IDLE);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { sender: 'user', text: message }]);
    // Here you can add logic to handle the message, e.g., send it to the backend
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4}>
          <Button onClick={() => setActiveTab('chat')} colorScheme={activeTab === 'chat' ? 'teal' : 'gray'}>
            Chat
          </Button>
          <Button onClick={() => setActiveTab('codeEditor')} colorScheme={activeTab === 'codeEditor' ? 'teal' : 'gray'}>
            Code Editor
          </Button>
          <Button onClick={() => setActiveTab('browser')} colorScheme={activeTab === 'browser' ? 'teal' : 'gray'}>
            Browser
          </Button>
        </VStack>
        {activeTab === 'chat' && <Chat messages={messages} curAgentState={curAgentState} onSendMessage={handleSendMessage} />}
        {activeTab === 'codeEditor' && <CodeEditor />}
        {activeTab === 'browser' && <Browser />}
      </Box>
    </ChakraProvider>
  );
};

export default App;
