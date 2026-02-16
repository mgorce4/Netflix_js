import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

function CartButton() {
	const { cartItems, removeFromCart } = useCart();
	const [showCart, setShowCart] = useState(false);
	const cartCount = cartItems.length;

	const toggleShow = () => setShowCart((prev) => !prev);

	// Suppression au double-clic
	const handleRemove = (id) => {
		removeFromCart(id);
	};

	return (
		<div className="relative flex">
			<button
				className="relative hover:text-gray-300 transition"
				onClick={toggleShow}
				aria-label="Afficher le panier"
			>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
				{cartCount > 0 && (
					<span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
						{cartCount}
					</span>
				)}
			</button>
			{/* Dropdown du panier */}
			{showCart && (
				<div className="absolute right-0 mt-8 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
					<h3 className="text-lg font-bold mb-2">Mon panier</h3>
					{cartItems.length === 0 ? (
						<div className="text-gray-400">Aucun film dans le panier.</div>
					) : (
						<ul>
							{cartItems.map((item) => (
								<li
									key={item.id}
									className="flex items-center justify-between py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 rounded px-2"
									onDoubleClick={() => handleRemove(item.id)}
									title="Double-cliquez pour retirer"
								>
									<span className="truncate max-w-[150px]">{item.title}</span>
									<span className="text-primary font-bold">{item.price}€</span>
								</li>
							))}
						</ul>
					)}
					<div className="mt-3 text-right">
						<span className="font-semibold">Total: </span>
						<span className="text-primary font-bold">
							{cartItems.reduce((sum, m) => sum + (m.price || 0), 0)}€
						</span>
					</div>
					<div className="text-xs text-gray-400 mt-2">Double-cliquez sur un film pour le retirer.</div>
				</div>
			)}
		</div>
	);
}
export default CartButton;