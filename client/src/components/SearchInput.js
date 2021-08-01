import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 25%;
  margin-left: 30px;
  padding: 1rem;

  form {
    display: flex;
  }

  input {
    width: 100%;
    border-right: none;
    padding: 5px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #9dbfaf;
    font-size: 18px;
  }

  button {
    width: 40px;
    height: 34px;
    text-align: center;
    color: #000;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
  }

`;

const SearchInput = ({ searchTerm, setSearchTerm, setTodos }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/todos?title=${searchTerm}`
      );
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search.."
          value={searchTerm}
        />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </form>
    </SearchContainer>
  );
};

export default SearchInput;
