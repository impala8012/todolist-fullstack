require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user")
const port = process.env.PORT || 5000;
const path = require("path")

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production") {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname,"client/build")))
}


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
// in case they go to outside of the routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(port, () => {
  console.log(`server has started listen on port ${port}`);
});
