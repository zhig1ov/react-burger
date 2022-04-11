import { baseUrl } from '../../utils/constants'
import { AppDispatch, AppThunk } from "../../index"
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed, makeOrderRequest, makeOrderFailed} from '../actions/index'
import { ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  SORT_CONSTRUCTOR_INGREDIENTS,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLEAR_ORDER_MODAL } from '../action-constants/burger'

  export const getIngredients : AppThunk = () => (dispatch: AppDispatch) => {

    dispatch(getIngredientsRequest())
    downloadData().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data))
      } else {
        dispatch(getIngredientsFailed())
      }
    }).catch(err => console.log(`Error: ${err}`))
  }


const downloadData = async () => {
  return await fetch(`${baseUrl}/ingredients`).then(_checkResponse)
}

export function _checkResponse (res: Response) {
  if (res.ok) {
   return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

  export const makeOrder: AppThunk = (ingredientsId: string[]) => (dispatch: AppDispatch) => {
    dispatch(makeOrderRequest())
    makeData(ingredientsId).then(res => {
      if (res && res.success) {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          currentOrder: res.name,
          orderNumber: res.order.number,
        })
      } else {
        dispatch(makeOrderFailed())
      }
    }).catch(err => console.log(`Error: ${err}`))
  }
  
  export const makeData = async(ingredientsId: string[]) => {
    return await fetch(`${baseUrl}/orders`, {
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

  