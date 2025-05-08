import { createContext, useState, useEffect } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('cards');
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    const fetchCards = () => {
      try {
        const savedCards = localStorage.getItem('cards');
        if (savedCards) {
          setCards(JSON.parse(savedCards));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des cartes.");
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cards', JSON.stringify(cards));
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des cartes.");
    }
  }, [cards]);

  return (
    <CardContext.Provider value={{ cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};
