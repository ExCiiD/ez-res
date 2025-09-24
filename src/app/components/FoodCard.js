"use client"; 

import Image from "next/image";

export default function FoodCard({ category, name, price, ingredients, imageUrl, onAddToCart }) {
    return(
        <div className="bg-gray-600 p-4 rounded-lg text-center">
            <Image
                src={imageUrl}
                alt={name}
                width={250}
                height={250}
                className="mx-auto"
            />
            <h2 className="text-xl font-bold my-2">{category}</h2>
            <h3 className="text-xl font-semibold my-2">{name}</h3>
            <p className="text-gray-200">{ingredients.join('.')}</p>
            <p className="text-lg font-semibold mt-2">{price} €</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-600"
                onClick={onAddToCart} >
                Ajouter
            </button>
        </div>
    );
}