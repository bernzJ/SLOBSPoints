import { contextBridge, ipcRenderer } from "electron";

type MessageType = {
  clientID: string;
  template: string;
};

interface WidgetType {
  type: string;
}

interface WidgetContentType extends WidgetType {
  content: string;
}
enum IpcRequest {
  Message = "MESSAGE",
  SaveWidget = "SAVE_WIDGET",
  OpenWidget = "OPEN_WIDGET",
  ResetWidget = "RESET_WIDGET",
  OpenURL = "OPEN_URL",
}

contextBridge.exposeInMainWorld("api", {
  Message: (message: MessageType): void => {
    ipcRenderer.invoke(IpcRequest.Message, message);
  },
  OpenWidget: (): Promise<WidgetContentType[]> => {
    return ipcRenderer.invoke(IpcRequest.OpenWidget);
  },
  SaveWidget: (file: WidgetContentType): Promise<void> => {
    return ipcRenderer.invoke(IpcRequest.SaveWidget, file);
  },
  ResetWidget: (file: WidgetType): Promise<void> => {
    return ipcRenderer.invoke(IpcRequest.ResetWidget, file);
  },
  OpenURL: (url: string): Promise<void> => {
    return ipcRenderer.invoke(IpcRequest.OpenURL, url);
  },
});
