import React, { useContext } from "react";
import {
  HStack,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";
import { useToggle } from "react-use";

import Reward from "../components/Reward";
import Replay from "../components/Replay";
import { Context as MessagesContext } from "../context/Messages";

const Rewards = (): JSX.Element => {
  const { dispatch: dispatchMessage, messages } = useContext(MessagesContext);
  const [isOpen, setIsOpen] = useToggle(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const clear = () => {
    dispatchMessage({ type: "SET", payload: [] });
    setIsOpen(false);
  };
  return (
    <VStack>
      <HStack w="100%" justifyContent="flex-end">
        <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={close}>
          <PopoverTrigger>
            <Button ml="10px" onClick={open}>
              <Box
                as="svg"
                h="20px"
                w="20px"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </Box>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Are you sure ?</PopoverHeader>
            <PopoverBody>Do you want to clear the reward queue ?</PopoverBody>
            <PopoverFooter
              border="0"
              d="flex"
              alignItems="center"
              justifyContent="flex-end"
              pb={4}
            >
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={clear}>
                  Yes
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        <Replay />
      </HStack>
      {messages.map((item) => {
        return (
          <Reward
            key={item.clientID}
            id={item.clientID}
            template={item.template}
          />
        );
      })}
    </VStack>
  );
};

export default Rewards;
