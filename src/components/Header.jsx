import React, { use } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo.jsx";
import { icons } from "./Icons.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import userServices from "../services/user.js";

const navItems = [
    {
        name: "Home",
        slug: "/",
        mobileView: true,
        icon: icons.home,
    },
    {
        name: "Your videos",
        slug: "/",
        mobileView: false,
        icon: icons.myContent,
    },
    {
        name: "subscrisptions",
        slug: "/",
        mobileView: true,
        icon: icons.subscribers,
    },
    {
        name: "playlists",
        slug: "/",
        mobileView: true,
        icon: icons.collections,
    },
    {
        name: "Liked Videos",
        slug: "/liked-videos",
        mobileView: false,
        icon: icons.like,
    },
    {
        name: "History",
        slug: "/",
        mobileView: true,
        icon: icons.history,
    },
    {
        name: "Support",
        slug: "/",
        mobileView: false,
        icon: icons.support,
    },
    {
        name: "Settings",
        slug: "/",
        mobileView: false,
        icon: icons.settings,
    },
];

const Header = ({ children }) => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();

    return (
        <>
            <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
                <nav className="mx-auto flex max-w-8xl items-center py-2">
                    <div className="mr-4 w-12 shrink-0 sm:w-16">
                        <Logo />
                    </div>
                    <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
                        <input
                            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                            placeholder="Search"
                        />
                        <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                            <MagnifyingGlassIcon className=" h-4 w-4" />
                        </span>
                    </div>
                    <button className="ml-auto sm:hidden">
                        <MagnifyingGlassIcon className=" h-6 w-6" />
                    </button>
                    <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
                        <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                        <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
                        <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                    </button>
                    <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
                        <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
                            <span className="inline-block w-12">
                                <Logo />
                            </span>
                            <button className="inline-block w-8">
                                <XCircleIcon />
                            </button>
                        </div>
                        <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
                            {navItems
                                .filter((item) => !item.mobileView)
                                .map((item) => (
                                    <li key={item.name} className="w-full">
                                        <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black">
                                            <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                        </ul>
                        <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                            {!authStatus ? (
                                <>
                                    <button
                                        className="w-full px-4 py-2 font-medium text-[#ae7aff] border border-gray-600 rounded-lg 
                                                   bg-transparent transition-all duration-200 ease-in-out
                                                   hover:bg-gray-800 hover:border-gray-500 hover:scale-105
                                                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900
                                                   sm:w-auto"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                        onClick={() => navigate("/register")}
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() =>
                                        userServices
                                            .logout()
                                            .then(() => dispatch(logout()))
                                    }
                                    className="px-5 py-2.5 font-semibold text-gray-100
                                                bg-red-600 rounded-lg shadow-sm
                                                transition-all duration-200 ease-in-out
                                                hover:bg-red-700 hover:shadow-md hover:scale-[1.02]
                                                active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800
                                                cursor-pointer"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            { children }
        </>
    );
};

export default Header;
