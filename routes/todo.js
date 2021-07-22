const router = require("express").Router();
const pool = require("../db");



/**
 * @swagger
 * components:
 *   schemas:
 *     Todos:
 *       type: object
 *       required:
 *         - id
 *         - description
 *         - title 
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the todo
 *         description:
 *           type: string
 *           description: the todo list
 *         title: 
 *           type: string 
 *           description: The todo Title
 *       example:
 *         id: 2
 *         description: walk the dogs
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 */

/**
 * @swagger
 *  /todos:
 *      post:
 *          summary: Create a new todo
 *          tags: [Todos]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Todos'
 *          responses:
 *              201:
 *                  description: The todo was successfully created
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              $ref: '#/components/schemas/Todos'
 *              500: 
 *                  description: Some server error
 */

// Create a todo
router.post("/", async (req, res, next) => {
  try {
    const { description, title } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, title) VALUES($1,$2) RETURNING *",
      [description, title]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @swagger
 *  /todos:
 *      get:
 *          summary: Get all todos
 *          tags: [Todos]
 *          responses:
 *              200:
 *                  description: The list of the todos
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Todos'
 *              500: 
 *                  description: Some server error
 */


// Get all todos
router.get("/", async (req, res, next) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @swagger
 *  /todos/{id}: 
 *      get:
 *          summary: Get todo by id
 *          tags: [Todos]
 *          parameters: 
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The todo id
 *          responses:
 *              200:
 *                  description: The todo by id
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              $ref: '#/components/schemas/Todos'
 *              404: 
 *                  description: Todo was not found
 */
// Get a todo
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @swagger
 *  /todos/{id}: 
 *      put:
 *          summary: Update todo by id
 *          tags: [Todos]
 *          parameters: 
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The todo id
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Todos'
 *          responses:
 *              20$:
 *                  description: The todo was updated
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              $ref: '#/components/schemas/Todos'
 *              404: 
 *                  description: Todo was not found
 *              500: 
 *                  description: Some error happened
 */

// update a todo
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, title } = req.body;
    console.log("description", description);
    console.log("title", title);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, title = $2 WHERE todo_id = $3",
      [description, title, id]
    );
    res.status(204).send("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});


/**
 * @swagger
 *  /todos/{id}: 
 *      delete:
 *          summary: Delete todo by id
 *          tags: [Todos]
 *          parameters: 
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true
 *                description: The todo id
 *          responses:
 *              204:
 *                  description: The todo was deleted 
 *              404: 
 *                  description: Todo was not found
 */
// delete a todo
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.status(204).send("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
