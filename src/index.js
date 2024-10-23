import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
<<<<<<< HEAD
import burgerBuildeReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV ==="development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuildeReducer,
  order: orderReducer,
  auth: authReducer
});
const store =createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
=======
import reducer from './store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store =createStore(reducer);
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
