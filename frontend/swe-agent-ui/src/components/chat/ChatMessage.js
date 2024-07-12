import React, { useState } from "react";
import Markdown from "react-markdown";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { Box, Button, VStack, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ChatMessage = ({ message, isLastMessage, awaitingUserConfirmation }) => {
  const [isCopy, setIsCopy] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { t } = useTranslation();
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(message.content)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1500);
      })
      .catch(() => {
        console.error("Failed to copy message content to clipboard");
      });
  };

  return (
    <Box
      data-testid="message"
      p={3}
      bg={message.sender === "user" ? "gray.700" : "gray.500"}
      color="white"
      maxW="90%"
      overflowY="auto"
      borderRadius="lg"
      position="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <Button
          onClick={copyToClipboard}
          position="absolute"
          top={1}
          right={1}
          p={1}
          bg="gray.600"
          borderRadius="full"
          _hover={{ bg: "gray.700" }}
          aria-label={t("CHAT_INTERFACE$TOOLTIP_COPY_MESSAGE")}
        >
          {isCopy ? <FaClipboardCheck /> : <FaClipboard />}
        </Button>
      )}
      <Markdown>{message.content}</Markdown>
      {isLastMessage && message.sender === "assistant" && awaitingUserConfirmation && (
        <VStack spacing={4} pt={4}>
          <Box>{t("CHAT_INTERFACE$USER_ASK_CONFIRMATION")}</Box>
          <VStack spacing={3}>
            <Tooltip label={t("CHAT_INTERFACE$USER_CONFIRMED")} closeDelay={100}>
              <Button
                bg="gray.700"
                borderRadius="full"
                p={1}
                _hover={{ bg: "gray.800" }}
                onClick={() => {
                  console.log("User confirmed");
                }}
              >
                Confirm
              </Button>
            </Tooltip>
            <Tooltip label={t("CHAT_INTERFACE$USER_REJECTED")} closeDelay={100}>
              <Button
                bg="gray.700"
                borderRadius="full"
                p={1}
                _hover={{ bg: "gray.800" }}
                onClick={() => {
                  console.log("User rejected");
                }}
              >
                Reject
              </Button>
            </Tooltip>
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  isLastMessage: PropTypes.bool,
  awaitingUserConfirmation: PropTypes.bool,
};

export default ChatMessage;
