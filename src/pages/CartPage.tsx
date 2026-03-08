import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {CartProduct} from "./CartProduct.tsx";
import {useAuth} from "../context/AuthContext.tsx";

export const CartPage = () => {
    const container = useServices();
    const service = container.cartService;
    const orderService = container.inventoryService;
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true);
    const {id} = useAuth();

    const handleIncrement = (id: number) => {
        service.incrementCartItem(id).then()
    }

    const handleDecrement = (id: number) => {
        service.decrementCartItem(id).then()
    }

    const handleConfirmOrder = () => {
        service.confirmOrder(id).then()
    }

    useEffect(() => {
        orderService.
    }, [service]);

    return (
        <div className="min-h-screen bg-[#f8f9f5] px-4 pt-4 pb-28 relative">

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Cart</h1>

            <div className="flex flex-col">
                {cartItems.map(item => (
                    <CartProduct id={item.id} productName={item.name} imageURL={} appliedPrice={item.price} selectedQuantity={} onIncrement={handleIncrement} onDecrement={handleDecrement} />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#f8f9f5] via-[#f8f9f5] to-transparent">
                <button
                    onClick={handleConfirmOrder}
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