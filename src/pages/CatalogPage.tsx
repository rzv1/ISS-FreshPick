import {useServices} from "../context/ServiceContext.tsx";
import {Product} from "../models/Product.ts";
import {useEffect, useState} from "react";
import {CatalogProduct} from "./CatalogProduct.tsx";
import {Header} from "./Header.tsx";

export const CatalogPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const cartService = container.cartService;
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const onAddClick = (id: number)=> {
        cartService.addProductToCart(id).then()
    }

    useEffect(() => {
        service.getAllProducts().then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [service]);

    if(loading)
        return <div>Loading items...</div>

    return (
        <div className="px-4 py-6 min-h-screen bg-[#f8f9f5]">
            <Header title="Welcome Alex" />
            
            <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-lg font-bold text-gray-800">Featured Fresh Items</h2>
                <button className="text-sm text-gray-400 font-medium hover:text-gray-600">
                    View all
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {data.map(it => (
                    <CatalogProduct
                        key={it.id}
                        id={it.id}
                        name={it.name}
                        TTL={it.TTL}
                        basePrice={it.basePrice}
                        imageURL={it.imageURL}
                        onAddClick={onAddClick}
                    />
                ))}
            </div>
        </div>
    );
}