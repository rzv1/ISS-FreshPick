import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {AccountCard} from "./AccountCard.tsx";
import {BadgePercent, CalendarDays, DollarSign, ShoppingBag} from "lucide-react";
import {OrderItem} from "./OrderItem.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import type {Order} from "../models/Order.ts";

export const AccountPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const {id} = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [totalSaved, setTotalSaved] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [accountLifetime, setAccountLifetime] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id)
        service.getAllOrdersForUser(id).then(res => {
            let newTotal = 0;
            let newTotalSaved = 0;
            let newTotalOrders = 0;
            res?.forEach(order => {
                newTotal = newTotal + order.totalAmount;
                newTotalSaved = newTotalSaved + order.totalAmount * 0.1;
                newTotalOrders = newTotalOrders + 1;
            })
            setTotal(newTotal); setTotalSaved(newTotalSaved); setTotalOrders(newTotalOrders);
            if(res)
                setOrders(res);
        })
    }, [service, id]);
    return (
        <div className="min-h-screen bg-[#f8f9f5] px-4 pt-6 pb-24">

            <h1 className="text-[22px] font-bold text-[#2a3624] tracking-tight mb-4">
                Account History / Statistics
            </h1>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <AccountCard
                    headline="Total Spent"
                    content={"$" + total}
                    Icon={DollarSign}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Total Saved via Deals"
                    content={"$" + totalSaved}
                    Icon={BadgePercent}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Total Orders"
                    content={totalOrders + "orders"}
                    Icon={ShoppingBag}
                    buttonContent="Details"
                />
                <AccountCard
                    headline="Account Lifetime"
                    content="3 yrs, 2 mos, 12 days"
                    Icon={CalendarDays}
                    buttonContent="Account Details"
                />
            </div>

            <h2 className="text-[22px] font-bold text-[#2a3624] tracking-tight mb-3">
                Order History
            </h2>

            <div className="flex flex-col">
                {orders.map(order => (
                    <OrderItem
                        key={order.number}
                        number={order.number}
                        date={order.date}
                        total={order.total}
                        imageURLs={order.imageURLs}
                    />
                ))}
            </div>

        </div>
    );
}