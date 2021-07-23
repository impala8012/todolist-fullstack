import React from "react"
import ReactDom  from "react-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: translate(-50%,-50%);
`;

const Overlays = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;
const Modal = ({ children, displayModal, handleClose }) => {
  if (!displayModal) return null;
  return ReactDom.createPortal(
    <Overlays>
      <ModalContainer>
        {children}
      </ModalContainer>
    </Overlays>,
    document.getElementById("portal")
  );
};
export default Modal
