import { Application, urlencoded, json, static as estatic } from "express";
import rateLimiter from "./middlewares/rateLimit";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import Controller from "./controller";
import { AppDataSource } from "../data-source";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Controller(app);
  }

  public config(app: Application): void {
    app.use("/public", estatic(__dirname + "/public"));
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(cors());
    AppDataSource.initialize()
      .then(async () => {
        const swaggerDocs = require("../swagger-output.json");
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        app.use(rateLimiter()); //  apply to all requests
      })
      .catch((error) => console.log(error));
  }
}

process.on("beforeExit", function (err) {
  console.error(err);
});
