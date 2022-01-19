import apiLink from '../../utils/constants'
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
export const CLEAR_ORDER_MODAL: 'CLEAR_ORDER_MODAL' = 'CLEAR_ORDER_MODAL'

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT
  readonly id: string
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT
  readonly index: number
}

export interface IAddBun {
  readonly type: typeof ADD_BUN
  readonly id: string
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
//
export interface IAddCurrentIngredient {
  readonly type: typeof ADD_CURRENT_INGREDIENT,
}

export interface IRemoveCurrentIngredient {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT,
}

export interface ISortConstructorIngredients {
  readonly type: typeof SORT_CONSTRUCTOR_INGREDIENTS,
}

export interface IClearConstructorIngredients {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS,
}

export interface IClearOrderModal {
  readonly type: typeof CLEAR_ORDER_MODAL,
}

export const AddIngredient = (id: string): IAddIngredient => ({
  type: ADD_INGREDIENT,
  id
})

export const RemoveIngredient = (index: number): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  index
})

export const AddBun = (id: string): IAddBun => ({
  type: ADD_BUN,
  id
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

export const AddCurrentIngredient = (): IAddCurrentIngredient => ({
  type: ADD_CURRENT_INGREDIENT,
})

export const RemoveCurrentIngredient = (): IRemoveCurrentIngredient => ({
  type: REMOVE_CURRENT_INGREDIENT,
})

export const SortConstructorIngredients = (): ISortConstructorIngredients => ({
  type: SORT_CONSTRUCTOR_INGREDIENTS,
})

export const ClearConstructorIngredients = (): IClearConstructorIngredients => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENTS,
})

export const ClearOrderModal = (): IClearOrderModal => ({
  type: CLEAR_ORDER_MODAL,
})

export type TIngredientsActions = 
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
  return await fetch(`${apiLink}/ingredients`).then(_checkResponse)
}

function _checkResponse (res: Response) {
  if (res.ok) {
   return res.json()
  }

  return Promise.reject(`Ошибка ${res.status}`)
}