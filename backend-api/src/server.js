const express = require("express");
require("dotenv/config");
const bodyparser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const globalerror = require("./infra/utils/errorcontroller");
const ErrorHandler = require("./infra/utils/errorHandler");
const GraphQL = require("./interface/graphql");
const authrouter = require("./interface/rest/auth-module/auth.route");
require("./infra/model/index");

const app = express();

async function startserver() {
  const apolloserver = new ApolloServer({
    typeDefs: GraphQL.typeDefs,
    resolvers: GraphQL.resolver,
    formatError: ErrorHandler.formatGQLError,
    introspection: true,
    playground: true,
    uploads: false,
    tracing: true,
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app: app });

  app.use(bodyparser.json());

  app.use("", authrouter);

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
  });

  app.use(globalerror);

  app.listen(3000, () => console.log("server is running"));
}

startserver();
