import { useContext } from "react";
import { CardContext } from "../CardContext";
import SideBar from "../components/SideBar";
import Card from "../components/Card";

export const NewArr = () => {
  const { cards } = useContext(CardContext);

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Boutique</h1>

        {cards.length === 0 ? (
          <p className="text-gray-500">Aucun produit disponible.</p>
        ) : (
          <ul className="grid grid-cols-3 gap-3">
            {cards.map((card) => (
              <li key={card.id}>
                <Card {...card} isShop={true} /> {/* Ajout de isShop={true} */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewArr;
