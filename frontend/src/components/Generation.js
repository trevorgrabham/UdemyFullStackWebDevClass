import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation.js';
import fetchStates from '../reducers/fetchStates.js';

const MINIMUM_DELAY = 3000;

class Generation extends Component {
    timer = null;

    componentDidMount() {
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    fetchNextGeneration() {
        this.props.fetchGeneration();
        // set a small timeout so that we have time to grab our new generation before we set the delay
        setTimeout(() => {
            let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();
            this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
        }, 50);
    }


    render() {
        console.log('this.props', this.props);

        const {generation} = this.props;

        if(generation.status === fetchStates.error) {
            return (<div>{ generation.message }</div>);
        }

        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        );
    }
}

export default connect(
    ({ generation }) => ({ generation }),
    { fetchGeneration }
)(Generation);
