import { baseUrl, authLink } from '../../utils/constants'
import { fetchWithRefresh, checkResponse, setCookie, deleteCookie } from '../../utils/utils'
import { AppDispatch, AppThunk } from '../../index'
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_CODE_REQUEST,
  RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_CODE_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../action-constants/user'

export const restorePassword: AppThunk = (url, email) => {
  return async (dispatch: AppDispatch) => {
  	const emailBody = { email }
    try{
      dispatch({ 
        type: RESET_PASSWORD_REQUEST 
      })
    const res = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(emailBody)
    })

    const data = await checkResponse(res)
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        message: data.message
      })
    }
    catch(err){
      dispatch({
        type: RESET_PASSWORD_FAILED
      })
    }
  }
}

export const getNewPassword: AppThunk = (url, password, token) => {
  return async (dispatch: AppDispatch) => {
    const passwordBody = { password, token }
    try{
    	dispatch({
        type: RESET_PASSWORD_CODE_REQUEST
      })

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(passwordBody)
    })

    const data = await checkResponse(res)
      dispatch({
        type: RESET_PASSWORD_CODE_SUCCESS,
        message: data.message
    	})
    }
    catch(err){
      dispatch({
        type: RESET_PASSWORD_CODE_FAILED
      })
    }
  }
}

export const registerNewUser: AppThunk = (userData) => {
  return async (dispatch: AppDispatch) => {
    try{
    	dispatch({
        type: REGISTER_REQUEST
    	})

    const res = await fetch(`${authLink}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    })

    const data = await checkResponse(res)
		localStorage.setItem('refreshToken', data.refreshToken)
    setCookie('accessToken', data.accessToken)
    dispatch({
    	type: REGISTER_SUCCESS
    })
    }
    catch(err){
      dispatch({
      type: REGISTER_FAILED
    	})
    }
  }
}

export const loginUser: AppThunk = (userData) => {
  return async (dispatch: AppDispatch) => {
    try{
    	dispatch({
      	type: LOGIN_REQUEST
      })

    const res = await fetch(`${authLink}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    })

    const data = await checkResponse(res)
		localStorage.setItem('refreshToken', data.refreshToken)
    setCookie('accessToken', data.accessToken)
    dispatch({
      type: LOGIN_SUCCESS,
      user: data.user
  	})
    }
    catch(err){
      dispatch({
        type: LOGIN_FAILED
      })
    }
  }
}

export const updateToken: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    try{
      dispatch({
      	type: REFRESH_TOKEN_REQUEST
      })

    const data = await fetchWithRefresh(`${authLink}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ 
        token: localStorage['refreshToken'] 
      })
    })

    localStorage.setItem('refreshToken', data.refreshToken)
    setCookie('accessToken', data.accessToken)
    dispatch({
      type: REFRESH_TOKEN_SUCCESS
    })

  	}
    catch(err){
      dispatch({
        type: REFRESH_TOKEN_FAILED
    	})
    }
  }
}

export const logoutUser: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    const token = { token: localStorage['refreshToken'] }
  	try{
      dispatch({
      type: LOGOUT_REQUEST
      })

    const res = await fetch(`${authLink}/logout`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(token)
    })

    const data = await checkResponse(res)
    deleteCookie('accessToken')
    localStorage.removeItem('refreshToken')
    dispatch({
      type: LOGOUT_SUCCESS,
      message: data.message
    })
    }
    catch(err){
    	dispatch({
      	type: LOGOUT_FAILED
      })
    }
  }
}

export const getUserData: AppThunk = (methodType, userData) => {
  return async (dispatch: AppDispatch) => {        
    const accessToken: string = 
      document.cookie.match(/(accessToken=)(.+)/)![2]
    try{
      dispatch({
        type: GET_USER_REQUEST
        })
      const data = await fetchWithRefresh(`${authLink}/user`, {
        method: methodType,
        headers: { 
          'authorization': accessToken,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(userData)
      })

    if(!data.success) throw new Error('')
    dispatch({
      type: GET_USER_SUCCESS,
      user: data.user
    })
  	}
    catch(err){            
      dispatch({
      type: GET_USER_FAILED
      })
    }
  }
}