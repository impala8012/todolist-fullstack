import React, { Fragment, useState } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("")
    const handleChange = e => {
        setDescription(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            // refresh and show the home page
            window.location = "/"
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
      <Fragment>
        <h1 className="text-center">Todo List</h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input type="text" value={description} onChange={handleChange} />
          <button>Add</button>
        </form>
      </Fragment>
    );
}

export default InputTodo