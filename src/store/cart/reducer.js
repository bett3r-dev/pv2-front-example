import {v4 as uuid} from 'uuid'

const CREATE_CART = 'CREATE_CART';
const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const EMPTY_CART = 'EMPTY_CART';

const initState = {
  isCartCreated: false,
  productList: [],
  cartItems: [],
};

export const createCart = (  ) => ({ type: CREATE_CART });
export const setProductList = ( productList ) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setCartItems = ( cartItems ) => ({ type: SET_CART_ITEMS, payload: cartItems });
export const emptyCart = ( ) => ({ type: EMPTY_CART });

export const reducer = function( state = initState, action ) {
  switch( action.type ) {
  case CREATE_CART:
    return { ...state, isCartCreated: true };
  case SET_PRODUCT_LIST:
    return { ...state, productList: [...(action.payload.filter(item => item.quantity))] };
  case SET_CART_ITEMS:
    return { ...state, cartItems: [...action.payload] };
  case EMPTY_CART:
    return { isCartCreated: false, productList: [], cartItems: [] };
  default:
    return state;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reducer,
  createCart,
  setProductList,
  setCartItems,
  emptyCart 
};
