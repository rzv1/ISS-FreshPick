import { Link } from 'react-router-dom'
import { CirclePlus, BaggageClaimIcon, NetworkIcon } from 'lucide-react'

export const ManagerNavbar = () => {
    return (
        <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-2">
            <Link to="/plus" className="flex flex-col items-center">
                <CirclePlus size={24}></CirclePlus>
            </Link>

            <Link to="/" className="flex flex-col items-center">
                <NetworkIcon size={24}></NetworkIcon>
            </Link>

            <Link to="/stock" className="flex flex-col items-center">
                <BaggageClaimIcon size={24}></BaggageClaimIcon>
            </Link>
        </nav>
    );
};