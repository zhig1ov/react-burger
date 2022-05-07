import { baseUrl } from '../../utils/constants'
import { AppDispatch, AppThunk } from "../../index"
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed, makeOrderRequest, makeOrderFailed} from '../actions/index'
import { ADD_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS, 
  GET_ORDER_FAILED,
  GET_USER_ORDER_REQUEST, 
  GET_USER_ORDER_SUCCESS, 
  GET_USER_ORDER_FAILED,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLEAR_ORDER_MODAL } from '../action-constants/burger'
  import { getCookie, setCookie, deleteCookie } from '../../utils/utils'

//Получить ингредиенты
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

  export const getOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        getOrderRequest(id)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        currentOrder: res.name,
          orderNumber: res.order.number,
                    });
                } else {
                    dispatch({
                    type: GET_ORDER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            });
    };
};

export const getUserOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_ORDER_REQUEST,
        });
        getUserOrderRequest(id)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_USER_ORDER_SUCCESS,
                    order: res.orders[0],
                });
            } else {
                dispatch({
                    type: GET_USER_ORDER_FAILED,
                });
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: GET_ORDER_FAILED,
            });
        });
    };
};

const requestHandler = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(res)
};

  // Получить заказы
export const getOrderRequest = (number: string) => {
  return fetch(`${baseUrl}/orders/${number}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res));
};

// Получить пользовательские заказы
export const getUserOrderRequest = (number: string) => {
  return fetchWithRefreshToken(`${baseUrl}/orders/${number}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
  })
};

export const addOrdersRequest = (ingredients: Array<string>) => {
  return fetch(`${baseUrl}/orders`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify({ ingredients }),
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
  })
};

// Обновить токен
export const refreshTokenRequest = () => {
  return fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((res) => requestHandler(res));
};

// Обновить токен если истек
const fetchWithRefreshToken = (url: string, options: RequestInit) => {
  return fetch(url, options).then((res) => requestHandler(res))
      .catch((res: Response) => {
          return res.json()
              .then((err: TError) => {
                  if (err?.message === 'jwt expired') {
                      return refreshTokenRequest()
                          .then(res => {
                              localStorage.setItem('refreshToken', res.refreshToken)
                              const authToken = res.accessToken.split('Bearer ')[1];
                              setCookie('token', authToken);
                              (options.headers as { [key: string]: string }).Authorization = res.accessToken
                              return fetch(url, options).then((res) => requestHandler(res))
                          })
                  } else {
                      deleteCookie('token');
                      localStorage.removeItem('refreshToken');
                      // eslint-disable-next-line
                      location.reload()
                      return Promise.reject(err)
                  }
              })
      })
}

export type TError = {
	success: boolean;
	message?: string
}