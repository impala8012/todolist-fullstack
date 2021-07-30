import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { CustomButton } from "../../components/ButtonStyle";

const subColor = "grey";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 5px 0;
  }

  input[type="password"] {
    margin-bottom: 10px;
  }
`;

const Nav = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        setAuth(true);
        toast.success("Log in successfully");
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
      <LoginPageContainer>
        <h1>Login</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputContainer>
            <FormInputContainer
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
            ></FormInputContainer>
          </InputContainer>
          <InputContainer>
            <FormInputContainer
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            ></FormInputContainer>
          </InputContainer>
          <CustomButton>Submit</CustomButton>
        </Form>
        <Nav to="/register">Haven't Register? Go Register</Nav>
      </LoginPageContainer>
    </Fragment>
  );
};

export default Login;
