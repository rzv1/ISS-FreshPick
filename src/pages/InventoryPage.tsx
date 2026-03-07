import { Users, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useServices } from "../context/ServiceContext.tsx";
import {StatCard} from "./StatCard.tsx";
import {InventoryItem} from "./InventoryItem.tsx";
import type {InventoryDTO} from "../models/InventoryDTO.ts";

export const InventoryPage = () => {
    const handleDelete = (id: number) => {
        inventoryService.deleteBatch(id);
        setLoading(true);
        inventoryService.getAllInventory()
            .then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const container = useServices();
    const inventoryService = container.inventoryService;
    const [data, setData] = useState<InventoryDTO>({
        totalItems: 0,
        expiringSoon: 0,
        items: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        inventoryService.getAllInventory()
            .then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [inventoryService]);

    if (loading) return <div className="p-6 text-center">Loading data...</div>;

    return (
        <div className="p-6 bg-[#f9f9f7] min-h-screen pb-28">
            <div className="flex items-center gap-2 mb-8">
                <img src="/../../public/logo-harvest.png" alt="Harvest" className="w-8 h-8 object-contain"/>
                <div className="h-8 w-[1px] bg-gray-300 mx-1"></div>
                <h1>Inventory <br/> Management</h1>
            </div>

            <div>
                <StatCard label="Total Items" value={data.totalItems} Icon={Users} />
                <StatCard label="Expiring Soon" value={data.expiringSoon} Icon={Clock} variant="warning"/>
            </div>

            <div>
                <span>Product</span>
                <span>Status</span>
            </div>

            <div>
                {data.items.map((item) => {return (
                    <InventoryItem key={item.id} {...item} onDelete={() => handleDelete(item.id)} />
                )})}
            </div>
        </div>
    )
}