import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./reducers/productReducers";
import userReducer from "./reducers/userReducers";
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  posts: productsReducer,
  user: userReducer
});

const store = createStore(
  allReducers,
  {
    posts: [
      {
        source: {
          id: "cnbc",
          name: "CNBC"
        },
        author: "Yen Nee Lee",
        title:
          "The number of births in China hit its lowest level since 1961 - CNBC",
        description:
          "China on Monday reported that there were 15.23 million births in 2018 — the lowest since 1961 when 11.87 million births were reported, according to data on financial services firm Wind Info.",
        url:
          "https://www.cnbc.com/2019/01/21/population-growth-china-records-lowest-number-of-births-since-1961.html",
        urlToImage:
          "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/06/30/104560848-GettyImages-80937481.1910x1000.jpg",
        publishedAt: "2019-01-21T06:12:27Z",
        content:
          'The number of babies born in China in 2018 was the lowest the country has seen in nearly 60 years, according to Chinese financial services firm Wind Information. div &gt; div.group &gt; p:first-child"&gt; China on Monday reported that there were 15.23 million… [+682 chars]'
      }
    ],
    user: "Mike"
  },
  composeEnhancer(applyMiddleware(thunk))
);

const productUpdate = {
  type: "updateProduct",
  payload: { posts: [{ name: "Samsung" }] }
};

console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
