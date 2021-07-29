import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "../theme";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderContainer = styled.div`
  border-bottom: 1px solid black;
  padding: 1rem;
`;

const Nav = styled(Link)`
  margin-left: 15px;
  display: inline-flex;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SunColor = styled.span`
  color: ${({ darkMode }) => (darkMode ? "gray" : "yellow")};
`;

const MoonColor = styled.span`
  color: ${({ darkMode }) => (darkMode ? "#c96dfd" : "gray")};
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #19a2c1;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  /* Rounded sliders */

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .switch-checkbox {
    padding: 10px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = ({ darkMode, setDarkMode, setAuth, isAuthenticate }) => {

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout successfully");
  };
  return (
    <HeaderContainer>
      <GlobalStyle />
      <UserContainer>
        <SwitchContainer>
          <SunColor darkMode={darkMode}>☀︎</SunColor>
          <div className="switch-checkbox">
            <Switch>
              <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
              <span className="slider round"> </span>
            </Switch>
          </div>
          <MoonColor darkMode={darkMode}>☽</MoonColor>
        </SwitchContainer>
        <Nav to="/">Home</Nav>
        {isAuthenticate && <Nav onClick={handleLogout}>Logout</Nav>}
        {!isAuthenticate && (
          <NavContainer>
            <Nav to="/login">Login</Nav>
            <Nav to="/register">Register</Nav>
          </NavContainer>
        )}
      </UserContainer>
    </HeaderContainer>
  );
};

export default Header;
