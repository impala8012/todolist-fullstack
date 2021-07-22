import React, {Fragment} from 'react'
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo'
import Header from "./components/Header";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Header />
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
