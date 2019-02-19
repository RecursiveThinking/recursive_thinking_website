import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from 'react-router-dom'
// import { Router } from 'react-router'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reduxThunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import reducers from './reducers'
// import * as serviceWorker from './serviceWorker';

// import history from './history'

// import createBrowserHistory from 'history/createBrowserHistory';

import './config/amplify'

// export const history = createBrowserHistory();
// export const customHistory = createBrowserHistory();

const composeEnhancers = 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//need reducers in store!!!
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
  <Provider store={store}>
    {/* <Router history={history}> */}
      <App />
    {/* </Router> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
