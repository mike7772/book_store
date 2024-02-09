const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
// const Server = require("./src/index").default;
// import { Application } from "express";
import Server from "./src/index";

const app = express();
const server = new Server(app);

// Initialize port with a default value
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app
  .listen(port, "localhost", function () {
    console.info(`Server running on : http://localhost:${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log("server startup error: address already in use");
    } else {
      console.log(err);
    }
  });
