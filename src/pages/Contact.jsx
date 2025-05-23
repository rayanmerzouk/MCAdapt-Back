import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message envoyé avec succès.');
        e.target.reset(); // Réinitialiser le formulaire
      } else {
        setStatus(data.error || 'Erreur lors de l’envoi.');
      }
    } catch (error) {
      setStatus('Erreur réseau.');
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Form Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-6">Contactez-nous</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@exemple.com"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Votre message..."
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Envoyer
              </button>
              {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-orange-100 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Nos informations</h3>
            <p className="text-gray-700 mb-2"><strong>Email :</strong> contact@tonsite.com</p>
            <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> +213 6 12 34 56 78</p>
            <p className="text-gray-700"><strong>Adresse :</strong> Alger, Algérie</p>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-orange-600 mb-2">Disponible 24h/24</h4>
              <p className="text-sm text-gray-600">Réponse rapide garantie sous 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
