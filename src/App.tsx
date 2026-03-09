import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from "react";
import { LoginPage } from "./pages/LoginPage.tsx";
import {CustomerLayout} from "./pages/CustomerLayout.tsx";
import {ManagerLayout} from "./pages/ManagerLayout.tsx";
import {CatalogPage} from "./pages/CatalogPage.tsx";
import {DealsPage} from "./pages/DealsPage.tsx";
import {CartPage} from "./pages/CartPage.tsx";
import {AccountPage} from "./pages/AccountPage.tsx";
import {InventoryPage} from "./pages/InventoryPage.tsx";
import {AddProductPage} from "./pages/AddProductPage.tsx";
import {StockPage} from "./pages/StockPage.tsx";

function App() {
  const [user, setUser] = useState({ loggedIn: false, role: '' });

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage onLoginSuccess={setUser}/>} />
            {user.loggedIn && user.role === 'CUSTOMER' && (
                <Route path="/*" element={<CustomerLayout />}>
                    <Route index element={<CatalogPage />}/>
                    <Route path="deals" element={<DealsPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="account" element={<AccountPage />} />
                </Route>
            )}
            {user.loggedIn && user.role === 'MANAGER' && (
                <Route path="/admin/*" element={<ManagerLayout />}>
                    <Route index element={<InventoryPage />}/>
                    <Route path="add" element={<AddProductPage />}/>
                    <Route path="stock" element={<StockPage />}/>
                </Route>
            )}
            {!user.loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
    </Router>
  )
}

export default App