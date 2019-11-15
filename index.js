var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    human: Human
    homans: Human
  }

  type Human {
      name: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    human: () => {
        return { name: 'Roy' };
    },
    homans: () => {
        return { name: 'Roy' };
    },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ human { name } }', root).then((response) => {
    console.log('humans', response);
});



graphql(schema, '{ homans { name } }', root).then((response) => {
    console.log('homans:', response);
});
