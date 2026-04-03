import {Header} from "./Header.tsx";
import {useEffect, useState} from "react";
import {useServices} from "../context/ServiceContext.tsx";
import {StockCard} from "./StockCard.tsx";
import type {Product} from "../models/Product.ts";

interface ProductWithStock{
    product: Product,
    stock: number
}

export const StockPage = () => {
    const container = useServices();
    const inventoryService = container.inventoryService;
    const [items, setItems] = useState<ProductWithStock[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        inventoryService.getAllProducts()
            .then(async (data) => {
                const dataWithStock = await Promise.all(data.map(async (p) => ({
                    product: p, stock: await inventoryService.getStockForProduct(p.id)
                })));
                setItems(dataWithStock)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [inventoryService]);

    if (loading) return (
        <div >
            <Header title={"Stock Replenishment"}/>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching stock details...</p>
            </div>
        </div>
    )

    return (
        <div >
            <Header title={"Stock Replenishment"}/>
            <div className="flex flex-col mt-4 ">
            {items.map(it => {return (
                <StockCard key={it.product.id} id={it.product.id} name={it.product.name} image={it.product.imageURL} units={it.stock} />
        )})}
            </div>
        </div>
    )
}