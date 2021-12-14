import { createContext, useContext } from 'react';
import useConfig from '../useConfig';
import useLogger from '../useLogger';
import {isDefined} from '@bett3r-dev/crocks';
import {stream} from '@bett3r-dev/flyd';
import {safeResult, jsonParse, I} from '@bett3r-dev/bett3r-utils';

const subscriptionContext = createContext();

function useProvideSubscription() {
  const {log, error, debug} = useLogger();
  const {pv2} = useConfig();
  let ws;
  const subscriptions = {};


  const subscriptionStreamPush = (payload) => {
    return safeResult(isDefined, subscriptions[payload.event])
      .map(stream => stream(payload.data))
      .bimap(()=> error(`Web Socket message for event ${payload.event} with no subscription registred`), I)
  }

  const socketConnect = () => {
    ws = new WebSocket(`${pv2.serverProtocol.replace('http', 'ws')}${pv2.serverDomain}${pv2.socketUpgradeRoute}`);
    
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
  const socketDisconnect = () =>{
    ws.close();
  }
  
  const waitForConnection = (callback, interval = 100 ) => {
    if (ws.readyState === 1) return callback();
    setTimeout(() => {
      waitForConnection(callback, interval);
    }, interval);
  }
  
  const send = (message) => {
    waitForConnection(() => {
      ws.send(JSON.stringify(message))
    })
  } 
  
  const subscribe = (event, filter) => {
    debug('subscribing to event', event, `${filter ? 'with filter': ''}`, `${filter? filter: ''}`)
    send({command: '_subscribeSocket', payload: {event, filter}})
    subscriptions[event] = subscriptions[event] || stream();
    return subscriptions[event]; 
  }

  const unsubscribe = (event) => {
    delete subscriptions[event];
    debug('unsubscribing to event', event);
    send({command: '_unsubscribeSocket', payload: {event}})
  }
  
  return {
    socketConnect,
    socketDisconnect,
    subscribe,
    unsubscribe
  };
}

export function ProvideSubscription({ children }) {
  const _subscription = useProvideSubscription();
  return <subscriptionContext.Provider value={_subscription}>{children}</subscriptionContext.Provider>;
}

export default function useSubscription() {
  return useContext(subscriptionContext);
}
