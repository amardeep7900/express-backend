const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const router = require("./interface/restapi/index");
const bodyparser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const apperror = require("./infra/utlis/apperror");
const globalerror = require("./infra/utlis/errorcontroller");

const GraphQL = require("./interface/graphql");
const authrouter = require("./interface/authroute/auth");

const app = express();

async function startserver() {
  const apolloserver = new ApolloServer({
    typeDefs: GraphQL.typeDefs,
    resolvers: GraphQL.resolver,
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app: app });

  app.use(bodyparser.json());

  app.use("/post", router);
  app.use("", authrouter);

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
  //  console.log(req.headers);
   next();
  });

  app.all("*", (req, res, next) => {
    next(new apperror(`cann not find ${req.originalUrl} on this server`, 404));
  });

  app.use(globalerror);

  mongoose
    .connect(process.env.DB_CONNECTION)

    .then(() => {
      console.log("mongoose connected");
    })
    .catch(() => {
      console.error("not connected");
    });

  app.listen(3000, () => console.log("server is running"));
}

startserver();
