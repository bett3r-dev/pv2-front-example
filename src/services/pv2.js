import {config} from './config';
import {log, error, debug} from './logger';
import {isDefined} from '@bett3r-dev/crocks';
import {stream} from '@bett3r-dev/flyd';
import {safeResult, jsonParse, I} from '@bett3r-dev/bett3r-utils';

let ws;
export const subscriptions = {};

export const subscriptionStreamPush = (payload) => {
  return safeResult(isDefined, subscriptions[payload.event])
    .map(stream => stream(payload.data))
    .bimap(()=> error(`Web Socket message for event ${payload.event} with no subscription registred`), I)
  // if (isDefined(subscriptions[payload.event]))
  //   subscriptions[payload.event](payload.data);
  // else error(`Web Socket message for event ${payload.event} with no subscription registred`)
}
export const socketConnect = () => {
  ws = new WebSocket(`ws://${config.pv2.serverDomain}${config.pv2.socketUpgradeRoute}`);
  ws.onmessage = function message(message) {
    jsonParse(message.data)
      .map(subscriptionStreamPush)
  };
  return new Promise(resolve=>{
    ws.onopen = function open() {
      log('Conección iniciada con el Server');
      resolve();
    };
  })

}

const waitForConnection = (callback, interval = 100 ) => {
  if (ws.readyState === 1) return callback();
  setTimeout(() => {
    waitForConnection(callback, interval);
  }, interval);
}

export const send = (message) => {
  waitForConnection(() => {
    ws.send(JSON.stringify(message))
  })
} 

export const subscribe = (event, filter) => {
  debug('subscribing to event', event, `${filter ? 'with filter': ''}`, `${filter? filter: ''}`)
  send({command: '_subscribeSocket', payload: {event, filter}})
  subscriptions[event] = subscriptions[event] || stream();
  return subscriptions[event]; 
}
export const unsubscribe = (event) => {
  delete subscriptions[event];
  debug('unsubscribing to event', event);
  send({command: '_unsubscribeSocket', payload: {event}})
}


export async function post({endpoint, data}) {
  const response = await fetch(`http://localhost:1984/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}