import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useToggle } from "react-use";

import { Context as SettingsContext } from "../context/Settings";
import { setItem } from "../utils/storage";

type ToggleType = {
  enabled: boolean;
  show?: boolean;
  toggle?: (show?: boolean) => void;
};

const TextField = ({
  text,
  placeholder,
  func,
  toggle = { enabled: false },
}: {
  text: string;
  placeholder: string;
  func: UseFormRegisterReturn;
  toggle?: ToggleType;
}) => (
  <HStack justifyContent="space-between">
    <Text display={{ base: "none", md: "block" }}>{text}</Text>
    <InputGroup width={{ base: "100%", md: "60%" }}>
      <Input
        type={toggle.enabled && !toggle.show ? "password" : "text"}
        placeholder={placeholder}
        {...func}
      />
      {toggle.enabled && (
        <InputRightElement width="46px">
          <Button h="28px" size="sm" onClick={() => toggle.toggle()}>
            {toggle.show ? (
              <Box
                as="svg"
                h="15px"
                w="15px"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </Box>
            ) : (
              <Box
                as="svg"
                h="15px"
                w="15px"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </Box>
            )}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  </HStack>
);

const Settings = (): JSX.Element => {
  const { dispatch, settings } = useContext(SettingsContext);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: settings,
  });
  const [show, toggle] = useToggle(false);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(settings);
    }
  }, [formState, reset, settings]);

  const onSubmit = ({
    clientID,
    rewardID,
    template,
    cooldown,
  }: {
    clientID: string;
    rewardID: string;
    template: string;
    cooldown: number;
  }) => {
    const payload = { clientID, rewardID, template, cooldown };
    setItem("settings", JSON.stringify(payload));
    return dispatch({
      type: "SET",
      payload,
    });
  };
  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      m="auto"
      w={{ base: "100%", lg: "50%" }}
      align="stretch"
      px="5"
    >
      <TextField
        text="Client ID"
        placeholder="Set your Client ID"
        func={register("clientID", { required: true })}
        toggle={{ enabled: true, show, toggle }}
      />
      <TextField
        text="Reward ID"
        placeholder="Set your Reward ID"
        func={register("rewardID", { required: true })}
      />
      <TextField
        text="Template"
        placeholder="prefix {name} suffix"
        func={register("template", { required: true })}
      />
      <TextField
        text="Cooldown"
        placeholder="Cooldown between each notifications"
        func={register("cooldown", { required: true, valueAsNumber: true })}
      />

      <HStack justifyContent="flex-end">
        <Button type="submit" disabled={!formState.isDirty}>
          <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            width="20px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </Box>
        </Button>
      </HStack>
    </VStack>
  );
};

export default Settings;
