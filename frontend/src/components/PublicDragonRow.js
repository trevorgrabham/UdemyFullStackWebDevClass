import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { BACKEND } from '../config.js';
import history from '../history.js';
import MatingOptions from './MatingOptions.js';

class PublicDragonRow extends Component {
    state = { displayMatingOptions: false };

    toggleDisplayMatingOptions = () => {
        this.setState({ displayMatingOptions: !this.state.displayMatingOptions });
    }

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
                <div>
                    <span>Sale Value: {this.props.dragon.saleValue}</span>{' | '}
                    <span>Sire Value: {this.props.dragon.sireValue}</span>
                </div>
                <br /> 
                <Button onClick={this.buy}>Buy</Button>{' '}
                <Button onClick={this.toggleDisplayMatingOptions}>Sire</Button>
                <br />
                {
                    this.state.displayMatingOptions ? 
                        <MatingOptions patronDragonId={this.props.dragon.id} /> : 
                        <div></div>
                }
            </div>
        )
    }
}

export default PublicDragonRow;