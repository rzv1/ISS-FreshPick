import {NavLink} from 'react-router-dom'
import { Home, Tag, ShoppingCart, User } from 'lucide-react'

export const CustomerNavbar = () => {
    const activeColor = "#505f33";
    const inactiveColor = "#9ca3af";
    return(
    <nav className="fixed left-0 bottom-0 w-full bg-white border-t flex justify-around p-5">
        <NavLink to="/" end className="flex flex-col items-center text-gray-500">
            {({ isActive }) => (
                <>
                <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <Home size={26} color={isActive ? activeColor : inactiveColor}/>
                <span className={`text-xs ${isActive ? "text-harvest-dark" : "text-gray-500"} `}>Home</span>
                </>
            )}
        </NavLink>

        <NavLink to="/deals" className="flex flex-col items-center text-gray-500">
            {({ isActive }) => (
                <>
                <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <Tag size={26} color={isActive ? activeColor : inactiveColor}/>
                <span className={`text-xs ${isActive ? "text-harvest-dark" : "text-gray-500"} `}>Deals</span>
                </>
            )}
        </NavLink>

        <NavLink to="/cart" className="flex flex-col items-center text-gray-500">
            {({ isActive }) => (
                <>
                <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <ShoppingCart size={26} color={isActive ? activeColor : inactiveColor}/>
                <span className={`text-xs ${isActive ? "text-harvest-dark" : "text-gray-500"} `}>Cart</span>
                </>
            )}
        </NavLink>

        <NavLink to="/account" className="flex flex-col items-center text-gray-500">
            {({ isActive }) => (
                <>
                <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <User size={26} color={isActive ? activeColor : inactiveColor}/>
                <span className={`text-xs ${isActive ? "text-harvest-dark" : "text-gray-500"} `}>Account</span>
                </>
            )}
        </NavLink>
    </nav>
    );
};