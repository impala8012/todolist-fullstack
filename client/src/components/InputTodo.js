import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { ButtonStyle as Button } from "./ButtonStyle";

const InputTodoContainer = styled.div`
  text-align: center;
  padding-bottom: 45px;

  @media only screen and(max-width:425px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Form = styled.form`
  text-align: center;
  position: relative;
  margin: 45px 0;
  input {
    width: 350px;
    margin: 0 5px;
  }
`;


const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: black;
`;

const InputContainer = styled.input`
  background: none;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:hover ~ label {
    ${shrinkLabelStyles}
  }
`;


const InputTodo = ({ setTodoChange }) => {
  const [inputs, setInputs] = useState({
    title: "",
    description: ""
  })
  
  const {title, description} = inputs
  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description, title };
      console.log(body);
      if (!description || !title) return;
      await fetch("http://localhost:5000/home/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      // refresh and show the home page
      setInputs({ title: "", description: "" });
      setTodoChange(true);
      // window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <InputTodoContainer>
        <h1 className="text-center">My Daily Todo</h1>
        <Form className="flex" onSubmit={handleSubmit}>
          <InputContainer
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleChange}
          ></InputContainer>
          <InputContainer
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleChange}
          ></InputContainer>
          <Button>Add</Button>
        </Form>
      </InputTodoContainer>
    </Fragment>
  );
};

export default InputTodo;
