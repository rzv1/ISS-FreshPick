import { Link } from 'react-router-dom'
import { Home, Tag, ShoppingCart, User } from 'lucide-react'

export const CustomerNavbar = () => {
    return(
    <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-2">
        <Link to="/" className="flex flex-col items-center text-gray-500">
            <Home size={24} />
            <span className="text-xs">Home</span>
        </Link>

        <Link to="/deals" className="flex flex-col items-center text-gray-500">
            <Tag size={24} />
            <span className="text-xs">Deals</span>
        </Link>

        <Link to="/cart" className="flex flex-col items-center text-gray-500">
            <ShoppingCart size={24} />
            <span className="text-xs">Cart</span>
        </Link>

        <Link to="/account" className="flex flex-col items-center text-gray-500">
            <User size={24} />
            <span className="text-xs">Account</span>
        </Link>
    </nav>
    );
};