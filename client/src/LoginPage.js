import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'
import axios from 'axios'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorData, setErrorData] = useState([])
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/v1/login", {
        username: username,
        password: password
      })
      setUser(response.data)
      setUsername("")
      setPassword("")
      navigate("/main")
    } catch (error) {
      setErrorData(error);
      console.error(`No way, bruh ${error.message}`)
    }
  }

  const handleSwitch = () => {
    navigate("/signup")
  }

  return (
    <div style={{ paddingLeft: '20px', paddingTop: '60px'}}>
      <h3>Become a member</h3><button onClick={handleSwitch}>Signup</button>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default LoginPage;