import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPublicDragons } from '../actions/publicDragons.js';
import PublicDragonRow from './PublicDragonRow.js';

class PublicDragons extends Component {
    componentDidMount() {
        this.props.fetchPublicDragons();
    }

    render() {
        return (
            <div>
                <h3>Public Dragons</h3>
                {
                    this.props.publicDragons.dragons.map((dragon) => {
                        return (
                            <div key={dragon.id}>
                                <PublicDragonRow dragon={dragon} />
                                <hr /> 
                            </div>
                        )
                    })
                }
                <Link to='/'>Home</Link>
            </div>
        );
    }
}

export default connect(
    ({ publicDragons }) => ({ publicDragons }),
    { fetchPublicDragons }
)(PublicDragons);