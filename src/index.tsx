import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'
import { rootReducer } from './services/reducers'
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TOrderActions } from './services/actions/order'
import { TIngredientsActions } from './services/actions/index'


const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)


export type RootState = ReturnType<typeof store.getState>

type TApplicationActions = TIngredientsActions | TOrderActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

export type AppDispatch = typeof store.dispatch

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
