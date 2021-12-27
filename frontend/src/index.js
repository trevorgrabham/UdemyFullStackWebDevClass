import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import Root from './components/Root.js';
import AccountDragons from './components/AccountDragons.js';
import PublicDragons from './components/PublicDragons';
import { fetchAuthenticated } from './actions/account.js';
import './index.css';
import history from './history.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const AuthRoute = (props) => {
    if(!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />
    }

    const { component, path } = props;

    return <Route path={path} component={component} />;
}

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <AuthRoute path='/account-dragons' component={AccountDragons} />
                        <AuthRoute path='/public-dragons' component={PublicDragons} />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById("root")
        );
    });
