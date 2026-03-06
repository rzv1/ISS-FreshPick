
export const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gray-50">
            <img src="../assets/logo-harvest.png" alt="Logo" className="w-24 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mb-8">Sign in to your Harvest account</p>

            <div className="w-full space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="w-full bg-[#8fb07d] text-white p-4 rounded-3xl font-semibold text-lg flex justify-between items-center px-8">
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