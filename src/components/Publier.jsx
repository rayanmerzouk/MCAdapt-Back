import { useState, useContext } from "react";
import { CardContext } from "../CardContext";
import { useAuth } from "../AuthContext";
import SideBar from "../components/SideBar";

export const Publier = () => {
  const { cards, setCards } = useContext(CardContext);
  const { user } = useAuth();

  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    productEmail: "",
    productPassword: "",
  });

  const openFileExplorer = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    images.forEach((url) => URL.revokeObjectURL(url));
    setImages(imagePreviews);
    setProfileImage(imagePreviews[0]);
  };

  const handleProfileImageSelect = (image) => {
    setProfileImage(image);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ajouterCard = () => {
    const { title, type, description, price, productEmail, productPassword } = formData;

    if (!title || !type || !description || !price) {
      alert("Veuillez remplir toutes les informations du produit.");
      return;
    }

    if (!user?.email) {
      alert("Vous devez être connecté pour publier un produit.");
      return;
    }

    const newCard = {
      id: Date.now(),
      img: profileImage,
      gallery: images,
      title,
      type,
      description,
      price,
      email: user.email,
      productEmail,
      productPassword,
    };

    setCards([...cards, newCard]);

    // reset
    setImages([]);
    setProfileImage(null);
    setFormData({
      title: "",
      type: "",
      description: "",
      price: "",
      productEmail: "",
      productPassword: "",
    });
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Publier un produit</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-xl border">
            <input
              type="text"
              name="title"
              placeholder="Nom du produit"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
            />
            <input
              type="text"
              name="type"
              placeholder="Type de produit"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2 h-32"
            />
            <input
              type="number"
              name="price"
              placeholder="Prix"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
            />
            <input
              type="email"
              name="productEmail"
              placeholder="Email du produit"
              value={formData.productEmail}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
            />
            <input
              type="text"
              name="productPassword"
              placeholder="Mot de passe du produit"
              value={formData.productPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-2"
            />
            <button
              onClick={ajouterCard}
              className="bg-orange-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-4"
            >
              Publier
            </button>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl border">
            <button
              onClick={openFileExplorer}
              className="bg-orange-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Importer des images
            </button>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="fileInput"
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${src === profileImage ? "border-4 border-blue-500" : ""}`}
                  onClick={() => handleProfileImageSelect(src)}
                />
              ))}
            </div>
            {images.length > 1 && (
              <p className="text-gray-600 mt-2 text-sm">
                Cliquez pour définir l'image principale.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publier;
