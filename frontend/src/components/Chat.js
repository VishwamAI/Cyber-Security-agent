import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import AgentState from '../types/AgentState';

const Chat = ({ messages, curAgentState }) => {
  return (
    <VStack spacing={4}>
      <Text fontSize="xl" textAlign="center">
        Chat with the AI Assistant
      </Text>
      <Box className="flex flex-col gap-3">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isLastMessage={messages && index === messages.length - 1}
            awaitingUserConfirmation={
              curAgentState === AgentState.AWAITING_USER_CONFIRMATION
            }
          />
        ))}
      </Box>
    </VStack>
  );
};

export default Chat;
