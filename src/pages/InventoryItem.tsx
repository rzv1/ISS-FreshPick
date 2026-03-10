import { Trash2 } from "lucide-react";

interface InventoryItemProps {
    name: string;
    units: number;
    status: 'Fresh' | 'Expired';
    imageSrc: string;
    onDelete: () => void;
}

export const InventoryItem = ({ name, units, status, imageSrc, onDelete }: InventoryItemProps) => {
    return (
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-18 h-18 bg-gray-100 rounded-xl overflow-hidden">
                    <img src={imageSrc} alt={name} className="object-cover w-full h-full" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
                    <p className="text-xs text-gray-500">{units} units</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                    status === 'Fresh' ? 'bg-[#e7f3e5] text-[#5e9e54]' : 'bg-[#fde7e7] text-[#d65b5b]'
                }`}>{status === 'Fresh' ? "Fresh" : "Expired"}</span>
            </div>
            <button onClick={onDelete} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
            </button>
        </div>
    )
}