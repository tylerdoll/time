const debounce = function(func, wait, immediate) {
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
  constructor(sessionId, handleOnMessage) {
    this.sessionId = sessionId;
    this.handleOnMessage = handleOnMessage;
    this.createSocket();
  }

  createSocket() {
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

  getSession() {
    console.log("Sending request to get session for id", this.sessionId);
    const payload = {
      action: 'getsession',
      sessionId: this.sessionId
    }
    this.ws.send(JSON.stringify(payload));
  }

  sendMessage(data) {
    const payload = JSON.stringify({
      action: 'sendmessage',
      data
    });
    console.log("Sending message", payload);
    this.ws.send(payload);
  }
  lazySendMessage = debounce(this.sendMessage, 500);
}
