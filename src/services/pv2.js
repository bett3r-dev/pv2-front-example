import WebSocket from 'ws';

export const create = (config, logger) => {
  let ws;

  const connect = () => {
    ws = new WebSocket(`ws://${config.serverUrl}/path`);
    ws.on('open', function open() {
      logger.log('Conección iniciada con el Server');
      ws.send(JSON.stringify({message: 'subscribe', data: {}}))
    });
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  }

}

