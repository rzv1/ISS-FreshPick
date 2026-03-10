interface DealProductProps{
    id: number;
    imageURL: string;
    name: string;
    price: number;
    discountedPrice: number;
    closestExpiry: Date;
    onAddClick: (batchId: number, name:string, imageURL: string, discountedPrice: number, price: number) => void;
}

export const DealProduct = ({id, imageURL, name, price, discountedPrice, closestExpiry, onAddClick}: DealProductProps) => {
    return (
        <div className="bg-white rounded-2xl p-3 flex flex-col shadow-sm border border-gray-100">
            <div className="w-full h-28 mb-2 flex items-center justify-center">
                <img
                    src={imageURL}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="bg-[#faecd9] text-[#866343] rounded-xl py-1.5 px-2 mb-2 text-center flex flex-col items-center justify-center">
                <span className="text-[11px] font-medium leading-tight">Time Left</span>
                <span className="text-xs font-bold leading-tight">
                Ends in: {new Date(new Date(closestExpiry).getTime() - new Date().getTime()).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false})}
            </span>
            </div>

            <h3 className="text-[18px] font-bold text-gray-800 leading-tight mb-2">
                {name}
            </h3>

            <div className="flex justify-between items-end mb-3">
                <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">
                    Reg. ${price.toFixed(2)}
                </span>
                    <span className="text-lg font-bold text-[#a67b4b]">
                    ${(price*discountedPrice).toFixed(2)}
                </span>
                </div>

                <div className="bg-[#b57a41] text-white text-sm font-bold px-2 py-1 rounded-full">
                    -{Math.round(discountedPrice*100)}%
                </div>
            </div>

            <button
                style={{backgroundColor: '#7b8964'}}
                onClick={() => onAddClick(id, name, imageURL, discountedPrice, price*discountedPrice)}
                className="w-full bg-[#879973] active:bg-[#768664] text-white font-semibold py-2 rounded-full transition-colors mt-auto">
                Reserve Now
            </button>
        </div>
    );
}