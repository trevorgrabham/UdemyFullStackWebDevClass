import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BACKEND } from '../config.js';
import history from '../history.js';

class MatingOptions extends Component {
    mate = ({ matronDragonId, patronDragonId }) => () => {
        fetch(`${BACKEND.ADDRESS}/dragon/mate`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ matronDragonId, patronDragonId })
        })
            .then((response) => response.json())
            .then((json) => {
                alert(json.message);

                if(json.type !== 'error') {
                    history.push('/account-dragons');
                }
            })
            .catch((error) => alert(error));
    }

    render() {
        return (
            <div>
                <h4>Pick one of your dragons to mate with:</h4>
                {
                    this.props.accountDragons.dragons.map((dragon) => {
                        const { id, generationId, nickname } = dragon;

                        return (
                            <span key={id}>
                                <Button onClick={this.mate({ patronDragonId: this.props.patronDragonId, matronDragonId: id })}>
                                    G{generationId}.I{id}. {nickname}
                                </Button>
                                {' '}
                            </span>
                        );
                    })
                }
            </div>
        );
    }
}
 
export default connect(
    ({ accountDragons }) => ({ accountDragons }),
    null
)(MatingOptions);