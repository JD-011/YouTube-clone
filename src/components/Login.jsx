import { React, useState } from "react";
import Logo from "./Logo";
import { userServices } from "../services";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "./";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        if (!data.username?.trim() || !data.email?.trim())
            setError("Enter correct Username / Email");
        else if (!data.password?.trim()) setError("Password can't be empty");
        else {
            try {
                const res = await userServices.login(data);
                
                if (res) {
                    if (res.data?.user) {
                        dispatch(authLogin(res.data?.user));
                        navigate("/");
                    }
                }
            } catch (e) {
                if(e.response.status == 404) setError("User does not exist");
                else if(e.response.status == 401) setError("Invalid password");
                else setError(e.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username: user, email: user, password });
    };

    if (loading)
        return (
            <div className="flex h-full items-center justify-center">
                <Loader size="md" />
            </div>
        );

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
                
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="user"
                        className="mb-1 inline-block text-gray-300"
                    >
                        Username / Email :
                    </label>
                    <input
                        id="user"
                        type="text"
                        placeholder="Enter your Username / email"
                        className="mb-4 rounded-lg border bg-transparent px-3 py-2 w-full"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="password"
                        className="mb-1 inline-block text-gray-300"
                    >
                        Password :
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        className="mb-4 rounded-lg border bg-transparent px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                        type="submit"
                        className="bg-[#ae7aff] mt-4 px-4 py-3 text-black font-semibold rounded-lg w-full
                                   transform transition-all duration-150 ease-in-out
                                   hover:bg-[#9c6aef] hover:scale-105 hover:shadow-lg
                                   active:scale-95 active:bg-[#8b5ae8] active:shadow-sm
                                   focus:outline-none focus:ring-2 focus:ring-[#ae7aff] focus:ring-opacity-50"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;