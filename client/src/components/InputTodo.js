import React, { useState } from "react";
import styled from "styled-components";
import { ButtonStyle as Button } from "./ButtonStyle";

const InputTodoContainer = styled.div`
  text-align: center;

  @media only screen and(max-width:425px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Form = styled.form`
  text-align: center;

  input {
    outline: none;
    width: 350px;
    height: 25px;
    margin: 0 5px;
    border-radius: 5px;
  }
`;

const InputTodo = () => {
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
      console.log(body)
      if (!description || !title) return;
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // refresh and show the home page
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <InputTodoContainer>
      <h1 className="text-center">Todo List</h1>
      <Form className="flex" onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button>Add</Button>
        <hr />
      </Form>
    </InputTodoContainer>
  );
};

export default InputTodo;
