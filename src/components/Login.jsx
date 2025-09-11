import { React, useState } from "react";
import Logo from "./Logo";
import { userServices } from "../services";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        if (!data.username || !data.email)
            setError("Username / Email is required");
        else if (!data.password) setError("Password is required");
        else {
            try {
                const res = await userServices.login(data);
                console.log(res);
                
                if (res) {
                    if (res.data?.user) dispatch(authLogin(res.data?.user));
                    navigate("/");
                }
            } catch (e) {
                if(e.response.status == 404) setError("User does not exist");
                else if(e.response.status == 401) setError("Invalid user credentials");
                else setError(e.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm flex flex-col">
                <div className="mx-auto inline-block w-16">
                    <Logo />
                </div>
                <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">
                    Play
                </div>
                {error && (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                )}
                <label
                    htmlFor="user"
                    className="mb-1 inline-block text-gray-300"
                >
                    Username / Email
                </label>
                <input
                    id="user"
                    type="text"
                    placeholder="Enter your Username / email"
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <label
                    htmlFor="password"
                    className="mb-1 inline-block text-gray-300"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    className="mb-4 rounded-lg border bg-transparent px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-2 text-center text-base text-gray-300">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-400 transition-all duration-200 no-underline hover:text-blue-300 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <button
                    className="bg-[#ae7aff] mt-4 px-4 py-3 text-black font-semibold rounded-lg 
                               transform transition-all duration-150 ease-in-out
                               hover:bg-[#9c6aef] hover:scale-105 hover:shadow-lg
                               active:scale-95 active:bg-[#8b5ae8] active:shadow-sm
                               focus:outline-none focus:ring-2 focus:ring-[#ae7aff] focus:ring-opacity-50"
                    onClick={() =>
                        login({ username: user, email: user, password })
                    }
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default Login;
