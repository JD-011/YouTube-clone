import React from "react";
import { icons } from "./Icons.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ children, variant = "hover" }, bottomTotalItems = 2) => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);
    const location = useLocation();
    const currentPath = location.pathname;
    const isSticky = variant === "sticky";

    const navItems = [
        {
            name: "Home",
            path: "/",
            mobileView: true,
            icon: icons.home,
        },
        {
            name: "Subscrisptions",
            path: "/subscriptions",
            mobileView: true,
            icon: icons.subscribers,
        },
        {
            name: "My Channel",
            path: userData?.username ? `/channel/@${userData.username}` : "/login",
            mobileView: false,
            icon: icons.myContent,
        },
        {
            name: "Liked Videos",
            path: "/liked-videos",
            mobileView: false,
            icon: icons.like,
        },
        {
            name: "History",
            path: "/history",
            mobileView: true,
            icon: icons.history,
        },
        {
            name: "Admin Panel",
            path: userData?.username ? `/@${userData.username}/dashboard` : "/login",
            mobileView: false,
            icon: icons.admin,
        },
        {
            name: "Support",
            path: "/support",
            mobileView: false,
            icon: icons.support,
        },
        {
            name: "Settings",
            path: "/settings",
            mobileView: false,
            icon: icons.settings,
        },
    ];

    const sidebarClasses = `
        group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 
        border-t border-white bg-[#121212] px-2 py-2 
        sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r 
        sm:border-t-0 sm:py-6 sm:hover:max-w-[250px]
        ${isSticky ? "lg:sticky lg:max-w-[250px]" : ""}
  `;

    const textClasses = isSticky
        ? "block sm:hidden sm:group-hover:inline lg:inline"
        : "block sm:hidden sm:group-hover:inline";

    return (
        <>
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <aside className={sidebarClasses}>
                    <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                        {navItems.map((item, i, arr) => {
                            const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
                            return (
                                <li
                                    key={item.name}
                                    className={`
                                    ${item.mobileView ? "" : "hidden sm:block"}
                                    ${
                                        arr.length - i === bottomTotalItems
                                            ? "mt-auto"
                                            : ""
                                    }
                                `}
                                >
                                    <button
                                        className={`flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4 ${
                                            isActive
                                                ? "text-[#ae7aff] sm:border-[#ae7aff] sm:bg-[#ae7aff] sm:text-black"
                                                : ""
                                        }`}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                                            {item.icon}
                                        </span>
                                        <span className={textClasses}>
                                            {item.name}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
