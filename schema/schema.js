const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

// const users = [
//     {id: '23', firstName: 'Bill', age: 20},
//     {id: '47', firstName: 'Smantha', age: 21},

// ];

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                  .then( res => res.data);
            }
        }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                  .then( res => res.data );
            }
        }
    }
});

// the purpose of root is specifying the root of a specific node in the data
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
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                  .then(res => res.data);
            }
        },
        companies: {
            type: CompanyType,
            args: {id: {type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/`)
                  .then(res => res.data);
            }
        }
    }
});

module.exports =  new GraphQLSchema({
    query: RootQuery
});