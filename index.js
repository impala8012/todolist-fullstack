require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =======Route======= */

// Create a todo
app.post("/todos", async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res, next) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});
// Get a todo
app.get('/todos/:id', async(req, res, next) => {
    try {  
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.status(200).json(todo.rows)
    } catch (err) {
        console.log(err.message)
    }
})


// update a todo
app.put('/todos/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        const {description} = req.body
        console.log("description", description);
        const updateTodo = await pool.query(
          "UPDATE todo SET description = $1 WHERE todo_id = $2",
          [description, id]
        );
        res.status(204).send("Todo was updated")
    } catch (err) {
        console.log(err.message)
    }
})
// delete a todo
app.delete("/todos/:id", async(req, res, next) => {
    try {
        const {id} = req.params
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])
        res.status(204).send("Todo was deleted")
    } catch (err){
        console.log(err.message)
    }
})


app.listen(5000, () => {
  console.log("server has started listen on port 5000");
});
