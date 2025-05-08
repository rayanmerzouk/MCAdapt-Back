import { createContext, useContext, useState, useEffect } from "react";

// Crée le contexte
export const AuthContext = createContext();

// Hook pour l'utiliser
export const useAuth = () => useContext(AuthContext);

// Provider global
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Exemple : récupérer depuis localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(user => user.email === email && user.password === password);

    if (foundUser) {
      setUser({ email: foundUser.email, role: foundUser.role || "user" });
      localStorage.setItem("user", JSON.stringify({ email: foundUser.email, role: foundUser.role || "user" }));
      localStorage.setItem("userEmail", foundUser.email);  // Sauvegarder l'email dans localStorage
      return true;  // Connexion réussie
    }
    return false;  // Identifiants incorrects
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");  // Supprimer l'email lors de la déconnexion
    localStorage.removeItem(`cart-${localStorage.getItem("userEmail")}`);  // Supprimer le panier associé
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
