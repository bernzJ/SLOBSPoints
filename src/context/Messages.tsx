import React, { createContext, useReducer } from "react";
import {
  initialState,
  reducer,
  Action,
  ActionState,
  ActionPush,
  StateType,
} from "./reducers/messages";

export type ContextType = {
  messages: StateType;
  dispatch: React.Dispatch<Action | ActionState | ActionPush>;
};

export const Context = createContext<ContextType>({} as ContextType);

const MessagesProvider = ({
  children,
  init,
}: {
  children: React.ReactNode;
  init?: unknown;
}): JSX.Element => {
  const [messages, dispatch] = useReducer(
    reducer,
    (init as StateType) ?? initialState
  );

  return (
    <Context.Provider value={{ messages, dispatch }}>
      {children}
    </Context.Provider>
  );
};

MessagesProvider.defaultProps = {
  init: null,
};

export default MessagesProvider;
