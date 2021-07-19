/* eslint-disable */
document.addEventListener("DOMContentLoaded", function () {
  // animation stuff
  function initAnimations() {
    const messageAnim = anime({
      targets: "#eye",
      opacity: 1,
      duration: 500,
      easing: "linear",
    }).finished;

    const eyeAnim = anime({
      targets: "#path823",
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: "#fff",
      easing: "easeInOutSine",
      duration: 2000,
      direction: "linear",
      loop: false,
    }).finished;

    const pupilAnim = anime({
      targets: "#path829",
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: "#fbdb62",
      easing: "easeInOutSine",
      duration: 1000,
      direction: "linear",
      loop: false,
    }).finished;

    const irisAnim = anime({
      targets: "#path828",
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: "#5d4812",
      easing: "easeInOutSine",
      duration: 500,
      direction: "linear",
      loop: false,
    }).finished;
    return Promise.all([messageAnim, eyeAnim, pupilAnim, irisAnim]);
  };
  // end animation stuff

  // core logic
  function connect() {
    const reconnectInterval = 1000 * 3;
    const pingInterval = 1000 * 60;
    const ws = new WebSocket("ws://localhost:1337");
    let pingHandle;

    function ping() {
      ws.send(
        JSON.stringify({
          type: "PING",
        })
      );
    }

    ws.onopen = function (event) {
      console.log("opened client");
      ping();
      if (pingHandle) {
        clearInterval(pingHandle);
      }
      pingHandle = setInterval(ping, pingInterval);
    };

    ws.onerror = function (error) {
      console.log(error);
    };

    ws.onmessage = function (event) {
      // This will set the innerhtml to the current tempate.
      var { template } = JSON.parse(event.data);
      if (template) {
        document.getElementById("message").innerHTML = template;
        initAnimations().then(
          function () {
            anime({
              targets: "#eye",
              opacity: 0,
              delay: 2000,
              duration: 500,
              easing: "linear",
            }).finished;
          }
        );
      }
    };

    ws.onclose = function () {
      console.log("Socket Closed");
      clearInterval(pingHandle);
      setTimeout(connect, reconnectInterval);
    };
  }
  connect();
});
