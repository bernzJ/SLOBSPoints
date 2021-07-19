export type MessageType = {
  clientID: string;
  template: string;
};

export interface WidgetType {
  type: string;
}

export interface WidgetContentType extends WidgetType {
  content: string;
}

export enum IpcRequest {
  Message = "MESSAGE",
  SaveWidget = "SAVE_WIDGET",
  OpenWidget = "OPEN_WIDGET",
  ResetWidget = "RESET_WIDGET",
  OpenURL = "OPEN_URL",
}
