import {Outlet} from "react-router-dom";
import {ManagerNavbar} from "./ManagerNavbar.tsx";

export const ManagerLayout = () => {
    return (
        <div className="min-h-screen pb-16">
            <Outlet/>
            <ManagerNavbar />
        </div>
    )
}