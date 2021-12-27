import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/index.js';
import Root from './components/Root.js';
import AccountDragons from './components/AccountDragons.js';
import { fetchAuthenticated } from './actions/account.js';
import './index.css';

const history  = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <Route path='/account-dragons' component={AccountDragons} />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById("root")
        );
    });
