import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage.js";
import LandingPage from "./components/LandingPage.js";
import RegisterPage from "./components/RegisterPage";
import InputTodo from "./components/InputTodo";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticate(boolean);
  };
  const themetoggler = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/is-auth", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      console.log(parseResponse);
      parseFloat === true ? setIsAuthenticate(true) : setIsAuthenticate(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <Fragment>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <Header
            themetoggler={themetoggler}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setAuth={setAuth}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={LandingPage}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticate ? (
                  <LoginPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticate ? (
                  <RegisterPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticate ? (
                  <InputTodo {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
