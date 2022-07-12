import { combineReducers } from "redux"
import { burgerReducer } from './burger'
import user from "./user"
import { wsReducer } from './ws';
import { wsReducerAuth } from './ws-reducer-auth';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user,
  ws: wsReducer,
  wsAuth: wsReducerAuth
})
