import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

// Custom hook pour utiliser le contexte
export const useSearch = () => {
  return useContext(SearchContext);
};

// Provider de contexte
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
