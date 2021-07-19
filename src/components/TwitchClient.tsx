import React, { useEffect, useContext } from "react";
import { useToggle } from "react-use";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { ApiClient } from "twitch";
import { StaticAuthProvider } from "twitch-auth";
import {
  PubSubClient,
  PubSubListener,
  PubSubRedemptionMessage,
} from "twitch-pubsub-client";

import { Context as SettingsContext } from "../context/Settings";
import { Context as MessagesContext } from "../context/Messages";
import Timer from "../utils/timer";
import { setItem } from "../utils/storage";

type MessageDataType = {
  channelId: string;
  oAuth: string;
};

const TwitchClient = (): JSX.Element => {
  const { settings, dispatch: dispatchSettings } = useContext(SettingsContext);
  const { messages, dispatch: dispatchMessage } = useContext(MessagesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isError, setIsError] = useToggle(true);
  const toast = useToast();

  useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      const data = event.data as MessageDataType;
      if (data.oAuth) {
        setItem("settings", JSON.stringify({ ...settings, oAuth: data.oAuth }));
        dispatchSettings({ type: "SET_OAUTH", payload: data.oAuth });
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    setItem("messages", JSON.stringify(messages));
    const stop = Timer(() => {
      if (messages.length > 0) {
        const payload = [...messages];
        const message = payload.pop();
        dispatchMessage({ type: "SET", payload });
        window.api.Message(message);
      }
    }, settings.cooldown);

    return () => stop();
  }, [messages]);

  useEffect(() => {
    let listener: PubSubListener<never>;
    if (settings.oAuth && settings.clientID) {
      const listen = async () => {
        const authProvider = new StaticAuthProvider(
          settings.clientID,
          settings.oAuth
        );
        const apiClient = new ApiClient({ authProvider });

        const pubSubClient = new PubSubClient();
        const userId = await pubSubClient.registerUserListener(apiClient);
        listener = await pubSubClient.onRedemption(
          userId,
          (message: PubSubRedemptionMessage) => {
            if (message.status === "FULFILLED") {
              dispatchMessage({
                type: "PUSH",
                payload: {
                  clientID: message.userId,
                  template: settings.template.replace(
                    "{name}",
                    message.userName
                  ),
                },
              });
            }
          }
        );
      };
      listen()
        .then(() => setIsError(false))
        .catch((e) => {
          setIsError(true);
          toast({
            title: "Error",
            description: e.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
    return () => {
      listener?.remove();
    };
  }, [settings, toast, setIsError]);

  return (
    <Box
      h="60px"
      w="10px"
      display="flex"
      alignItems="center"
      bg={isError ? "#ed4245" : "#3ba55c"}
      mb="10px"
      transition="all"
      transitionDuration="0.5s"
      overflow="hidden"
      _hover={{ width: "120px" }}
      cursor="pointer"
      onClick={onOpen}
    >
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login with Twitch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as="iframe"
              sandbox="allow-scripts"
              w="100%"
              h="250px"
              src={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${settings.clientID}&state=${settings.clientID}&redirect_uri=http://localhost:8080/login&scope=channel:read:redemptions`}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Text whiteSpace="nowrap" ml="10px" color="#fff">
        {isError ? "Error" : "Running"}
      </Text>
    </Box>
  );
};

export default TwitchClient;
