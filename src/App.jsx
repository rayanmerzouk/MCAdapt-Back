import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { CardProvider } from './CardContext';
import { AuthProvider } from './AuthContext'; // ✅ Nouveau contexte d'auth

import { SharedLayout } from './components/SharedLayout';
import Profil from './pages/Profil';

import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Panier from './pages/Panier';
import Publier from './components/Publier';
import DetailedProduct from './pages/DetailedProduct';
import Category from "./pages/Category";
import Acceuil from './pages/Acceuil';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider> {/* ✅ Auth autour de tout */}
      <CartProvider>
        <CardProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<Acceuil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/publier" element={<Publier />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/product/:id" element={<DetailedProduct />} />
                <Route path="/category/:type" element={<Category />} />
                <Route path="/profil" element={<Profil />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CardProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
