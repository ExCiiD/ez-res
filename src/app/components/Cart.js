"use client";

export default function cart({ cartItems, onRemoveItem }) {
    //on calcule le total avec .reduce() qui permet de réduire un tableau à une seule valeur.
    //pour chaque item dans le panier, on ajoute son prix au total (acc)
    const total = cartItems.reduce((acc,currentItem)=>acc + (currentItem.price * currentItem.quantity), 0);

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Très important pour que le serveur comprenne
                },
                body: JSON.stringify(cartItems),
            });
            if (response.ok) {
                const data = await response.json(); // On peut utiliser la réponse du serveur si nécessaire
                console.log(data.message);
                alert("Commande passée avec succès!");
            } else {
                console.error("Erreur lors de la commande");
                alert("Erreur lors de la commande. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            alert("Erreur réseau. Veuillez vérifier votre connexion.");
        }
    };

    return (
        <div className="bg-gray-600 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Votre Commande</h2>

            {/* Condition pour l'affichage */}
            {cartItems.length === 0 ? (
                <p>Le panier est vide.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            <span>{item.name} </span>
                            <span>{item.price.toFixed(2)} € x {item.quantity}</span>
                            <button className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600" onClick={() => onRemoveItem(item)}>Supprimer</button>    
                        </li>
                    ))}
                </ul>
            )}

            {/* Affiche le total seulement si le panier n'est pas vide */}
            {cartItems.length > 0 && (
                <div className="border-t pt-4 mt-4">
                    <p className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        {/* .toFixed(2) pour afficher 2 décimales, ex: 12.00 € */}
                        <span>{total.toFixed(2)} €</span>
                    </p>
                    <button className="bg-green-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-green-600"
                        onClick={handleCheckout}>
                        Payer
                    </button>
                </div>
            )}
        </div>
    )
}