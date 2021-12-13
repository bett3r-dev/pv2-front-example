import { createContext, useContext } from 'react';
import { socketConnect, subscribe, unsubscribe } from '../../services/pv2';

const subscriptionContext = createContext();

function useProvideSubscription() {
  return {
    socketConnect,
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
