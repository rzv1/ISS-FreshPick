import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {CartProduct} from "./CartProduct.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import type {CartItem} from "../models/CartItem.ts";
import {Header} from "./Header.tsx";
import {Notification} from "./Notification.tsx";

export const CartPage = () => {
    const container = useServices();
    const service = container.cartService;
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useAuth();

    const refreshCart = () => {
        if(id)
            service.getAllForUser(id).then(res => setCartItems(res))
    }

    const handleIncrement = async (id: number) => {
        await service.incrementCartItem(id)
        refreshCart();
    }

    const handleDecrement = async (id: number) => {
        await service.decrementCartItem(id)
        refreshCart()
    }

    const handleDelete = async (id: number) => {
        await service.removeCartItem(id)
        refreshCart()
    }

    const handleConfirmOrder = async () => {
        if(cartItems.length > 0) {
            await service.confirmOrder(id).then((res) => {
                setAlertMessage(res.text);
                setAlertType(res.type);
                setShowAlert(true);
            })
            refreshCart()
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }

    useEffect(() => {
        if(id)
            service.getAllForUser(id).then(res => setCartItems(res)).finally(() => setLoading(false));
    }, [id, service]);

    if (loading) return (
        <div>
            <Header title={"Catalog View"}/>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching cart items...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col">

            <Header title={"Your Cart"}/>

            <div className="grow">
            <div className="flex flex-col">
                {cartItems.map(item => (
                    <CartProduct id={item.id} productName={item.productName} imageURL={item.imageURL} appliedPrice={item.appliedPrice} quantity={item.quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} onDelete={handleDelete} />
                ))}
            </div>
        </div>
            <div className="left-0 w-full p-4 pb-40">
                <button
                    onClick={() => handleConfirmOrder()}
                    style={{backgroundColor: '#7b8964'}}
                    className="w-full relative flex items-center justify-center bg-[#879973] active:bg-[#768664] text-white text-[17px] font-semibold py-4 rounded-full transition-colors shadow-sm"
                >
                    Confirm Order
                    <span className="absolute right-5 text-xl font-light">
                    &gt;
                </span>
                </button>
            </div>
            {showAlert && (
                <Notification text={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />
            )}
        </div>
    );
}