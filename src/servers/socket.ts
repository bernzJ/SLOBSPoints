import http from "http";
import * as WebSocket from "ws";

const port = 1337;
const server = http.createServer();
export const wss = new WebSocket.Server({ server });

export const start = (): void => {
  // we prob don't need these ?
  /*wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      console.log("received: %s", message);
      ws.send(`Hello, you sent -> ${message}`);
    });
    ws.send("Hi there, I am a WebSocket server");
  });
  */
  server.listen(port, () => {
    console.log(`Data stream server started on port ${port}`);
  });
};
