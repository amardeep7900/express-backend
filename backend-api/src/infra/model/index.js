const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_CONNECTION)

    .then(() => {
      console.log("mongoose connected");
    })
    .catch(() => {
      console.error("not connected");
    });