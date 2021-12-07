// Dragon class 
//
// Each dragon will have a nickname, birthdate, and an array of traits.
// The traits are imported from traits.json

const TRAITS = require("../../data/traits.json");
const DragonTable = require('./table.js');

const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    generationId: undefined,
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        var traits = [];

        TRAITS.forEach((trait) => {
            const traitType = trait.type;
            const traitValues = trait.values;

            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];

            traits.push({ traitType, traitValue });
        })
        
        return traits;
    }
}

class Dragon {
    constructor({ birthdate, nickname, traits, generationId } = {}) {
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
        this.id = undefined;
    }
}

module.exports = Dragon;       