"use client";
import Image from "next/image";
import FoodCard from "./components/FoodCard";
import { menuItems } from "./data/food";
import { useState } from "react";

export default function Home() {

  const [cart, setCart] = useState([]); // L'état initial est un tableau vide []

  const handleAddToCart = (itemToAdd) => {
    // On utilise setCart pour mettre à jour le panier.
    // On crée un NOUVEAU tableau qui contient tout ce qu'il y avait avant (...cart)
    // plus le nouvel article (itemToAdd)
    setCart([...cart, itemToAdd]);
    alert(`${itemToAdd.name} a été ajouté au panier !`); // Pour un retour visuel rapide
  };

  console.log(cart); // Petite astuce pour voir le contenu du panier dans la console du navigateur

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Menu</h1>
        <div className="grid grid-cols-3 gap-8">
          {menuItems.map(item => (
            <FoodCard
              key={item.id}
              {...item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
