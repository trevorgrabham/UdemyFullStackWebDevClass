import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Generation from './components/Generation.js';
import Dragon from './components/Dragon.js';
import { generationReducer } from './reducers/index.js';
import './index.css';

const store = createStore(
    generationReducer,
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <div>
            <h2>Dragon Stack</h2>
            <Generation />
            <Dragon />
        </div>
    </Provider>,
    document.getElementById("root")
);