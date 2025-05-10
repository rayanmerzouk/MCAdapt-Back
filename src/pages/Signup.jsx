import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: false, // Initialisation du type à false pour un utilisateur standard
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { username, email, password, confirmPassword, type } = form;

    // Validation des champs
    if (!username || !email || !password || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Envoi des données au backend
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          type, // Envoi de la valeur de type
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Inscription réussie
        setSuccessMessage("Inscription réussie !");
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Erreur lors de l'inscription
        setError(data.message || "Erreur lors de l'inscription.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Erreur de connexion avec le serveur.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 mb-4 border rounded"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-4 border rounded"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          className="w-full p-2 mb-4 border rounded"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-orange-400 text-white p-2 rounded hover:bg-gray-200 hover:text-black"
        >
          S'inscrire
        </button>

        <p className="mt-4 text-sm text-center">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
