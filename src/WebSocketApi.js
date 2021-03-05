const debounce = function(func, wait, immediate) {
  /*
   * Source is from https://davidwalsh.name/javascript-debounce-function
   *
   * The point of debounce is to limit the frequency of which a function is
   * called.
   */
	let timeout;

	return function() {
		const context = this, args = arguments;

		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
};

export default class WebSocketAPI {
  constructor(handleOnMessage, handleOnDisconnect) {
    this.handleOnMessage = handleOnMessage;
    this.handleOnDisconnect = handleOnDisconnect;
    this.createSocket();
  }

  createSocket() {
    /*
     * Creates the socket and attaches event handlers.
     */
    const url = 'wss://qufgkhoacj.execute-api.us-east-2.amazonaws.com/Prod';
    const ws = new WebSocket(url);
    ws.onopen = (event) => {
      console.log("Connected to web socket", event);
      this.getSession();
    }
    ws.onclose = () => {
      console.log("Disconnected from web socket. Reconnecting.");
      this.createSocket();
    }
    ws.onmessage = (event) => {
      console.log("Got message from web socket", event);
      this.handleOnMessage(JSON.parse(event.data));
    }
    this.ws = ws;
  }

  getSession(id='default') {
    /*
     * Gets a session from the database.
     *
     * Args
     *  id: ID of session to get
     */
    console.log("Sending request to get session");
    const payload = {
      action: 'getsession',
      id
    }
    this.ws.send(JSON.stringify(payload));
  }

  sendMessage(data) {
    /*
     * Sends a message to the socket.
     *
     * Args
     *  data: object containing the data to send to the socket
     */
    const payload = JSON.stringify({
      action: 'sendmessage',
      data
    });
    console.log("Sending message", payload);
    this.ws.send(payload);
  }

  /*
   * Send a message after the user has stopped updating.
   */
  lazySendMessage = debounce(this.sendMessage, 500);
}
