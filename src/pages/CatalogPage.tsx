import {useServices} from "../context/ServiceContext.tsx";
import {Product} from "../models/Product.ts";
import {useEffect, useState} from "react";
import {CatalogProduct} from "./CatalogProduct.tsx";
import {Header} from "./Header.tsx";
import {useAuth} from "../context/AuthContext.tsx";

export const CatalogPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const cartService = container.cartService;
    const {id} = useAuth();
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const onAddClick = (productId: number)=> {
        if(id)
        cartService.addProductToCart(productId, id).then()
    }

    useEffect(() => {
        service.getAllProducts().then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [service]);

    if (loading) return (
        <div>
            <Header title={"Catalog View"}/>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching products...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen">
            <Header title="Catalog View" />
            
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