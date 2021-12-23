import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar.js';
import { fetchDragon } from '../actions/dragon.js';

class Dragon extends Component {
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

export default connect(
    ({ dragon }) => ({ dragon }),
    { fetchDragon }
)(Dragon);