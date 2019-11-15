var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDice {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
      die(numSides: Int): RandomDice
  }
`);


// create a es6-class that has 'props' and 'methods'(aka props in js) as graphql
class Dice {
    constructor(numSides) {
        this.numSides = numSides;
    }

    // auto-resolve
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

// The root provides a resolver function for each API endpoint
var root = {
    die: ({ numSides }) => {
        return new Dice(numSides);
    },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ die(numSides: 6) { rollOnce, roll(numRolls: 2) } }', root).then((response) => {
    console.log(JSON.stringify(response));
});