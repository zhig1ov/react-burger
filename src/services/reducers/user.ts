import { TUserActions } from '../actions/user'
import {
  SET_NAME, 
  SET_EMAIL,
  SET_LOGIN,
  SET_PASSWORD,
  SET_RESTORE_EMAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  CANCEL_GET_USER_DATA,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_CODE_REQUEST,
  RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_CODE_FAILED,
  SET_NEW_PASSWORD,
  SET_RESTORE_CODE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../action-constants/user'

type TUserData = {
  name: string;
  email: string;
  login: string;
  password: string;
  newPassword: string;
}
type TUserState = {
  user: TUserData;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  userDataRequest: boolean;
  userDataFailed: boolean;
  changePasswordEmail: string;
  changePasswordRequest: boolean;
  changePasswordFailed: boolean;
  changePasswordMessage: string | null;
  newPasswordRequest: boolean;
  newPasswordFailed: boolean;
  resetCode: string;
  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  logoutMessage: string | null;
}

export const initialUserState = {
  user: {
    name: '',
    email: '',
    login: '',
    password: '',
    newPassword: '',
  },
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  userDataRequest: false,
  userDataFailed: false,
  changePasswordEmail: '',
  changePasswordRequest: false,
  changePasswordFailed: false,
  changePasswordMessage: null,    
  newPasswordRequest: false,
  newPasswordFailed: false,
  resetCode: '',
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  logoutMessage: null
}

export default (state = initialUserState, action: TUserActions): TUserState => {
  switch(action.type){
    case SET_NAME: {
      return {
        ...state,
        user: {
        	...state.user,
          name: action.payload
        }
      }
    }
    case SET_EMAIL: {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload
        }
     	}
    }
    case SET_LOGIN: {
      return {
        ...state,
        user: {
        	...state.user,
          login: action.payload
        }
      }
     }
    case SET_PASSWORD: {
    	return {
        ...state,
        user: {
          ...state.user,
          password: action.payload
        }
      }
    }
    case SET_RESTORE_EMAIL: {
      return {
        ...state,                
        changePasswordEmail: action.email
      }
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: '',
          email: '',
          password: ''
        },
          registerRequest: false,
          registerFailed: false
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
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: ''
        },
        loginRequest: false,
        loginFailed: false
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userDataRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: false,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
          password: ''
        }
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: true
      }
    }
    case CANCEL_GET_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          login: '',
          password: ''
        }
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,                
        changePasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordFailed: false,
        changePasswordMessage: action.message,
        changePasswordEmail: ''
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordFailed: true,
        changePasswordMessage: null
      }
    }
    case SET_NEW_PASSWORD: {
      return {
        ...state,
        user: {
          ...state.user,
          newPassword: action.payload
        }
      }
    }
    case SET_RESTORE_CODE: {
      return {
        ...state,
        resetCode: action.payload
      }
    }       
    case RESET_PASSWORD_CODE_REQUEST: {
      return {
        ...state,
        newPasswordRequest: true,
        user: {
          ...state.user,
          newPassword: ''
        }
      }
    }
    case RESET_PASSWORD_CODE_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          newPassword: 'changed'
        },
        newPasswordRequest: false,
        newPasswordFailed: false            
      }
    }
    case RESET_PASSWORD_CODE_FAILED: {
      return {
        ...state,
        newPasswordRequest: false,
        newPasswordFailed: true
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
        refreshTokenFailed: false
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true
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
        user: {
          ...state.user
        },
        logoutRequest: false,
        logoutFailed: false,
        logoutMessage: action.message                
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        user: {
          ...state.user
        },
        logoutRequest: false,
        logoutFailed: true
      }
    }
    default: return state;
  }
}