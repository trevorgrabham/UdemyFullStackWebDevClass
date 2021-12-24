import React, { Component } from 'react';
import Dragon from './Dragon.js';
import Generation from './Generation.js';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Dragon Stack</h2>
                <Generation />
                <Dragon />
            </div>
        );
    }
}

export default Home;