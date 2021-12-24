import React, { Component } from 'react';
import Home from './Home.js';
import AuthForm from './AuthForm.js';

class Root extends Component {
    render() {
        return (
            false ? <Home/> : <AuthForm/>
        )
    }
}

export default Root;