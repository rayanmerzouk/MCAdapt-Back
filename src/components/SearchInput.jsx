import { useSearch } from "../SearchContext"; // ✅ Importé useSearch

export const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearch(); // ✅ Récupère searchTerm et setSearchTerm

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // ✅ Met à jour le terme de recherche
  };

  return (
    <div className="relative w-full">
      <img className="absolute w-6 h-6 mt-[1px]" src="\src\assets\icons\loupe.png" alt="search" />
      <input
        type="text"
        className="w-70 h-full focus:outline-none font-poppins-regular text-sm border-b-1 bg-gray-100 rounded-sm pl-7"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleChange} // ✅ Gère la modification du champ
      />
    </div>
  );
};

export default SearchInput;
