const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

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
