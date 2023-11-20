import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getUsers } from './actions/allUsers.actions';
import { getPosts } from './actions/post.actions';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getUsers());
store.dispatch(getPosts());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
);


