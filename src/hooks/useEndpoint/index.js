import { useState, useEffect, useContext, createContext } from 'react';

const endpointContext = createContext();

export function ProvideEndpoint({ children }) {
  const _endpoint = useProvideEndpoint();
  return <endpointContext.Provider value={_endpoint}>{children}</endpointContext.Provider>;
}

export default function useEndpoint() {
  return useContext(endpointContext);
}

function useProvideEndpoint() {

   async function get({endpoint}){
       return fetch(`http://localhost:1984/${endpoint}`)
       .then(response => response.json())
   }

   async function post({endpoint, data}) {
        const response = await fetch(`http://localhost:1984/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return response.json();
      }
  return {
    get,
    post
  };
}
