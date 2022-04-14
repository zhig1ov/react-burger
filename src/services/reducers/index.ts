import { combineReducers } from "redux"
import { burgerReducer } from './burger'
import user from "./user"

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user
})
