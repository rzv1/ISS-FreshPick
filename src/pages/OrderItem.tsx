interface OrderItemProps{
    number: number;
    date: Date;
    total: number;
}

export const OrderItem = ({number, date, total}: OrderItemProps) => {
    return (
        <div className="bg-white rounded-2xl p-3 mb-2 shadow-sm border border-gray-100/80 flex justify-between items-center">

            <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900">
                Order #{number}
            </span>
                <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[15px] font-bold text-gray-900">
                    ${Number(total).toFixed(2)}
                </span>

                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
            <span className="text-[14px] font-medium text-gray-800">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
                <button style={{backgroundColor: '#7b8964'}} className="bg-[#7b8964] active:bg-[#6a7755] text-white text-[13px] font-medium px-3 py-1 rounded-xl transition-colors">
                    View Order
                </button>
            </div>

        </div>
    );
}