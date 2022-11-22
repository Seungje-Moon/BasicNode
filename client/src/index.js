import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import reportWebVitals from './reportWebVitals';

import App from './App';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './_reducers/index.js' // --- Reducer

// Object뿐만 아니라 Promise와 Function 형식도 받는 코드
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider
        // 만든 middleware를 store에 넣어준다.
        store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && // DevTools 사용을 위한 추가
            window.__REDUX_DEVTOOLS_EXTENSION__() // DevTools 사용을 위한 추가
        )}
    >
        <App/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
