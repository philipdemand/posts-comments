import React, { useContext } from 'react'
import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Main from './Main'

function App() {

  const {user} = useContext(UserContext);

  return (
    <div>
      <NavBar />
      {!user ? (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/main" element={<Main />} />
      </Routes>
    )}
    </div>
  );
}

export default App;
