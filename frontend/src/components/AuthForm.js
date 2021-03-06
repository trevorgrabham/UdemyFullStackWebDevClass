import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup, login } from '../actions/account.js';
import fetchStates from '../reducers/fetchStates.js';

class AuthForm extends Component {
    // we use a local state because only the AuthForm is concerned with the username and password and it doesn't need to be kept in the store
    state = { username: '', password: '', buttonClicked: false };

    updateUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    signup = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    login = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.login({ username, password });
    }

    get error() {
        if(this.state.buttonClicked && this.props.account.status === fetchStates.error) {
            return (<div>{this.props.account.message}</div>);
        }
    }

    render() {
        return (
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                </FormGroup>
                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span> or </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
                <br />
                {this.error}
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }),
    { signup, login }
)(AuthForm);