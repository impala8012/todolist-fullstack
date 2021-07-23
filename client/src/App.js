import React, {Fragment, useState} from 'react'
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo'
import Header from "./components/Header";
import  { ThemeProvider } from "styled-components"
import {lightTheme, darkTheme, GlobalStyle} from "./theme"


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const themetoggler = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <Fragment>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header
          themetoggler={themetoggler}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <InputTodo />
        <ListTodo />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
