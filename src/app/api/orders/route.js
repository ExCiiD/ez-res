import { NextResponse } from "next/server";

let orders = []; // Stockage en mémoire des commandes

export async function POST(request) {
    //On récupere les données envoyés par le client (panier)
    const cartData = await request.json();

    console.log("Données brutes reçues du client:", JSON.stringify(cartData, null, 2));

    const newOrder = {
        id: Date.now(),
        items: cartData, // C'est ici que 'items' est défini
        status: 'En attente',
    };

    orders.push(newOrder);
    console.log("Nouvelle commande formatée:", JSON.stringify(newOrder, null, 2));

    return NextResponse.json({ message: "Commande reçue avec succès !" });
}

export async function GET(request) {
    //Retourne toutes les commandes (pour l'instant en mémoire)
    return NextResponse.json(orders);   
}
