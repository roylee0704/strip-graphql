var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    human: Human
    homans: Human
    shit: Human
  }

  type Human {
      id: ID!
      name: String!
  }
`);

// The root provides a resolver function for each API endpoint.
// it is named as root because it's the entry point.
const humanList = [
    { name: 'Roy', },
    { name: 'Earng' },
];

// mapped to each field in QueryType
var root = {
    hello: () => {
        return 'Hello world!';
    },
    human: () => {
        return humanList[1];
    },
    homans: () => {
        return humanList[0];
    },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ human { name } }', root).then((response) => {
    console.log('humans', response);
});



graphql(schema, '{ homans { name } }', root).then((response) => {
    console.log('homans:', response);
});
