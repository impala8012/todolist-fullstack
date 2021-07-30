import React from "react"
import styled from "styled-components"

const LandingContainer = styled.div`
  text-align: center;
  animation: rightLeft 4s linear infinite;

  @keyframes rightLeft {
    30% {
      transform: translate(30px, 0px);
    }

    70% {
      transform: translate(-30px, 0px);
    }
  }

`;

const Landing = () => {
  return (
    <LandingContainer>
      <h1>Welcome to Todo App</h1>
      <p>Please Sign in to start your first todo</p>
    </LandingContainer>
  );
}

export default Landing; 