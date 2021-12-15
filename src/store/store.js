
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//reducers
import { reducer as cartReducer } from './cart/reducer.js';

const create = () => {
  const reducer = combineReducers({
    Cart: cartReducer,
  });

  return createStore(
    reducer,
    composeWithDevTools({ trace:true })(
      applyMiddleware( thunk )
    )
  );
};

const store = {
  create
};

export default store;