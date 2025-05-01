import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { validateEmail, validatePassword } from "../utils/validators";
import { useAuth } from "../AuthContext";  // Import du hook AuthContext

function Signup() {
  const { login } = useAuth(); // Accès à la fonction login du contexte
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const { nom, prenom, email, telephone, password, confirmPassword } = form;

    if (!nom || !prenom || !telephone) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email invalide.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Le mot de passe doit contenir au moins 6 caractères et un chiffre.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Simuler un "database" avec localStorage ou autre méthode
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find(user => user.email === email)) {
      setError("Utilisateur déjà inscrit.");
      return;
    }

    // Sauvegarde des utilisateurs dans localStorage
    const newUser = { nom, prenom, email, telephone, password, google: false };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Utilisation du contexte pour gérer l'authentification
    login(email);  // Connexion automatique après l'inscription
    setSuccess("Inscription réussie ! Vous êtes maintenant connecté.");
    setError("");

    // Redirige vers la page d'accueil ou autre
    navigate("/");
  };

  const handleGoogleSignup = () => {
    const { email } = form;

    if (!validateEmail(email)) {
      setError("Email invalide.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find(user => user.email === email)) {
      setError("Cet email est déjà inscrit.");
      return;
    }

    const newUser = { email, google: true };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    login(email);  // Connexion automatique après l'inscription Google
    setSuccess("Inscription Google réussie ! Vous êtes maintenant connecté.");
    setError("");

    // Redirige vers la page d'accueil ou autre
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          className="w-full p-2 mb-4 border rounded"
          value={form.nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          className="w-full p-2 mb-4 border rounded"
          value={form.prenom}
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
          type="text"
          name="telephone"
          placeholder="Téléphone"
          className="w-full p-2 mb-4 border rounded"
          value={form.telephone}
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
          className="w-full bg-orange-400 text-white p-2 rounded hover:bg-gray-200 hover:cursor-pointer hover:text-black"
        >
          S'inscrire
        </button>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 mt-4 border p-2 rounded hover:bg-gray-50"
        >
          <FcGoogle size={20} /> S'inscrire avec Google
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
