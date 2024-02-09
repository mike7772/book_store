const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Book Store API",
    description: "Description",
  },
  host: "localhost:4000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = [
  "./src/controller/BookController.ts",
  "./src/controller/UserController.ts",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Successful");
});
