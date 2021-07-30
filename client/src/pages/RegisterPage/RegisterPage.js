import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CustomButton } from "../../components/ButtonStyle";

const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0;

  &:focus {
    outline: none;
  }
`;

const RegisterPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      if (parseResponse.token) {
        // save to the localStorage
        localStorage.setItem("token", parseResponse.token);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <RegisterPageContainer>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <FormInputContainer
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
          ></FormInputContainer>
          <FormInputContainer
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          ></FormInputContainer>
          <FormInputContainer
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          ></FormInputContainer>
          <CustomButton>Submit</CustomButton>
        </Form>
        <Link to="/login">Login</Link>
      </RegisterPageContainer>
    </Fragment>
  );
};

export default Register;
