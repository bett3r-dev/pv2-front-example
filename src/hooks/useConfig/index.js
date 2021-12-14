export default function useConfig() {
    return {
        pv2: {
            serverProtocol: process.env.REACT_APP_PV2_SERVER_PROTOCOL,
            serverDomain: process.env.REACT_APP_PV2_SERVER_DOMAIN,
            socketUpgradeRoute:process.env.REACT_APP_PV2_SOCKET_UPGRADE_ROUTE
          }
    };
  }
  