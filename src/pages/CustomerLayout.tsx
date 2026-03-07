import {Outlet} from "react-router-dom";
import {CustomerNavbar} from "./CustomerNavbar.tsx";


export const CustomerLayout = () => {
    return (
        <div className="min-h-screen pb-16">
            <Outlet/>
            <CustomerNavbar />
        </div>
    )
}