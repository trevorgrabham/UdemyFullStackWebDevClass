import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Generation from './components/Generation.js';
import Dragon from './components/Dragon.js';
import { generationReducer } from './reducers/index.js';
import { generationActionCreator } from './actions/generation.js';
import './index.css';

const store = createStore(
    generationReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log('store state update', store.getState()));

fetch('http://localhost:8080/generation')
    .then(response => response.json())
        .then(json => store.dispatch(generationActionCreator(json.generation)))
        .catch(error => console.error(error));

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