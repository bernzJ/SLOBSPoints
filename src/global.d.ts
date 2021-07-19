import { MessageType, WidgetType, WidgetContentType } from "./ipc";
declare global {
  interface Window {
    api: {
      Message: (message: MessageType) => void;
      SaveWidget: (file: WidgetContentType) => Promise<void>;
      OpenWidget: () => Promise<WidgetContentType[]>;
      ResetWidget: (file: WidgetType) => Promise<void>;
      OpenURL: (url: string) => Promise<void>;
    };
  }
}
