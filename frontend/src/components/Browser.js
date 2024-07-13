import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';

const Browser = () => {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleNavigate = () => {
    setIframeUrl(url);
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl" textAlign="center">
        Web Browser
      </Text>
      <Input
        placeholder="Enter URL here..."
        value={url}
        onChange={handleUrlChange}
      />
      <Button colorScheme="teal" onClick={handleNavigate}>
        Go
      </Button>
      {iframeUrl && (
        <Box w="100%" h="500px" border="1px solid gray">
          <iframe src={iframeUrl} width="100%" height="100%" title="Web Browser" />
        </Box>
      )}
    </VStack>
  );
};

export default Browser;
