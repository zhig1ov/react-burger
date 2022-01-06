import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLEAR_ORDER_MODAL,
  SORT_CONSTRUCTOR_INGREDIENTS,
  CLEAR_CONSTRUCTOR_INGREDIENTS
} from "../actions/index";


const initialState = {
  constructorElements: [],
  bun: null,

  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredient: null,

  makeOrderRequest: false,
  makeOrderFailed: false,
  currentOrder: null,
  orderNumber: null
}

export const burgerReducer = (state = initialState, action) => {
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
    default: {
      return state
    }
  }
}