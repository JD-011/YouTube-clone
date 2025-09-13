import { React, useState } from "react";
import Logo from "./Logo";
import { userServices } from "../services";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "./"

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async (data) => {
        setError("");
        setLoading(true);
        console.log(data);
        try {
            const res = await userServices.register(data);

            if (res) {
                const response = await userServices.login({
                    username: data.get('username'),
                    password: data.get('password')
                });
                if (response.data?.user) {
                    dispatch(authLogin(response.data?.user));
                    navigate("/");
                }
            }
        } catch (e) {
            if (e.response.status == 409)
                setError("User with email or username already exists");
            else setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fullName?.trim()) {
            setError("FullName can't be empty");
            return;
        }
        if (!username?.trim()) {
            setError("Username can't be empty");
            return;
        }
        if (!email?.trim()) {
            setError("Enter correct Email");
            return;
        }
        if (!password?.trim()) {
            setError("Password can't be empty");
            return;
        }
        if (!avatar) {
            setError("Avatar is required");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        if (coverImage) formData.append("coverImage", coverImage);

        register(formData);
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
                        htmlFor="fullname"
                        className="mb-1 inline-block text-gray-300"
                    >
                        FullName :
                    </label>
                    <input
                        id="fullname"
                        type="text"
                        placeholder="Enter your FullName"
                        className="mb-4 rounded-lg border bg-transparent px-3 py-2 w-full"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="username"
                        className="mb-1 inline-block text-gray-300"
                    >
                        Username :
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your Username"
                        className="mb-4 rounded-lg border bg-transparent px-3 py-2 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="email"
                        className="mb-1 inline-block text-gray-300"
                    >
                        Email :
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        className="mb-4 rounded-lg border bg-transparent px-3 py-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div className="mb-6 flex gap-4">
                        <div className="flex-1">
                            <label
                                htmlFor="avatar"
                                className="mb-1 inline-block text-gray-300"
                            >
                                Avatar :
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="avatar"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                        setAvatar(e.target.files[0])
                                    }
                                    accept="image/*"
                                    required
                                />
                                <div className="rounded-lg border bg-transparent px-3 py-2 w-full text-center hover:bg-gray-800 transition-colors">
                                    {avatar
                                        ? avatar.name.substring(0, 15) + "..."
                                        : "Select Avatar"}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor="coverImage"
                                className="mb-1 inline-block text-gray-300"
                            >
                                Cover :
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="coverImage"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                        setCoverImage(e.target.files[0])
                                    }
                                    accept="image/*"
                                />
                                <div className="rounded-lg border bg-transparent px-3 py-2 w-full text-center hover:bg-gray-800 transition-colors">
                                    {coverImage
                                        ? coverImage.name.substring(0, 15) +
                                          "..."
                                        : "Select Cover"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 text-center text-base text-gray-300">
                        Allready have any account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-blue-400 transition-all duration-200 no-underline hover:text-blue-300 hover:underline"
                        >
                            Sign in
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
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
