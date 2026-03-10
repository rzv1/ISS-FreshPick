import {NavLink} from 'react-router-dom'
import { CirclePlus, BaggageClaimIcon, NetworkIcon } from 'lucide-react'

export const ManagerNavbar = () => {
    const activeColor = "#505f33";
    const inactiveColor = "#9ca3af";
    return (
        <nav className="fixed left-0 min-w-screen bottom-0 bg-white border-t border-harvest flex justify-around p-5">
            <NavLink to="/admin/add" className="flex flex-col items-center">
                {({ isActive }) => (
                    <>
                    <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    <CirclePlus size={24} color={isActive ? activeColor : inactiveColor}></CirclePlus>
                    </>
                )}
            </NavLink>

            <NavLink to="/admin" end className="flex flex-col items-center">
                {({ isActive }) => (
                    <>
                    <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    <NetworkIcon size={24} color={isActive ? activeColor : inactiveColor}></NetworkIcon>
                    </>
                )}
            </NavLink>

            <NavLink to="/admin/stock" className="flex flex-col items-center">
                {({ isActive }) => (
                    <>
                    <div className={`absolute top-0 w-12 h-1 bg-[#7b8964] rounded-b-md transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    <BaggageClaimIcon size={24} color={isActive ? activeColor : inactiveColor}></BaggageClaimIcon>
                    </>
                )}
            </NavLink>
        </nav>
    );
};