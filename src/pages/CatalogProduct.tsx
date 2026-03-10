interface CatalogProductProps{
    id: number
    name: string;
    imageURL: string;
    basePrice: number;
    onAddClick: (id: number, name: string) => void;
}

export const CatalogProduct = ({id, name, imageURL, basePrice, onAddClick}: CatalogProductProps) => {
    return (
        <div className="bg-white rounded-2xl p-3 flex flex-col shadow-sm border border-gray-100/50">
            <div className="w-full h-28 mb-3 flex items-center justify-center">
                <img
                    src={imageURL}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-[15px] font-semibold text-gray-800 leading-tight">
                    {name}
                </h3>
                <p className="text-[13px] text-gray-400 mt-0.5 mb-2">
                    1 Kg
                </p>

                <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-gray-900 text-base tracking-tight">
                    {Number(basePrice).toFixed(2)} Lei
                </span>
                    <button
                        style={{backgroundColor: '#7b8964'}}
                        onClick={() => onAddClick(id, name)}
                        className="w-7 h-7 bg-harvest active:bg-[#838e76] text-white flex items-center justify-center rounded-lg transition-colors">
                        <span className="text-xl leading-none font-light mb-[2px]">+</span>
                    </button>
                </div>
            </div>
        </div>
    );
}