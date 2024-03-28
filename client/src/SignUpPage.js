import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorData, setErrorData] = useState([])
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassConfChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          r.json().then((err) => setErrorData(err.errors));
        }
      })
      .then((user) => {
        setUser(user);
        navigate("/main")
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };

  const handleSwitch = () => {
    navigate("/login")
  }

  return (
    <div style={{ paddingLeft: '20px', paddingTop: '60px'}}>
      <h3>Already a member?</h3><button onClick={handleSwitch}>Login</button>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="confirmation">Confirm Password:</label>
          <input type="password" id="confirmation" value={passwordConfirmation} onChange={handlePassConfChange} />
        </div>
        <button type="submit">Sign Up</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default SignUpPage;