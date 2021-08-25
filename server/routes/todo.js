const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")


// Create a todo
router.post("/todos", authorization, async (req, res, next) => {
  try {
    const { description, title } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description, title) VALUES($1,$2, $3) RETURNING *",
      [req.user.id,description, title]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


// Get all todos
router.get("/", authorization, async (req, res, next) => {
  try {
    const { title } = req.query;
    if (title) {
      const todos = await pool.query(
        "SELECT * FROM todos WHERE LOWER(title) LIKE LOWER($1) ORDER BY todo_id ASC",
        [`%${title}%`]
      );
      res.status(200).json(todos.rows);
    } else {
      // req.user has the payload
      const userTodos = await pool.query(
        "SELECT u.user_name, t.todo_id, t.description, t.title FROM users AS U LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 ORDER BY todo_id ASC",
        [req.user.id]
      );
      res.status(200).json(userTodos.rows);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a todo
router.get("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// update a todo
router.put("/todos/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, title } = req.body;
    console.log("description", description);
    console.log("title", title);
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1, title = $2 WHERE todo_id = $3 AND user_id = $4",
      [description, title, id, req.user.id]
    );
    if(updateTodo.rows.length === 0) {
      return res.json("You don't have the right to get this todo")
    }
    res.status(204).send("Todo was updated");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// delete a todo
router.delete("/todos/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if(deletedTodo.rows.length === 0) {
      return res.json("This todo is not yours")
    }
    res.status(204).send("Todo was deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
