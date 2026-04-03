import {useState} from "react";
import {useServices} from "../context/ServiceContext.tsx";

interface Product{
    id: number;
    name: string;
    image: string;
    units: number;
}

export const StockCard = ({id, name, image, units}: Product) => {
    const [showAdded, setShowAdded] = useState(false);
    const container = useServices();
    const inventoryService = container.inventoryService;
    const increments = [5, 10, 15, 25];

    const handleClick = (amount: number)=> {
        inventoryService.saveBatchItem(id, amount).then(() => {
            setShowAdded(true);
            setTimeout(() => setShowAdded(false), 500);
        });
    }

    return (
        <div className="relative flex flex-col p-4 m-2 bg-white border border-gray-300 rounded-2xl shadow-sm">
            {showAdded && (<div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full animate-fade-in">
                    Added!
                </div>
            )}

            <div className="flex items-center gap-4 mb-4">
                <img src={image} alt={name}
                    className="w-20 h-20 object-contain rounded-lg"
                />
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {name} - 1Kg
                    </h3>
                    <p className="text-gray-600">
                        Current Stock: <span className="font-semibold">{units} units</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-between gap-2">
                {increments.map((val) => (
                    <button key={val} onClick={() => handleClick(val)}
                            style={{backgroundColor: 'rgba(123, 137, 100, 0.3)'}}
                        className="flex-1 py-3 bg-[#c2ccb8] hover:bg-[#b2bc9d] text-gray-800 font-bold rounded-lg transition-colors text-lg">
                        +{val}
                    </button>
                ))}
            </div>
        </div>
    )
}