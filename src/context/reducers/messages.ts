import { MessageType } from "../../ipc";

export type StateType = MessageType[];

export interface Action {
  type: string;
}

export interface ActionState extends Action {
  payload: StateType;
}

export interface ActionPush extends Action {
  payload: MessageType;
}

export const initialState = [] as MessageType[];

export const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "PUSH": {
      const { payload } = action as ActionPush;
      return [...state, payload];
    }
    case "SET": {
      const { payload } = action as ActionState;
      return payload;
    }
    case "GET":
    default:
      return state;
  }
};
