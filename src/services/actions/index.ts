import { baseUrl } from '../../utils/constants'
import { AppDispatch, AppThunk } from "../../index"
import { TIngredients } from '../../utils/types'


export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT'
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED'
export const ADD_CURRENT_INGREDIENT: 'ADD_CURRENT_INGREDIENT' = 'ADD_CURRENT_INGREDIENT'
export const REMOVE_CURRENT_INGREDIENT: 'REMOVE_CURRENT_INGREDIENT' = 'REMOVE_CURRENT_INGREDIENT'
export const SORT_CONSTRUCTOR_INGREDIENTS: 'SORT_CONSTRUCTOR_INGREDIENTS' = 'SORT_CONSTRUCTOR_INGREDIENTS'
export const CLEAR_CONSTRUCTOR_INGREDIENTS: 'CLEAR_CONSTRUCTOR_INGREDIENTS' = 'CLEAR_CONSTRUCTOR_INGREDIENTS'
export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST' 
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS'
export const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED'
export const CLEAR_ORDER_MODAL: 'CLEAR_ORDER_MODAL' = 'CLEAR_ORDER_MODAL'


export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT
  readonly item: TIngredients
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT
  readonly index: number
}

export interface IAddBun {
  readonly type: typeof ADD_BUN
  readonly item: TIngredients | null
}

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly ingredients: TIngredients[]
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED,
}

export interface IAddCurrentIngredient {
  readonly type: typeof ADD_CURRENT_INGREDIENT,
  item: TIngredients | null
}

export interface IRemoveCurrentIngredient {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT
}

export interface ISortConstructorIngredients {
  readonly type: typeof SORT_CONSTRUCTOR_INGREDIENTS,
  sortedIngredients: TIngredients[]
}

export interface IClearConstructorIngredients {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS
}

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

export interface IClearOrderModal {
  readonly type: typeof CLEAR_ORDER_MODAL
}



export const addIngredient = (item: TIngredients): IAddIngredient => ({
  type: ADD_INGREDIENT,
  item
})

export const removeIngredient = (index: number): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  index
})

export const addBun = (item: TIngredients): IAddBun => ({
  type: ADD_BUN,
  item
})
  
export const getIngredientsRequest = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccess = (ingredients: TIngredients[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
})

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
})

export const addCurrentIngredient = (item: TIngredients | null): IAddCurrentIngredient => ({
  type: ADD_CURRENT_INGREDIENT,
  item
})

export const removeCurrentIngredient = (): IRemoveCurrentIngredient => ({
  type: REMOVE_CURRENT_INGREDIENT
})

export const sortConstructorIngredients = (sortedIngredients: TIngredients[]): ISortConstructorIngredients => ({
  type: SORT_CONSTRUCTOR_INGREDIENTS,
  sortedIngredients
})

export const clearConstructorIngredients = (): IClearConstructorIngredients => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENTS
})

export const makeOrderRequest = (): IMakeOrderAction => ({
  type: MAKE_ORDER_REQUEST
})

export const clearOrderModal = (): IClearOrderModal => ({
  type: CLEAR_ORDER_MODAL
})

// export const makeOrderSuccess = (number: TOrder): IMakeOrderSuccessAction => ({
//   type: MAKE_ORDER_SUCCESS,
//   order: number
// })

export const makeOrderFailed = (): IMakeOrderFailedAction => ({
  type: MAKE_ORDER_FAILED
})



export type TActions = 
  | IAddIngredient
  | IRemoveIngredient
  | IAddBun
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddCurrentIngredient
  | IRemoveCurrentIngredient
  | ISortConstructorIngredients
  | IClearConstructorIngredients
  | IMakeOrderAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction
  | IMakeOrderAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction
  | IClearOrderModal

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

  