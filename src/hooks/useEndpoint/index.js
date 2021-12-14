export default function useEndpoint() {
  //TODO: config -> url
   async function get({endpoint}){
       return fetch(`http://localhost:1984${endpoint}`)
       .then(response => response.json())
   }

   async function post({endpoint, data}) {
    const response = await fetch(`http://localhost:1984${endpoint}`, Object.assign({
        method: 'POST',
      }, data !== undefined && {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ));
    return response.json();
  }
  return {
    get,
    post
  };
}
