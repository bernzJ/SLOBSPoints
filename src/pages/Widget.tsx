import React from "react";
import {
  Box,
  Button,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
} from "@chakra-ui/react";
import AceEditor from "react-ace";
import { useAsync, useToggle } from "react-use";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const Ace = ({
  mode,
  theme,
  value,
  placeholder,
  onChange,
}: {
  mode: string;
  theme: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => (
  <AceEditor
    mode={mode}
    maxLines={Infinity}
    name={`${mode}-editor`}
    placeholder={placeholder}
    setOptions={{ useWorker: false }}
    theme={theme}
    tabSize={2}
    width="100%"
    value={value}
    debounceChangePeriod={300}
    onChange={onChange}
  />
);

const Widget = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const [, toggle] = useToggle(false);
  const theme = colorMode === "dark" ? "monokai" : "github";

  const state = useAsync(async () => {
    return window.api.OpenWidget();
  });

  if (state.loading || !state.value) {
    return (
      <Box display="flex" justifyContent="center">
        <Spinner m="50px" size="xl" thickness="4px" speed="0.65s" />
      </Box>
    );
  }

  const renderTabs = () =>
    state.value.map((widget) => (
      <TabPanel key={widget.type}>
        <Button
          mb="10px"
          onClick={() => {
            window.api.ResetWidget({ type: widget.type }).finally(toggle);
          }}
        >
          <Box
            as="svg"
            h="20px"
            w="20px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </Box>
        </Button>
        <Ace
          mode={widget.type}
          placeholder={`Widget's ${widget.type}`}
          theme={theme}
          value={widget.content}
          onChange={(value) => {
            window.api.SaveWidget({ type: widget.type, content: value });
          }}
        />
      </TabPanel>
    ));

  return (
    <Tabs colorScheme="themePurple">
      <TabList>
        <Tab>HTML</Tab>
        <Tab>CSS</Tab>
        <Tab>JAVASCRIPT</Tab>
      </TabList>
      <TabPanels>{renderTabs()}</TabPanels>
    </Tabs>
  );
};

export default Widget;
