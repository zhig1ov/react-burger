// import React from 'react';
// import ReactDOM from 'react-dom';
// import { App } from './components/app/app'
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'
// import { applyMiddleware, createStore, compose } from 'redux'
// import { rootReducer } from './services/reducers/index1'
// import { Action, ActionCreator } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { TActions } from './services/actions/index1'
// import { BrowserRouter as Router} from 'react-router-dom'
// import { TUserActions } from './services/actions/user1'


// const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk))

// export const store = createStore(rootReducer, enhancer)


// export type RootState = ReturnType<typeof store.getState>

// type TApplicationActions = TActions | TUserActions

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >

// export type AppDispatch = typeof store.dispatch

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import { App } from './components/app/app'
import './index.css';
import './fonts/fonts.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
