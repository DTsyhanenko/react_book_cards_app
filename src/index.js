import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from './context/books';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    // Using context system. We wrap our App component in giving a value (normally it will be something like object or a function) with number 5 in it. Now every child of app component has access to value of number 5.
    <Provider>
        <App />
    </Provider>
);