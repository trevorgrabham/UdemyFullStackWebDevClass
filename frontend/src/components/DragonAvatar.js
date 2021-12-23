import React, { Component } from 'react';
import { patchy, plain, skinny, slender, sporty, spotted, stocky, striped } from '../img/index.js';

const propertyMap = {
    backgroundColor: {
        black: '#263238', 
        white: '#cfd8dc', 
        green: '#a5d6a7', 
        blue: '#0277bd'  
    },
    build: {slender, stocky, sporty, skinny},
    pattern: {plain, striped, spotted, patchy},
    size: {
        small: 100, 
        medium: 140, 
        large: 180, 
        enormous: 220 
    }
};

class DragonAvatar extends Component {
    get DragonImage() {
        const dragonProperyMap = {};

        this.props.dragon.traits.forEach((trait) => {
            const { traitType, traitValue } = trait;

            dragonProperyMap[traitType] = propertyMap[traitType][traitValue];
        });

        const { backgroundColor, build, pattern, size } = dragonProperyMap;

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor, width: size, height: size}}></div>
                <img src={pattern} className='dragon-avatar-image-pattern' style={{width: size, height: size}}/> 
                <img src={build} className='dragon-avatar-image' style={{width: size, height: size}}/> 
            </div>
        );
    }

    render() {
        const { dragon } = this.props;

        if(!dragon.id) {
            return (<div></div>);
        }

        return (
            <div>
                <span>G{ dragon.generationId }. </span>
                <span>I{ dragon.id }. </span>

                { dragon.traits.map((trait) => trait.traitValue).join(', ')}
                { this.DragonImage }
            </div>
        );
    }
}

export default DragonAvatar;