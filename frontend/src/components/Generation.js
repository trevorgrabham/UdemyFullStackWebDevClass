import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generation.js';

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
        fetch('http://localhost:8080/generation')
            .then(response => response.json())
                .then(json => {
                    console.log('json',json);
                    this.props.fetchGeneration();
                    let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();
                    this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
                })
                .catch(error => console.error(error));
    }

    render() {
        console.log('this.props', this.props);

        const {generation} = this.props;
        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const generation = state.generation;

    return { generation };
};

const fetchGeneration = () => (dispatch) => {
    return fetch('http://localhost:8080/generation')
        .then((response) => response.json())
        .then((json) => dispatch(generationActionCreator(json.generation)))
        .catch((error) => console.error(error));
};

const componentConnector = connect(
    mapStateToProps,
    { fetchGeneration }   
);

export default componentConnector(Generation);
