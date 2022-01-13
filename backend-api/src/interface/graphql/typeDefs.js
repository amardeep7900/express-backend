const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type post {
    id: ID
    title: String
    name: String
  
  }
  type Query {
    getallposts:[post]
    getAllposts: [post]
    getpost(id:ID):post
    getname(name:String):post
    
  }
  input postInput {
    title: String
  
    name:String
  }
  type Mutation {
    createpost(post: postInput):post
    Deletepost(id:ID):String
    updatepost(id:ID,post:postInput):post
  }
`;
module.exports = typeDefs;
