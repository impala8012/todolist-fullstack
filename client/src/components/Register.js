import React, { Fragment, useState } from "react";

const Register = ({setauth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputs;

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const body = {email, password, username}
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json()
      // save to the localStorage
      localStorage.setItem("token", parseResponse.token)
      setauth(true)
    } catch (err) {
      console.log(err.message)
    }

  }
  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

export default Register;
