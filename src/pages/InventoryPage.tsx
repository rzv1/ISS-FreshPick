import { Users, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useServices } from "../context/ServiceContext.tsx";
import {StatCard} from "./StatCard.tsx";
import {InventoryItem} from "./InventoryItem.tsx";
import type {InventoryDTO} from "../models/InventoryDTO.ts";
import {Header} from "./Header.tsx";

export const InventoryPage = () => {
    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await inventoryService.deleteBatch(id);
            setTimeout(() => {
                inventoryService.getAllInventory()
                    .then((res) => setData(res))
                    .catch((err) => console.log(err))
                    .finally(() => setLoading(false));
            }, 100)
        } catch(err){
            console.error("Failed with error: " + err)
        } finally{
            setLoading(false)
        }
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

    if (loading) return (
        <div>
            <Header title={"Inventory Management"}/>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching inventory items...</p>
            </div>
        </div>
    )

    return (
        <div className="pb-20">
            <Header title={"Inventory Management"}/>

            <div className="flex justify-between mt-4 gap-4">
                <StatCard label="Total Items" value={data.totalItems} Icon={Users} />
                <StatCard label="Expiring Soon" value={data.expiringSoon} Icon={Clock} variant="warning"/>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                {data.items.map((item) => {return (
                    <InventoryItem key={item.id} name={item.name} units={item.units} imageSrc={item.imageSrc} status={item.status} onDelete={() => handleDelete(item.id)} />
                )})}
            </div>
        </div>
    )
}