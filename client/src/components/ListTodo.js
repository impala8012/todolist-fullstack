import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import styled from "styled-components";
import { ButtonStyle } from "./ButtonStyle";
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
  color: ${(props) => props.theme.fontColor} h2 {
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

const SearchContainer = styled.div`
  width: 30%;
  margin: auto;
  padding: 1rem;

  form {
    display: flex;
  }

  input {
    width: 100%;
    border: 3px solid #00b4cc;
    border-right: none;
    padding: 5px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #9dbfaf;
  }
  input:focus {
    color: #00b4cc;
  }

  button {
    width: 40px;
    height: 36px;
    border: 1px solid #00b4cc;
    background: #00b4cc;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
  }
`;

const Button = styled(ButtonStyle)`
  &:hover {
    color: green;
  }
`;
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/todos?title=${searchTerm}`
      );
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <SearchContainer>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search.."
            value={searchTerm}
          />
          <button>
            <i class="fa fa-search"></i>
          </button>
        </form>
      </SearchContainer>
      <WrapContainer>
        {console.log("filter todos", todos)}
        {todos
          .filter((todo) => {
            if (searchTerm === "") {
              return todo;
            } else if (
              todo.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return todo;
            }
          })
          .map((todo) => (
            <Item key={todo.todo_id}>
              <div className="text">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <EditTodo todo={todo} />
                <Button onClick={() => handleDelete(todo.todo_id)}>
                  Delete
                </Button>
              </div>
            </Item>
          ))}
      </WrapContainer>
    </Fragment>
  );
};

export default ListTodo;
