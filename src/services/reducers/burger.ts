import {
  ADD_INGREDIENT,
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

} from "../action-constants/burger"
import { TActions } from "../actions/index"

import { TIngredients } from '../../utils/types'

type TInitialState = {
  constructorElements: TIngredients[],
  bun: TIngredients | null,

  ingredients: TIngredients[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,

  currentIngredient: TIngredients | null

  currentOrder: TIngredients[] | null;
  orderNumber: number | null;
  makeOrderRequest: boolean,
  makeOrderFailed: boolean,
}

const initialState: TInitialState = {
  constructorElements: [],
  bun: null,

  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredient: null,

  currentOrder: null,
  orderNumber: null,
  makeOrderRequest: false,
  makeOrderFailed: false,
}

export const burgerReducer = (state = initialState, action: TActions): TInitialState => {
  switch(action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorElements: [...state.constructorElements, action.item]
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorElements: [...state.constructorElements].filter((_, i) => action.index !== i)
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.item
      }
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item
      }
    }
    case REMOVE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null
      }
    }

    case SORT_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorElements: action.sortedIngredients
      }
    }
    case CLEAR_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorElements: [],
        bun: null
      }
    }
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
    case CLEAR_ORDER_MODAL: {
      return {
        ...state,
        orderNumber: null
      }
    }
    default: {
      return state
    }
  }
}



