import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { validateEmail, validatePassword } from "../utils/validators";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Email ou mot de passe invalide.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-400 text-white p-2 rounded hover:bg-gray-200 hover:text-black"
        >
          Se connecter
        </button>

        <p className="mt-4 text-sm text-center">
          Pas encore inscrit ?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
