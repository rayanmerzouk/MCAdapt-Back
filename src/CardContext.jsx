import { createContext, useState, useEffect } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    // Récupérer les cartes depuis le localStorage ou définir un tableau vide si rien n'est trouvé
    const savedCards = localStorage.getItem('cards');
    return savedCards ? JSON.parse(savedCards) : [];
  });
  const [loading, setLoading] = useState(true); // Au début, on suppose que les cartes sont en train de se charger
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler un chargement ou gérer les erreurs si nécessaire
    const fetchCards = () => {
      try {
        // Simuler un délai de chargement pour récupérer les cartes depuis localStorage
        setLoading(true);
        const savedCards = localStorage.getItem('cards');
        if (savedCards) {
          setCards(JSON.parse(savedCards));
        }
        setLoading(false); // Une fois le chargement terminé, on change l'état
      } catch (err) {
        setError("Erreur lors du chargement des cartes.");
        setLoading(false); // Toujours arrêter le chargement même en cas d'erreur
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    // Sauvegarder les cartes dans le localStorage chaque fois que la liste de cartes change
    if (cards.length > 0) {
      try {
        localStorage.setItem('cards', JSON.stringify(cards));
      } catch (err) {
        setError("Erreur lors de la sauvegarde des cartes.");
      }
    }
  }, [cards]);

  return (
    <CardContext.Provider value={{ cards, setCards, loading, error }}>
      {children}
    </CardContext.Provider>
  );
};
