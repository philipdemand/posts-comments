import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/me");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setUser(data);
            navigate("/main")
          } else {
            navigate("/");
          }
        } else {
          setUser(null);
          navigate("/");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };