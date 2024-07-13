import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box display="flex" mt={4}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your message..."
        mr={2}
      />
      <Button onClick={handleSendMessage} colorScheme="teal">
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
