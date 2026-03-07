import { Link } from 'react-router-dom'
import { CirclePlus, BaggageClaimIcon, NetworkIcon } from 'lucide-react'

export const ManagerNavbar = () => {
    return (
        <nav className="fixed bottom-0 w-full bg-white border-t border-harvest flex justify-around p-5">
            <Link to="/admin/add" className="flex flex-col items-center">
                <CirclePlus size={24} color="#7b8964"></CirclePlus>
            </Link>

            <Link to="/admin" className="flex flex-col items-center">
                <NetworkIcon size={24} color="#7b8964"></NetworkIcon>
            </Link>

            <Link to="/admin/stock" className="flex flex-col items-center">
                <BaggageClaimIcon size={24} color="#7b8964"></BaggageClaimIcon>
            </Link>
        </nav>
    );
};