import {BrowserRouter as Router} from "react-router";
import {Route, Routes} from "react-router-dom";
import {ManagerNavbar} from "./ManagerNavbar.tsx";

export const ManagerLayout = () => {
    return (
        <Router>
            <div className="min-h-screen pb-16">
                <Routes>
                    <Route path="/add" element={<AddProductPage />} />
                    <Route path="/" element={<InventoryPage />} />
                    <Route path="/stock" element={<StockPage />} />
                </Routes>
                <ManagerNavbar />
            </div>
        </Router>
    )
}