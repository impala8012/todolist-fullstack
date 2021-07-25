import React, {Fragment, useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Dashboard  from './components/Dashboard';
import Login from "./components/Login";
import Register from "./components/Register";
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo'
import Header from "./components/Header";
import  { ThemeProvider } from "styled-components"
import {lightTheme, darkTheme, GlobalStyle} from "./theme"


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticate(boolean);
  }
  const themetoggler = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <Fragment>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticate ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticate ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            ></Route>
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticate ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </Router>
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
