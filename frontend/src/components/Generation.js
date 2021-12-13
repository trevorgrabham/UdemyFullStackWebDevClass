import React, { Component } from 'react';

const DEFUALT_GENERATION = { generationId: '', expiration: ''};

class Generation extends Component {
    state = { generation: DEFUALT_GENERATION};

    componentDidMount() {
        this.fetchGeneration();
    }

    fetchGeneration = () => {
        fetch('http://localhost:8080/generation')
            .then(response => response.json())
                .then(json => {
                    console.log('json',json);
                    this.setState({ generation: json.generation });
                })
                .catch(error => console.error(error));
    }

    render() {
        const {generation} = this.state;
        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        );
    }
}

export default Generation;
