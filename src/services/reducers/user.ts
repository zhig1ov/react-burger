import { 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_CODE_REQUEST,
  RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_CODE_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,

  TUserActions } from '../actions/user'

  type TUserInitialState = {
    email: string
    name: string

    registerRequest: boolean
    registerSuccess: boolean
    registerFailed: boolean

    loginRequest: boolean
    loginSuccess: boolean
    loginFailed: boolean

    logoutRequest: boolean
    logoutSuccess: boolean
    logoutFailed: boolean

    getUserRequest: boolean
    getUserSuccess: boolean
    getUserFailed: boolean

    patchUserRequest: boolean
    patchUserSuccess: boolean
    patchUserFailed: boolean

    resetPasswordRequest: boolean
    resetPasswordSuccess: boolean
    resetPasswordFailed: boolean

    resetPasswordCodeRequest: boolean
    resetPasswordCodeSuccess: boolean
    resetPasswordCodeFailed: boolean

    refreshTokenRequest: boolean
    refreshTokenSuccess: boolean
    refreshTokenFailed: boolean

    passwordReset: boolean
  }

  const userInitialState = {
    email: '',
    name: '',

    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,

    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,

    patchUserRequest: false,
    patchUserSuccess: false,
    patchUserFailed: false,

    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordFailed: false,

    resetPasswordCodeRequest: false,
    resetPasswordCodeSuccess: false,
    resetPasswordCodeFailed: false,

    refreshTokenRequest: false,
    refreshTokenSuccess: false,
    refreshTokenFailed: false,

    passwordReset: false
  }

  export const userReducer = (state = userInitialState, action: TUserActions): TUserInitialState => {
    switch(action.type) {
      case REGISTER_REQUEST: {
        return {
          ...state, registerRequest: true
        }
      }
      case REGISTER_SUCCESS: {
        return {
          ...state, 
          registerSuccess: true,
          registerRequest: false,
          registerFailed: false,
          email: action.email,
          name: action.name
        }
      }
      case REGISTER_FAILED: {
        return {
          ...state,
          registerRequest: false,
          registerFailed: true
        }
      }
      case LOGIN_REQUEST: {
        return {
          ...state,
          loginRequest: true
        }
      }
      case LOGIN_SUCCESS: {
        return {
          ...state,
          loginRequest: false,
          loginSuccess: true,
          loginFailed: false,
          email: action.email,
          name: action.name
        }
      }
      case LOGIN_FAILED: {
        return {
          ...state,
          loginRequest: false,
          loginFailed: true
        }
      }
      case LOGOUT_REQUEST: {
        return {
          ...state,
          logoutRequest: true
        }
      }
      case LOGOUT_SUCCESS: {
        return {
          ...state,
          logoutRequest: false,
          logoutSuccess: true,
          logoutFailed: false,
        }
      }
      case LOGOUT_FAILED: {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: true
        }
      }
      case GET_USER_REQUEST: {
        return {
          ...state,
          getUserRequest: true
        }
      }
      case GET_USER_SUCCESS: {
        return {
          ...state,
          getUserRequest: false,
          getUserSuccess: true,
          getUserFailed: false,
          email: action.email,
          name: action.name
        }
      }
      case GET_USER_FAILED: {
        return {
          ...state,
          getUserRequest: false,
          getUserFailed: true
        }
      }
      case PATCH_USER_REQUEST: {
        return {
          ...state,
          patchUserRequest: true
        }
      }
      case PATCH_USER_SUCCESS: {
        return {
          ...state,
          patchUserRequest: false,
          patchUserSuccess: true,
          patchUserFailed: false,
          email: action.email,
          name: action.name
        }
      }
      case PATCH_USER_FAILED: {
        return {
          ...state,
          patchUserRequest: false,
          patchUserFailed: true
        }
      }
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          resetPasswordRequest: true
        }
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          resetPasswordRequest: false,
          resetPasswordSuccess: true,
          resetPasswordFailed: false,
          passwordReset: true
        }
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          resetPasswordRequest: false,
          resetPasswordFailed: true
        }
      }
      case RESET_PASSWORD_CODE_REQUEST: {
        return {
          ...state,
          resetPasswordCodeRequest: true
        }
      }
      case RESET_PASSWORD_CODE_SUCCESS: {
        return {
          ...state,
          resetPasswordCodeRequest: false,
          resetPasswordCodeSuccess: true,
          resetPasswordCodeFailed: false
        }
      }
      case RESET_PASSWORD_CODE_FAILED: {
        return {
          ...state,
          resetPasswordCodeRequest: false,
          resetPasswordCodeFailed: true
        }
      }
      case REFRESH_TOKEN_REQUEST: {
        return {
          ...state,
          refreshTokenRequest: true
        }
      }
      case REFRESH_TOKEN_SUCCESS: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenSuccess: true,
          refreshTokenFailed: false,
        }
      }
      case REFRESH_TOKEN_FAILED: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenFailed: true
        }
      }
      default: {
        return state
      }
    }
  }