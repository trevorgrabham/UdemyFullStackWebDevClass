import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { BACKEND } from '../config.js';
import history from '../history.js';

class PublicDragonRow extends Component {
    buy = () => {
        const { id, saleValue } = this.props.dragon;

        fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ dragonId: id, saleValue })
        })
            .then((response) => response.json())
            .then((json) => { 
                alert(json.message) 
                if(json.type !== 'error') {
                    history.push('/account-dragons');
                }
            })
            .catch((error) => alert(error));
    }

    render() {
        return (
            <div>
                <div>{this.props.dragon.nickname}</div>
                <DragonAvatar dragon={this.props.dragon} />
                <div>Sale Value: {this.props.dragon.saleValue}</div>
                <br /> 
                <Button onClick={this.buy}>Buy</Button>
            </div>
        )
    }
}

export default PublicDragonRow;