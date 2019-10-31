const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// const users = [
//     {id: '23', firstName: 'Bill', age: 20},
//     {id: '47', firstName: 'Smantha', age: 21},

// ];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: { type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

// the purpose of root is expesify the root of a specific node in the data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
          type: UserType,
          args: {id: {type: GraphQLString} },
          resolve(parentValue, args) {
            // return _.find(users, {id: args.id});
            return axios.get(`http://localhost:3000/users/${args.id}`)
              .then(res => res.data);
          }
        }
    }
});

module.exports =  new GraphQLSchema({
    query: RootQuery
});