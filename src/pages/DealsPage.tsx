import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {DealProduct} from "./DealProduct.tsx";
import type {DealDTO} from "../models/DealDTO.ts";
import {Header} from "./Header.tsx";
import {useAuth} from "../context/AuthContext.tsx";

export const DealsPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const cartService = container.cartService;
    const [data, setData] = useState<DealDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const {id} = useAuth();

    useEffect(() => {
        service.getAllDeals().then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        console.log("gata")
    }, [service]);

    const handleReserveItem = (batchId: number, name: string, imageURL: string, discoutedPrice: number, price: number)=> {
        if(id)
        cartService.addCartItem(id, batchId, name, imageURL, discoutedPrice, price).then()
    }
    const handleSortByExpiryAsc = () => {
        console.log("gata")
        setData(service.sortByExpiryAsc(data));
    }
    const handleSortByDiscountDesc = () => {
        setData(service.sortByDiscountDesc(data));
    }
    const handleSortByPriceAsc = () => {
        setData(service.sortByPriceAsc(data));
    }

    if (loading) return (
        <div>
            <Header title={"Freshness Deals"}/>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-[#8fb07d]/20 border-t-[#8fb07d] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#8fb07d] font-medium animate-pulse">Fetching fresh deals...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen pb-24">
            <Header title="Freshness Deals"/>
            <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar">
                <button
                    onClick={handleSortByPriceAsc}
                    className="whitespace-nowrap bg-[#faecd9] active:bg-[#e8dac7] text-[#866343] px-4 py-1.5 rounded-full font-medium text-sm transition-colors"
                >
                    Sort By Price
                </button>
                <button
                    onClick={handleSortByDiscountDesc}
                    className="whitespace-nowrap bg-[#faecd9] active:bg-[#e8dac7] text-[#866343] px-4 py-1.5 rounded-full font-medium text-sm transition-colors"
                >
                    Sort By Discount
                </button>
                <button
                    onClick={handleSortByExpiryAsc}
                    className="whitespace-nowrap bg-[#faecd9] active:bg-[#e8dac7] text-[#866343] px-4 py-1.5 rounded-full font-medium text-sm transition-colors"
                >
                    Sort By Time Left
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
                {data.map(deal => deal.quantityAvailable > 0 && (
                    <DealProduct
                        key={deal.batchId}
                        id={deal.batchId}
                        imageURL={deal.imageURL}
                        name={deal.productName}
                        price={deal.originalPrice}
                        discountedPrice={deal.discountedPrice}
                        closestExpiry={deal.closestExpiry}
                        onAddClick={handleReserveItem}
                    />
                ))}
            </div>
        </div>
    );
}