import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ChatMessage = ({ message, isLastMessage, awaitingUserConfirmation }) => {
  return (
    <Box
      p={4}
      bg={message.sender === 'user' ? 'blue.100' : 'gray.100'}
      borderRadius="md"
      w="100%"
      alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
    >
      <Text>{message.text}</Text>
      {isLastMessage && awaitingUserConfirmation && (
        <Text fontSize="sm" color="red.500">
          Awaiting your confirmation...
        </Text>
      )}
    </Box>
  );
};

export default ChatMessage;
