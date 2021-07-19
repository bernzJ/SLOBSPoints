import React, { useContext } from "react";
import { Box, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Context as MessagesContext } from "../context/Messages";
import { Context as SettingsContext } from "../context/Settings";

const Replay = (): JSX.Element => {
  const { dispatch: dispatchMessage } = useContext(MessagesContext);
  const { settings } = useContext(SettingsContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ name }: { name: string }) => {
    reset();
    return dispatchMessage({
      type: "PUSH",
      payload: {
        clientID: (new Date().valueOf() % 9e6).toString(36),
        template: settings.template.replace("{name}", name),
      },
    });
  };
  return (
    <Box
      as="form"
      ml="auto"
      px="10px"
      w={{ base: "100%", sm: "60%", md: "40%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input placeholder="Play" {...register("name", { required: true })} />
    </Box>
  );
};

export default Replay;
