import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/login", { email, password });
      if (res.data && res.data.personId) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
    return false;
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post("http://localhost:8000/signup", userData);
      if (res.data && res.data.personId) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
    } catch (err) {
      console.error("Erreur d'inscription :", err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
