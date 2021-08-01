import React, { Fragment, useState, useEffect } from "react";
import InputTodo from "../../components/InputTodo";
import ListTodo from "../../components/ListTodo";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
`

const HomePage = () => {
  const [name,setName] = useState("")
  const [allTodos, setAllTodos] = useState([])
  const [todoChange, setTodoChange] = useState(false)

  const getUserAndTodos = async() => {
    try {
      const response = await fetch("/home", {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json()
      setAllTodos(parseResponse)
      setName(parseResponse[0].user_name)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getUserAndTodos();
    setTodoChange(false);
  }, [todoChange]);
  return (
    <Fragment>
      <Title>{name}'s Todo List</Title>
      <InputTodo setTodoChange={setTodoChange} />
      <ListTodo allTodos={allTodos} setTodoChange={setTodoChange} />
    </Fragment>
  );
}

export default HomePage;