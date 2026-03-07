import {Header} from "./Header.tsx";
import {useEffect, useState} from "react";
import {useServices} from "../context/ServiceContext.tsx";
import {StockCard} from "./StockCard.tsx";
import type {Product} from "../models/Product.ts";

export const StockPage = () => {
    const container = useServices();
    const inventoryService = container.inventoryService;
    const [items, setItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        inventoryService.getAllProducts()
            .then(data =>setItems(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [inventoryService]);

    if (loading)
        return <div>Loading products...</div>;

    return (
        <div className="min-h-screen bg-[#f8f9f5] px-4 pb-20 pt-4">
            <Header title={"Stock Replenishment"}/>
            <div className="flex flex-col mt-4">
            ${items.map(it => {return (
                <StockCard id={it.id} name={it.name} image={it.imageURL} units={it.basePrice} />
        )})}
            </div>
        </div>
    )
}