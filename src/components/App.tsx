import React, { Suspense } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import TwitchClient from "./TwitchClient";
import Header from "./Header";
import routes from "../routes";
import { asJSON, getItem } from "../utils/storage";
import SettingsProvider from "../context/Settings";
import MessagesProvider from "../context/Messages";

const App = (): JSX.Element => {
  const initSetting = asJSON(getItem("settings"));
  const initMessages = asJSON(getItem("messages"));
  return (
    <Router>
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center">
            <Spinner m="50px" size="xl" thickness="4px" speed="0.65s" />
          </Box>
        }
      >
        <SettingsProvider init={initSetting}>
          <MessagesProvider init={initMessages}>
            <Header />
            <TwitchClient />
            <Switch>
              {Object.values(routes).map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </MessagesProvider>
        </SettingsProvider>
      </Suspense>
    </Router>
  );
};

export default App;
