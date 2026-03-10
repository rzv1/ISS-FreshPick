import type {LucideIcon} from "lucide-react";

interface AccountCardProps{
    headline: string;
    content: string;
    Icon: LucideIcon
    buttonContent: string;
}

export const AccountCard = ({headline, content, Icon, buttonContent}:AccountCardProps) => {
    return (
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100/80 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
            <span className="text-[15px] font-medium text-gray-800">
                {headline}
            </span>
                <div className="bg-[#7b8964] text-white p-1 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={14} strokeWidth={2.5} />
                </div>
            </div>

            <div className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">
                {content}
            </div>

            <button style={{backgroundColor: '#7b8964'}} className="w-full bg-[#7b8964] active:bg-[#6a7755] text-white text-sm font-medium py-1.5 rounded-xl transition-colors">
                {buttonContent}
            </button>
        </div>
    );
}