import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HomePage, LoginPage, LandingPage, RegisterPage } from "./pages";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const setAuth = (boolean) => {
    setIsAuthenticate(boolean);
  };
  const themetoggler = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  const isAuth = async() => {
    try {
      const response = await fetch("/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      console.log("is-Auth",parseResponse);
      parseResponse === true
        ? setIsAuthenticate(true)
        : setIsAuthenticate(false);
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
          <ToastContainer />
          <Header
            themetoggler={themetoggler}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setAuth={setAuth}
            isAuthenticate={isAuthenticate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticate ? <LandingPage /> : <Redirect to="/home" />
              }
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticate ? (
                  <LoginPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/home" />
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
                  <Redirect to="/home" />
                )
              }
            ></Route>
            <Route
              exact
              path="/home"
              render={(props) =>
                isAuthenticate ? (
                  <HomePage {...props} setAuth={setAuth} />
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
