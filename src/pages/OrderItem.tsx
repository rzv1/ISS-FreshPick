interface OrderItemProps{
    number: number;
    date: Date;
    total: number;
    imageURLs: string[];
}

export const OrderItem = ({number, date, total, imageURLs}: OrderItemProps) => {
    return (
        <div className="bg-white rounded-2xl p-3 mb-2 shadow-sm border border-gray-100/80 flex justify-between items-center">

            <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">
                Order #{number}
            </span>
                <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[15px] font-bold text-gray-900">
                    ${total.toFixed(2)}
                </span>
                    <div className="flex gap-1 items-center">
                        {imageURLs.slice(0, 3).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Item ${idx}`}
                                className="w-5 h-5 object-contain"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
            <span className="text-[14px] font-medium text-gray-800">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
                <button className="bg-[#7b8964] active:bg-[#6a7755] text-white text-[13px] font-medium px-3 py-1 rounded-xl transition-colors">
                    View Order
                </button>
            </div>

        </div>
    );
}