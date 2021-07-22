import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import styled from "styled-components";
import {ButtonStyle} from "./ButtonStyle"
const WrapContainer = styled.div`
  width: 1200px;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 350px;
  margin: 15px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  transform: translateY(0px);
  transition: 0.5s;

  h2 {
    border-bottom: 1px solid #888;
    padding-bottom: 0.3em;
    margin-bottom: 0.4em;
    transition: 0.25s;
  }

  p {
    line-height: 1.6;
    font-weight: 300;
    transition: 0.25s;
  }

  .text {
    padding: 30px;
    position: relative;

  }

  &:hover {
    transform: translateY(-25px);

    .text {
      background-image: linear-gradient(0deg, #fb8076, #feb85d);

      &:before {
        border-left: 184 solid #feb85d;
        border-right: 184 solid #feb85d;
      }
    }

    h2 {
      color: #fff;
      border-bottom-color: #fff;
    }

    p {
      color: #fff;
    }
  }
`;

const Button = styled(ButtonStyle)`
  &:hover {
    color: green;
  }
`;
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log("id",id)
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <WrapContainer>
        {todos.map((todo) => (
          <Item key={todo.todo_id}>
            <div className="text">
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <EditTodo todo={todo}/>
              <Button onClick={() => handleDelete(todo.todo_id)}>Delete</Button>
            </div>
          </Item>
        ))}
      </WrapContainer>

      {/* <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Fragment>
  );
};

export default ListTodo;
