import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app/app'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'
import { rootReducer } from './services/reducers'
import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import { TActions } from './services/actions/index'
import { BrowserRouter as Router} from 'react-router-dom'
import { TUserActions } from './services/actions/user'
import { routerMiddleware } from 'connected-react-router'
import { socketMiddleware } from './services/middleware'
import { wsActions } from './services/actions/ws'
import { wsUrl } from './utils/constants'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), socketMiddleware(wsUrl, wsActions, false))
);

export const store = createStore(rootReducer, enhancer)

export type RootState = ReturnType<typeof store.getState>

type TApplicationActions = TActions | TUserActions

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

export type AppDispatch = typeof store.dispatch

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
