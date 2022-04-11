import { TRegisterUserData } from '../../utils/types'
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

export interface ISetName {
  readonly type: typeof SET_NAME;
  readonly payload: string
}
export interface ISetEmail {
  readonly type: typeof SET_EMAIL;
  readonly payload: string;
}
export interface ISetLogin {
  readonly type: typeof SET_LOGIN;
  readonly payload: string;
}
export interface ISetPassword {
  readonly type: typeof SET_PASSWORD;
  readonly payload: string;
}
export interface ISetRestoreEmail {
  readonly type: typeof SET_RESTORE_EMAIL;
  readonly email: string;
}
export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}
export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TRegisterUserData;
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}
export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TRegisterUserData;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface ICancelGetUserData {
  readonly type: typeof CANCEL_GET_USER_DATA;
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly message: string;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IResetPasswordCodeRequest {
  readonly type: typeof RESET_PASSWORD_CODE_REQUEST;
}
export interface IResetPasswordCodeSuccess {
  readonly type: typeof RESET_PASSWORD_CODE_SUCCESS;
}
export interface IResetPasswordCodeFailed {
  readonly type: typeof RESET_PASSWORD_CODE_FAILED;
}
export interface ISetNewPassword {
  readonly type: typeof SET_NEW_PASSWORD;
  readonly payload: string;
}
export interface ISetRestoreCode {
  readonly type: typeof SET_RESTORE_CODE;
  readonly payload: string;
}
export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly message: string;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface IDefault {
  readonly type: '';
}

export type TUserActions = 
  | ISetName
  | ISetEmail
  | ISetLogin
  | ISetPassword
  | ISetRestoreEmail
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | ICancelGetUserData 
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IResetPasswordCodeRequest
  | IResetPasswordCodeSuccess
  | IResetPasswordCodeFailed
  | ISetNewPassword
  | ISetRestoreCode 
  | IRefreshTokenRequest
  | IRefreshTokenSuccess
  | IRefreshTokenFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IDefault;