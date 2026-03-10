import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {AccountCard} from "./AccountCard.tsx";
import {BadgePercent, CalendarDays, DollarSign, ShoppingBag} from "lucide-react";
import {OrderItem} from "./OrderItem.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import type {Order} from "../models/Order.ts";
import {Header} from "./Header.tsx";

export const AccountPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const {id} = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [totalSaved, setTotalSaved] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id)
        service.getAllOrdersForUser(id).then(res => {
            setLoading(true);
            let newTotal = 0;
            let newTotalSaved = 0;
            let newTotalOrders = 0;
            res?.forEach(order => {
                newTotal = newTotal + Number(order.total);
                newTotalSaved = newTotalSaved + Number(order.total) * 0.16;
                newTotalOrders = newTotalOrders + 1;
            })
            setTotal(newTotal); setTotalSaved(newTotalSaved); setTotalOrders(newTotalOrders);
            if(res)
                setOrders(res);
            setLoading(false);
        })
    }, [service, id]);
    return (
        <div>
            <Header title={"Account Statistics"}/>

            <div className="grid grid-cols-2 gap-3 pb-6">
                <AccountCard
                    headline="Total Spent"
                    content={Number(total).toFixed(2) + " Lei"}
                    Icon={DollarSign}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Total Saved via Deals"
                    content={Number(totalSaved).toFixed(2) + " Lei"}
                    Icon={BadgePercent}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Total Orders"
                    content={totalOrders + " orders"}
                    Icon={ShoppingBag}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Account Lifetime"
                    content="12 days"
                    Icon={CalendarDays}
                    buttonContent="Account Details"
                />
            </div>

            <h2 className="text-[22px] font-bold text-[#2a3624] tracking-tight mb-3">
                Order History
            </h2>

            {loading && (
                <div>
                    <div className="flex flex-col items-center justify-center p-12">
                        <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                        <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching orders...</p>
                    </div>
                </div>
                )}

            <div className="flex flex-col pb-22">
                {orders.map((order, idx) => (
                    <OrderItem
                        key={order.id}
                        number={orders.length - idx}
                        date={order.timestamp}
                        total={order.total}
                    />
                ))}
            </div>

        </div>
    );
}