require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user")

// middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "todo API",
      version: "1.0.0",
      description: "A todo list express API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(specs))
app.use("/home", todoRouter);
app.use("/auth", userRouter);

app.listen(5000, () => {
  console.log("server has started listen on port 5000");
});
