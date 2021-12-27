const base64 = require('base-64');
const Dragon = require('./index.js');

class Breeder {
    // Two incoming traits, matron and patron traits 
    // The matron and patron traits string values are encoded
    // Both traits will have their characters summed (ascii values) 
    // Get a range of numbers by adding both sums
    // Generate a random number within this range
    // If the number is less than or equal to the matron's character sum we choose matron trait
    // Else we pick the patron trait
    static pickTrait({ matronTrait, patronTrait }) { 
        if(matronTrait === patronTrait) return matronTrait;

        const matronTraitSum = Breeder.charSum(base64.encode(matronTrait));
        const patronTraitSum = Breeder.charSum(base64.encode(patronTrait));
        const randNum = Math.floor(Math.random() * (matronTraitSum + patronTraitSum));
        
        return randNum > matronTraitSum ? patronTrait : matronTrait;
    }

    static charSum(string) {
        string.split('').reduce((sum, character) => sum += character.charCodeAt(), 0);
    }

    static breedDragon({ matron, patron }) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;

        const babyTraits = [];

        matronTraits.forEach(({ traitType, traitValue }) => {
            const matronTrait = traitValue;
            const patronTrait = patronTraits.find((trait) => trait.traitType === traitType);

            babyTraits.push({ traitType, traitValue: Breeder.pickTrait({ matronTrait, patronTrait }) });
        });

        return new Dragon({ nickname: 'Unnamed baby', traits: babyTraits });
    }
}

module.exports = Breeder;