import {   
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  TOrderActions } from '../actions/order'
import { TIngredients } from '../../utils/types'

type TOrderState = {
  currentOrder: TIngredients[] | null;
  orderNumber: number | null;
  makeOrderRequest: boolean;
  makeOrderFailed: boolean;
  makeOrderSuccess: boolean;
  makeOrderError: number | null;
};
  
const initialState: TOrderState = {
  currentOrder: null,
  orderNumber: null,
  makeOrderRequest: false,
  makeOrderFailed: false,
  makeOrderSuccess: false,
  makeOrderError: null,
};

export const orderReducer= (state = initialState, action: TOrderActions): TOrderState => {
  switch(action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        makeOrderRequest: true
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: false,
        currentOrder: action.currentOrder,
        orderNumber: action.orderNumber
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: true
      }
    }
    default: {
      return state
    }
  }
}