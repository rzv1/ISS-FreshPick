import { useServices } from "../context/ServiceContext.tsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

interface LoginState{
    loggedIn: boolean;
    role: string;
}
interface LoginPageProps{
    onLoginSuccess: (user: LoginState) => void;
}

export const LoginPage = ( {onLoginSuccess}: LoginPageProps) => {
    const container  = useServices();
    const authService = container.authService;
    const {setId} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await authService.login(username, password);
        if(user){
            onLoginSuccess({ loggedIn: true, role: user.role});
            setId(user.id);
            if(user.role === "MANAGER")
                navigate("/admin");
            else
                navigate("/");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gray-50">
            <img src="../../public/logo-harvest.png" alt="Logo" className="w-24 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mb-8">Sign in to your Harvest account</p>

            <div className="w-full space-y-4">
                <input id="username" type="email" placeholder="Email" value={username}
                       onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input id="passowrd" type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="w-full bg-[#8fb07d] text-white p-4 rounded-3xl font-semibold text-lg flex justify-between items-center px-8"
                onClick={handleLogin}>
                    Sign In <span>→</span>
                </button>
            </div>

            <p className="mt-6 text-gray-600">
                New to Harvest? <span className="font-bold text-black cursor-pointer">Sign Up</span>
            </p>

            <button className="mt-12 text-green-700 font-medium">
                Are you a Store Manager? Login here
            </button>
        </div>
    );
};