import { AppThunk, AppDispatch } from '../../index'
import { setCookie } from '../../utils/utils'
import { _checkResponse } from './index'
import { apiLink, authLink } from '../../utils/constants'

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS'
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED'

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS'
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED'

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED'

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST'
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS'
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED'

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED'

export const RESET_PASSWORD_CODE_REQUEST: 'RESET_PASSWORD_CODE_REQUEST' = 'RESET_PASSWORD_CODE_REQUEST'
export const RESET_PASSWORD_CODE_SUCCESS: 'RESET_PASSWORD_CODE_SUCCESS' = 'RESET_PASSWORD_CODE_SUCCESS'
export const RESET_PASSWORD_CODE_FAILED: 'RESET_PASSWORD_CODE_FAILED' = 'RESET_PASSWORD_CODE_FAILED'

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED'

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccess{
  readonly type: typeof REGISTER_SUCCESS
  email: string
  name: string
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccess{
  readonly type: typeof LOGIN_SUCCESS
  email: string
  name: string
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccess{
  readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccess{
  readonly type: typeof GET_USER_SUCCESS
  email: string
  name: string
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
}

export interface IPatchUserRequest {
  readonly type: typeof PATCH_USER_REQUEST
}

export interface IPatchUserSuccess{
  readonly type: typeof PATCH_USER_SUCCESS
  email: string
  name: string
}

export interface IPatchUserFailed {
  readonly type: typeof PATCH_USER_FAILED
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccess{
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED
}

export interface IResetPasswordCodeRequest {
  readonly type: typeof RESET_PASSWORD_CODE_REQUEST
}

export interface IResetPasswordCodeSuccess{
  readonly type: typeof RESET_PASSWORD_CODE_SUCCESS
}

export interface IResetPasswordCodeFailed {
  readonly type: typeof RESET_PASSWORD_CODE_FAILED
}

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST
}

export interface IRefreshTokenSuccess{
  readonly type: typeof REFRESH_TOKEN_SUCCESS
}

export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED
}

export type TUserActions = 
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IPatchUserRequest
  | IPatchUserSuccess
  | IPatchUserFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IResetPasswordCodeRequest
  | IResetPasswordCodeSuccess
  | IResetPasswordCodeFailed
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed;

  export const postResetPassword = async(email: string) => {
    return await fetch(`${apiLink}/password-reset`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    }).then(_checkResponse)
  }
  
  export const postResetPasswordCode = async(password: string, code: string) => {
    return await fetch(`${apiLink}/password-reset/reset`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        token: code
      })
    }).then(_checkResponse)
  }
  
  export const postCreateUser = async (email: string, password: string, name: string) => {
    return await fetch(`${authLink}/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    }).then(_checkResponse)
  }

  export const postUpdateUser = async (name: string, email: string, accessToken: string) => {
    return await fetch(`${authLink}/user`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user: {
          name: name,
          email: email
        },
      }),
    }).then(_checkResponse)
  }

  const postLogout = async (refreshToken: string) => {
    return await fetch(`${authLink}/logout`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: refreshToken})
    }).then(_checkResponse)
  }

  const postGetUser = async (accessToken: string) => {
    return await fetch(`${authLink}/user`,{
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    }).then(_checkResponse);
  }

  const postRefreshToken = async (refreshToken: string) => {
    return await fetch(`${authLink}/token`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    }).then(_checkResponse);
  }

  const postLoginData = async (email: string, password: string) => {
    return await fetch(`${authLink}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password })
    }).then(_checkResponse)
  }

  export const resetPassword: AppThunk =({ email }) =>(dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })
    postResetPassword(email).then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const resetPasswordCode: AppThunk = ({password, code}) => (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_CODE_REQUEST
    })
    postResetPasswordCode(password, code).then((res) => {
      if (res && res.success) {
        dispatch({
          type:RESET_PASSWORD_CODE_SUCCESS
        })
      } else {
        dispatch({
          type: RESET_PASSWORD_CODE_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const createUser: AppThunk = ({email, password, name}) => (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTER_REQUEST
    })
    postCreateUser(email, password, name).then((res) => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCESS,
          email: res.user.email,
          name: res.user.name, // тут не понятно name или username
          loggedIn: true
        })
        
        let accessToken

        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1]
        }

        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 300 })
          setCookie("refreshToken", refreshToken)
        }
      } else {
        dispatch({
          type: REGISTER_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const updateUser: AppThunk = ({ name, email, accessToken }) => (dispatch: AppDispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST
    })
    postUpdateUser(name, email, accessToken).then((res) => {
      if(res && res.success) {
        dispatch({
          type: PATCH_USER_SUCCESS,
          name: res.user.name,
          email: res.user.email
        })
      } else {
        dispatch({
          type: PATCH_USER_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const logout: AppThunk = (refreshToken) => (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST
    })
    postLogout(refreshToken).then((res) => {
      if(res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS
        })
      } else {
        dispatch({
          type: LOGOUT_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const getUser: AppThunk = (accesToken) => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    postGetUser(accesToken).then((res) => {
      if(res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          name: res.user.name,
          email: res.user.email
        })
      } else {
        dispatch({
          type: GET_USER_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  } 

  export const refreshAccessToken: AppThunk = (refreshToken) => (dispatch: AppDispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    })
    postRefreshToken(refreshToken).then((res) => {
      if (res && res.success) {
        dispatch({
          type: REFRESH_TOKEN_SUCCESS
        })
        let accessToken 
        if (res.accessToken.indexOf('Bearer') === 0) {
          accessToken = res.accessToken.split('Bearer ')[1]
        }
        let refreshToken = res.refreshToken
        if (accessToken && refreshToken) {
          setCookie('accessToken', accessToken, { expires: 1200 })
          setCookie('refreshToken', refreshToken)
        }
      } else {
        dispatch({
          type: REFRESH_TOKEN_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }

  export const login: AppThunk = ({ email, password }) => (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    })
    postLoginData(email, password).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
        let accessToken
        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1];
        }

        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 1200 });
          setCookie("refreshToken", refreshToken);
        }
      } else {
        dispatch({
          type: LOGIN_FAILED
        })
      }
    }).catch((error) => console.log(`Error: ${error}`))
  }