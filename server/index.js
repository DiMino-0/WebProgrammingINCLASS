const express = require("express");
const productsController = require("./controllers/products");
const { statusCodes } = require("./models/errors");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

app
  .use("/", express.static("dist"))
  //controllers
  .use("/api/v1/products", productsController);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;

  const error = {
    status,
    message: err.message || statusCodes.INTERNAL_SERVER_ERROR,
  };
  res.status(status).send(error);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
  Asynchronous patterns in Node.js
  1. Callbacks
  2. Pipeline
  3. Promises
  4. Async/Await
*/

/* 
  Ways to send data to the server
  1. PATH parameters: /users/123
  2. Query parameters: ?name=John&age=30
  3. Headers
    3.5. Cookies
  4. Request body: { "name": "John", "age": 30 }
    4.0. Form data: name=John&age=30
    4.5. JSON data: { "name": "John", "age": 30 }

*/

/* 
  parts of a url
  1. Protocol: http:// or https://
  2. Domain: www.example.com
  3. Port: :80 or :443
  4. Path: /path/to/resource
  5. Query parameters: ?name=John&age=30
  6. Fragment: #section1

  example: https://www.example.com:80/path/to/resource?name=John&age=30#section1
*/

/*
  Module Types
    1. CommonJS:
      import: require('module')
      export: module.exports = { functions, variables, etc. }
    2. ES6:
      import: import { functions, variables, etc. } from 'module'
      export: export { functions, variables, etc. }
*/
