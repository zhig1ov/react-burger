import apiLink from '../../utils/constants'


export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
export const ADD_BUN = "ADD_BUN"
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT"
export const REMOVE_CURRENT_INGREDIENT = "REMOVE_CURRENT_INGREDIENT"
export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST' 
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS'
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED'
export const CLEAR_ORDER_MODAL = 'CLEAR_ORDER_MODAL'
export const SORT_CONSTRUCTOR_INGREDIENTS = 'SORT_CONSTRUCTOR_INGREDIENTS'
export const CLEAR_CONSTRUCTOR_INGREDIENTS = "CLEAR_CONSTRUCTOR_INGREDIENTS"

export function getIngredients (ingredientId) {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    downloadData().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    }).catch(err => console.log(`Error: ${err}`))
  }
}

export function makeOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    })
    makeData(ingredientsId).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          currentOrder: res.name,
          orderNum: res.order.number
        })
      } else {
        dispatch({
          type: MAKE_ORDER_FAILED
        })
      }
    }).catch(err => console.log(`Error: ${err}`))
  }
}

const makeData = async(ingredientsId) => {
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

const downloadData = async () => {
  return await fetch(`${apiLink}/ingredients`).then(_checkResponse)
}

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}