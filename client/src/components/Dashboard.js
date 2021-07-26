import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({setauth}) => {
  const [name,setName] = useState("")
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/auth/dashboard",{
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json()
      console.log(parseResponse)
      setName(parseResponse.user_name)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setauth(false)
    toast.success("Logout successfully")
  }

  useEffect(()=> {
    getName()
  },[])
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </Fragment>
  );
}

export default Dashboard