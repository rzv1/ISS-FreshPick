import {BrowserRouter as Router} from "react-router";
import {Route, Routes} from "react-router-dom";
import {CustomerNavbar} from "./CustomerNavbar.tsx";

export const CustomerLayout = () => {
    return (
        <Router>
            <div className="min-h-screen pb-16">
                <Routes>
                    <Route path="/" element={<CatalogPage />} />
                    <Route path="/deals" element={<DealsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
                <CustomerNavbar />
            </div>
        </Router>
    )
}