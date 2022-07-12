import { baseUrl } from '../../utils/constants'
import { AppDispatch, AppThunk } from "../../index"
import { TIngredients, TOrder } from '../../utils/types'
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
         CLEAR_ORDER_MODAL,
         GET_ORDER_REQUEST,
         GET_ORDER_SUCCESS, 
         GET_ORDER_FAILED,
         GET_USER_ORDER_REQUEST, 
         GET_USER_ORDER_SUCCESS, 
         GET_USER_ORDER_FAILED, } from '../action-constants/burger'


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
  currentOrder: TOrder | null;
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

// Get Order
export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  currentOrder: TOrder | null;
  orderNumber: number | null;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

// Get User Order
export interface IGetUserOrderRequestAction {
  readonly type: typeof GET_USER_ORDER_REQUEST;
}

export interface IGetUserOrderSuccessAction {
  readonly type: typeof GET_USER_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface IGetUserOrderFailedAction {
  readonly type: typeof GET_USER_ORDER_FAILED;
}



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
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetUserOrderRequestAction
  | IGetUserOrderSuccessAction
  | IGetUserOrderFailedAction

  