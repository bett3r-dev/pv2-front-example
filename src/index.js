import React from 'react';
import ReactDOM from 'react-dom';
import './assets/tailwind.css'; //defined in package.json
import store from './store/store.js';
// import { ProvideAuth } from './hooks/useAuth';
import { ProvideTranslation } from './hooks/useTranslation';
import { ProvideSubscription } from './hooks/useSubscription';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import { ProvideEndpoint } from './hooks/useEndpoint';
const appStore = store.create();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      {/* <ProvideAuth> */}
      <ProvideEndpoint>
        <ProvideTranslation>
          <ProvideSubscription>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProvideSubscription>
        </ProvideTranslation>
      </ProvideEndpoint>
      {/* </ProvideAuth> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
