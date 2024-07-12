import React from "react";
import ChatMessage from "./ChatMessage";
import { Box, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AgentState = {
  IDLE: "IDLE",
  AWAITING_USER_CONFIRMATION: "AWAITING_USER_CONFIRMATION",
  // Add other states as needed
};

function Chat({ messages, curAgentState }) {
  return (
    <Box>
      <VStack spacing={4}>
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
      </VStack>
    </Box>
  );
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  curAgentState: PropTypes.oneOf(Object.values(AgentState)),
};

export default Chat;
