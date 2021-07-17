import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData)
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async(id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getTodos();
  },[]);
  return (
    <Fragment>
      <table>
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
                <button className="btn" onClick={handleDelete}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
