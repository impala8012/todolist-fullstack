import React, { Fragment, useState } from "react";
import Modal from "./Modal";
import { ButtonStyle as Button } from "./ButtonStyle";
import styled from "styled-components";

const ModalWrapped = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    outline: none;
    width: 500px;
    height: 25px;
    margin: 0 5px;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const EditTodo = ({ todo, setTodoChange }) => {
  const [inputs, setInputs] = useState({
    title: todo.title,
    description: todo.description
  })
  // const [description, setDescription] = useState(todo.description);
  // const [title, setTitle] = useState(todo.title);
  const [displayModal, setDisplayModal] = useState(false);
  const {title, description} = inputs
  const openModal = () => {
    setDisplayModal(true);
    console.log("I am triggered");
    console.log("see my state", displayModal);
  };
  const hideModal = () => {
    setDisplayModal(false);
    // setDescription(todo.description);
    // setTitle(todo.title);
    setInputs({ title: todo.title, description: todo.description });
  };

  const handleChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }
  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleDescriptionChange = (e) => {
  //   setDescription(e.target.value);
  // };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description, title };
      await fetch(`/home/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      setTodoChange(true)
      setDisplayModal(!displayModal)
      // window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  // const handleClick = () => {
  //   setDescription(todo.description);
  // };
  return (
    <Fragment>
      <Button onClick={openModal}>Edit</Button>
      <Modal displayModal={displayModal}>
        <ModalWrapped>
          <h4>Edit Todo</h4>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </ModalWrapped>
        <ButtonContainer>
          <Button onClick={(e) => handleEdit(e)}>Edit</Button>
          <Button onClick={hideModal}>Close</Button>
        </ButtonContainer>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
