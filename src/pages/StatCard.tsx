import { type LucideIcon } from 'lucide-react'

interface StatCardProps{
    label: string;
    value: string | number;
    Icon: LucideIcon;
    variant?: 'default' | 'warning';
}

export const StatCard = ({ label, value, Icon, variant = 'default'}: StatCardProps)=> {
    return (
        <div className={`flex-1 p-4 rounded-2xl ${variant === 'default' ? "bg-gray-100/80 text-gray-500" : "bg-[#FDE6C1] text-gray-500"}`}>
            <div className="flex justify-between items-start mb-1">
                <span className="text-[11px] font-medium text-opacity-70 uppercase tracking-tight">{label}</span>
                <Icon size={14} className="opacity-50" />
            </div>
            <span className="text-2xl font-bold tracking-tight">{value}</span>
        </div>
    )
}