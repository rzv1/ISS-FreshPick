interface CartProductProps{
    id: number;
    productName: string;
    imageURL: string;
    appliedPrice: number;
    selectedQuantity: number;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
}

export const CartProduct = ({id, productName, imageURL, appliedPrice, selectedQuantity, onIncrement, onDecrement}:CartProductProps) => {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-200/60 last:border-0">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2 shrink-0">
                <img
                    src={imageURL}
                    alt={productName}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-base font-bold text-gray-800 leading-tight">
                    {productName}
                </h3>
                <span className="text-sm text-gray-500 mb-2">
                Reg. ${appliedPrice.toFixed(2)}
            </span>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onDecrement(id)}
                        className="w-8 h-8 flex items-center justify-center bg-[#96a188] active:bg-[#838e76] text-white rounded-lg transition-colors"
                    >
                        <span className="text-xl leading-none font-medium mb-[2px]">-</span>
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">
                    {selectedQuantity}
                </span>
                    <button
                        onClick={() => onIncrement(id)}
                        className="w-8 h-8 flex items-center justify-center bg-[#96a188] active:bg-[#838e76] text-white rounded-lg transition-colors"
                    >
                        <span className="text-xl leading-none font-medium mb-[2px]">+</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center pl-3 shrink-0 text-gray-400 opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <span className="text-[10px] text-center leading-tight">Swipe to<br/>delete</span>
            </div>
        </div>
    );
}