//example

const SET_OPTION = 'SET_OPTION';
const CLEAR_OPTIONS = 'CLEAR_OPTIONS';

const initState = {
  option: true,
};

export const setOption = ( option ) => ({ type: SET_OPTION, payload: option });
export const clearOptions = ( options ) => ({ type: CLEAR_OPTIONS, payload: options });

export const reducer = function( state = initState, action ) {
  switch( action.type ) {
  case SET_OPTION:
    return { ...state, option: action.payload };
  case CLEAR_OPTIONS:
    return { ...initState };
  default:
    return state;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reducer,
  setOption,
  clearOptions,
};
