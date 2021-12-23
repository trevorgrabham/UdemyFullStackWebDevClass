import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar.js';
import { fetchDragon } from '../actions/dragon.js';
import fetchStates from '../reducers/fetchStates.js';

class Dragon extends Component {
    componentDidMount() {
        this.props.fetchDragon();
    }

    render() {
        console.log('this.props', this.props);
        return(
            <div>
                <Button onClick={ this.props.fetchDragon }>New Dragon</Button>
                <DragonAvatar dragon={this.props.dragon}/>
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    const dragon = state.dragon;
    return { dragon };
}

const componentConnector = connect(
    mapPropsToState,
    { fetchDragon }
);

export default componentConnector(Dragon);