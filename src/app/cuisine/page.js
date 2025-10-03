// On définit une fonction pour aller chercher les données des commandes
// dans notre API interne
export async function fetchOrders() {
    const response = await fetch('http://localhost:3000/api/orders', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes');
    }   
    return response.json();
}

export default async function CuisinePage() {
    const orders = await fetchOrders(); 
    console.log("Commandes reçues:", orders);

    return (
        <div className="bg-gray-800 min-h-screen p-8 text-white">
            <h1 className="text-4xl font-bold text-center mb-10" >Commandes en Cuisine</h1>
            {/* on verifie si on a des commandes. si non on affiche un message */}
            {orders.length === 0 ? (
                <p className="text-center text-xl">Aucune commande en cours.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Commande #{index + 1}</h2>
                            <ul className="space-y-2">
                                {order.items && order.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex justify-between">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="font-mono">{(item.price * item.quantity).toFixed(2)} €</span>
                                    </li>
                                ))}
                            </ul>   
                            <div className="mt-4 border-t border-gray-600 pt-4 text-right text-xl font-bold">
                                Total: {order.items && order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €
                            </div>
                        </div>
                    ))}
                </div>
            )}  
        </div>
    );
}