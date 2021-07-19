export type SettingsType = {
  clientID: string;
  rewardID: string;
  template: string;
  cooldown: number;
};

export interface StateType extends SettingsType {
  oAuth: string;
}

export interface Action {
  type: string;
}

export interface ActionString extends Action {
  payload: string;
}

export interface ActionSettings extends Action {
  payload: SettingsType;
}

export const initialState = {
  clientID: "",
  rewardID: "",
  template: "{name}",
  cooldown: 5000,
  oAuth: "",
};

export const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "SET_OAUTH": {
      const { payload } = action as ActionString;
      return {
        ...state,
        oAuth: payload,
      };
    }
    case "SET": {
      const { payload } = action as ActionSettings;
      return { ...state, ...payload };
    }
    case "GET":
    default:
      return state;
  }
};
