const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: the user's username
 *         email:
 *           type: string
 *           description: the email for the user also to ckeck for login and register
 *         password:
 *           type: string
 *           description: the password for the user also to ckeck for login and register
 *       example:
 *         username: test5
 *         email: test5@gmail.com
 *         password: 1234567890  
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User API
 */

/**
 * @swagger
 *  /auth/register:
 *      post:
 *          summary: Registger user
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          responses:
 *              201:
 *                  description: The todo was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 *              500:
 *                  description: server error
 */

// post register 
router.post('/register', validInfo, async(req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email])
    // check if exists
    if(user.rows.length > 0) {
      return res.status(401).json("User Already Exist")
    }

    // Bcrtpt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
      [username, email, bcryptPassword]
    );
      console.log("newUser:", newUser)
    // generating jwt token
    const token = jwtGenerator(newUser.rows[0].user_id)
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error");
  }
})

/**
 * @swagger
 *  /auth/login:
 *      post:
 *          summary: User login
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          responses:
 *              201:
 *                  description: The user was successfully logged
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 *              500:
 *                  description: server error
 */



router.post("/login", validInfo, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email])
    if(user.rows.length === 0) {
      return res.status(401).json("Password or Email incorrect")
    }

    // check if incoming password is the same
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if(!validPassword) {
      return res.status(401).json("Password or Email incorrect");
    }
    // generating jwt token
    const token = jwtGenerator(user.rows[0].user_id)
    return res.status(200).json({token})
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify",authorization, (req, res, next) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router
