import {useServices} from "../context/ServiceContext.tsx";
import {useEffect, useState} from "react";
import {DealProduct} from "./DealProduct.tsx";
import type {DealDTO} from "../models/DealDTO.ts";
import {Header} from "./Header.tsx";

export const DealsPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const cartService = container.cartService;
    const [data, setData] = useState<DealDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getAllDeals().then((res) => setData(res))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [service]);

    const handleReserveItem = (id: number)=> {
        cartService.addCartItem(id).then()
    }
    const handleSortByExpiryAsc = () => {

    }
    const handleSortByDiscountDesc = () => {

    }
    const handleSortByPriceAsc = () => {

    }

    if(loading)
        return <div>Loading items...</div>

    return (
        <div className="min-h-screen bg-[#f8f9f5] px-4 pt-4 pb-24">
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
                {data.map(deal => (
                    <DealProduct
                        key={deal.id}
                        id={deal.id}
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