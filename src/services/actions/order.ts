import apiLink from '../../utils/constants'

import { AppDispatch, AppThunk } from "../../index"

import { TIngredients } from '../../utils/types';

export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST' 
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS'
export const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED'

export interface IMakeOrderAction {
  readonly type: typeof MAKE_ORDER_REQUEST
}

export interface IMakeOrderSuccessAction {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  currentOrder: TIngredients[] | null;
  orderNumber: number | null;
}

export interface IMakeOrderFailedAction {
  readonly type: typeof MAKE_ORDER_FAILED
}

export type TOrderActions = 
  | IMakeOrderAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction

  export const makeOrderRequest = (): IMakeOrderAction => ({
    type: MAKE_ORDER_REQUEST
  })
  
  // export const makeOrderSuccess = (number: TOrder): IMakeOrderSuccessAction => ({
  //   type: MAKE_ORDER_SUCCESS,
  //   order: number
  // })
  
  export const makeOrderFailed = (): IMakeOrderFailedAction => ({
    type: MAKE_ORDER_FAILED
  })

  export const makeOrder: AppThunk = (ingredientsId: string[]) => (dispatch: AppDispatch) => {
    dispatch(makeOrderRequest())
    makeData(ingredientsId).then(res => {
      if (res && res.success) {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          currentOrder: res.name,
          orderNumber: res.order.orderNumber,
        })
      } else {
        dispatch(makeOrderFailed())
      }
    }).catch(err => console.log(`Error: ${err}`))
  }
  
  export const makeData = async(ingredientsId: string[]) => {
    return await fetch(`${apiLink}/orders`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: ingredientsId
      })
    }).then(_checkResponse)
  }

  function _checkResponse (res: Response) {
    if (res.ok) {
     return res.json()
    }
  
    return Promise.reject(`Ошибка ${res.status}`)
  }

  