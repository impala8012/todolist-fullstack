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

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [title, setTitle] = useState(todo.title);
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = () => {
    setDisplayModal(true);
    console.log("I am triggered");
    console.log("see my state", displayModal);
  };
  const hideModal = () => {
    setDisplayModal(false);
    setDescription(todo.description);
    setTitle(todo.title);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description,title };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
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
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </ModalWrapped>
        <ButtonContainer>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={hideModal}>Close</Button>
        </ButtonContainer>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
