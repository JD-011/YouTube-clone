import { React, useState } from "react";
import Logo from "./Logo";
import { userServices } from "../services/index.js";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "./";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async (tokenResponse) => {
        setError("");
        setLoading(true);
        try {
            const res = await userServices.googleLogin(tokenResponse);
            if (res) {
                if (res.data?.user) {
                    dispatch(authLogin(res.data?.user));
                    navigate("/");
                }
            }
        } catch (err) {
            if (err.response.status == 404) setError("User does not exist");
            else setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                if (e.response.status == 404) setError("User does not exist");
                else if (e.response.status == 401) setError("Invalid password");
                else setError(e.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: handleGoogleLogin,
        onError: () => {
            setError("Google login failed. Please try again.");
        },
        use_fedcm_for_prompt: true,
    });

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
                        className="mb-3 rounded-lg border bg-transparent focus:border-blue-500 focus:ring-3 focus:ring-blue-500 px-3 py-2 w-full"
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
                        className="mb-3 rounded-lg border bg-transparent focus:border-blue-500 focus:ring-3 focus:ring-blue-500 px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <p className="mt-2 text-center text-base text-gray-300">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/register"
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

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-600"></div>
                    <span className="px-4 text-gray-400 text-sm font-medium">
                        OR
                    </span>
                    <div className="flex-1 border-t border-gray-600"></div>
                </div>

                <div className="w-full flex justify-center">
                    <button
                        onClick={googleLogin}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-medium 
                                     border border-gray-300 rounded-lg px-4 py-3 
                                     flex items-center justify-center gap-3
                                     transform transition-all duration-200 ease-in-out
                                     hover:shadow-lg hover:scale-105 hover:border-gray-400
                                     active:scale-95 active:shadow-sm
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="text-base">Continue with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
