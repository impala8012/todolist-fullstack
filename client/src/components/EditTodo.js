import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const handleEdit = async e => {
      e.preventDefault()
      try {
        const body = {description}
        const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        window.location = "/"
        
      } catch (err) {
          console.log(err.message)
      }
  }
  const handleClick = () => {
      setDescription(todo.description)
  }
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target={`id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        id={`id${todo.todo_id}`}
        class="modal fade"
        role="dialog"
        onClick={handleClick}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={handleClick}
              >
                &times;
              </button>
              <h4 class="modal-title">Edit Todo</h4>
            </div>
            <div class="modal-body">
              <input type="text" value={description} onChange={handleChange} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={handleClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
