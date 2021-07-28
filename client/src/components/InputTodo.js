import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { ButtonStyle as Button } from "./ButtonStyle";
import ListTodo from "./ListTodo";

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

const InputLabel = styled.label`
  color: grey;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  top: 10px;
  transition: 300ms ease all;

  &:hover {
    ${shrinkLabelStyles}
  }
`;

const InputTodo = ({ setTodoChange }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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
      setDescription("");
      setTitle("");
      setTodoChange(true);
      // window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <InputTodoContainer>
        <h1 className="text-center">Todo List</h1>
        <Form className="flex" onSubmit={handleSubmit}>
          <InputContainer
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
          ></InputContainer>
          <InputContainer
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          ></InputContainer>
          <Button>Add</Button>
        </Form>
      </InputTodoContainer>
    </Fragment>
  );
};

export default InputTodo;
