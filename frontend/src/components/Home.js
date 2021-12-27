import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dragon from './Dragon.js';
import Generation from './Generation.js';
import AccountInfo from './AccountInfo.js';
import { logout } from '../actions/account.js';

class Home extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.logout} className='logout-button'>
                    Log Out
                </Button>
                <h2>Dragon Stack</h2>
                <Generation />
                <Dragon />
                <hr />
                <AccountInfo />
                <hr />
                <Link to="/account-dragons">Account Dragons</Link>
            </div>
        );
    }
}

export default connect(
    null,
    { logout }
)(Home);