import React, { createContext, useReducer } from "react";
import {
  initialState,
  reducer,
  Action,
  ActionString,
  ActionSettings,
  StateType,
} from "./reducers/settings";

export type ContextType = {
  settings: StateType;
  dispatch: React.Dispatch<Action | ActionString | ActionSettings>;
};

export const Context = createContext<ContextType>({} as ContextType);

const SettingsProvider = ({
  children,
  init,
}: {
  children: React.ReactNode;
  init?: unknown;
}): JSX.Element => {
  const [settings, dispatch] = useReducer(
    reducer,
    (init as StateType) ?? initialState
  );

  return (
    <Context.Provider value={{ settings, dispatch }}>
      {children}
    </Context.Provider>
  );
};

SettingsProvider.defaultProps = {
  init: null,
};

export default SettingsProvider;
