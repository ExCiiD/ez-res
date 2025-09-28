"use client";
import Image from "next/image";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";
import { menuItems } from "./data/food";
import { useState, useEffect } from "react";

export default function Home() {

  const [cart, setCart] = useState([]); // L'état initial est un tableau vide []

  const handleAddToCart = (itemToAdd) => {

    // On vas chercher si l'article est déjà dans le panier
    const existingItem = cart.find((itemInCart) => itemInCart.id === itemToAdd.id);
    // On verifire si on a trouvé un article
    if (existingItem) {
      // Cas 1: L'article existe, on met à jour la quantité
      const updatedCart = cart.map((itemInCart) =>
        itemInCart.id === itemToAdd.id
          ? { ...itemInCart, quantity: itemInCart.quantity + 1 } // On retourne une copie mise à jour
          : itemInCart // Sinon on retourne l'original
      );
      setCart(updatedCart);
    } else {
      // Cas 2: L'article n'existe pas, on l'ajoute
      // On crée un NOUVEL objet avec la propriété quantity
      const newItem = { ...itemToAdd, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const handleRemoveFromCart = (itemToRemove) => {
    const existingItem = cart.find((itemInCart) => itemInCart.id === itemToRemove.id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        // Si la quantité est de 1, on supprime l'article du panier
        const updatedCart = cart.filter((itemInCart) => itemInCart.id !== itemToRemove.id);
        setCart(updatedCart);
      } else {
        // Sinon, on décrémente la quantité
        const updatedCart = cart.map((itemInCart) =>
          itemInCart.id === itemToRemove.id
            ? { ...itemInCart, quantity: itemInCart.quantity - 1 }
            : itemInCart
        );
        setCart(updatedCart);
      }
    }
  };

  // Fonction pour vider le panier

  const handleClearCart = () => {
    setCart([]); // Réinitialise le panier à un tableau vide
    alert("Le panier a été vidé !");
  };


  return (
    <div className="flex">

      <main className="w-2/3 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map(item => (
            <FoodCard
              key={item.id}
              {...item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-600"
          onClick={handleClearCart} >
          Vider le panier ({cart.length})
        </button> 
      </main>

      <aside className="w-1/3 p-8 bg-white h-screen sticky top-0">
        {/* 2. On utilise le composant Cart et on lui passe l'état du panier */}
        <Cart
          cartItems={cart}
          onRemoveItem={handleRemoveFromCart}
        />
      </aside>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
