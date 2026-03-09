import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {CartProduct} from "./CartProduct.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import type {CartItem} from "../models/CartItem.ts";

export const CartPage = () => {
    const container = useServices();
    const service = container.cartService;
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true);
    const {id} = useAuth();

    const handleIncrement = (id: number) => {
        service.incrementCartItem(id).then()
    }

    const handleDecrement = (id: number) => {
        service.decrementCartItem(id).then()
    }

    const handleDelete = (id: number) => {
        service.removeCartItem(id).then()
    }

    const handleConfirmOrder = (userId: number | null) => {
        service.confirmOrder(userId).then()
    }

    useEffect(() => {
        if(id)
            service.getAllForUser(id).then(res => setCartItems(res)).finally(() => setLoading(false));
    }, [id, service]);

    if(loading)
        return <div>Loading... </div>

    return (
        <div className="min-h-screen bg-[#f8f9f5] px-4 pt-4 pb-28 relative">

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Cart</h1>

            <div className="flex flex-col">
                {cartItems.map(item => (
                    <CartProduct id={item.id} productName={item.productName} imageURL={item.imageURL} appliedPrice={item.appliedPrice} selectedQuantity={item.selectedQuantity} onIncrement={handleIncrement} onDecrement={handleDecrement} onDelete={handleDelete} />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#f8f9f5] via-[#f8f9f5] to-transparent">
                <button
                    onClick={() => handleConfirmOrder(id)}
                    className="w-full relative flex items-center justify-center bg-[#879973] active:bg-[#768664] text-white text-[17px] font-semibold py-4 rounded-full transition-colors shadow-sm"
                >
                    Confirm Order
                    <span className="absolute right-5 text-xl font-light">
                    &gt;
                </span>
                </button>
            </div>
        </div>
    );
}