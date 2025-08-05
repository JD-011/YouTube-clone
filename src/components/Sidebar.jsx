import React from "react";
import { icons } from "./Icons.jsx";

const navItems = [
    {
        name: "Home",
        mobileView: true,
        icon: icons.home,
    },
    {
        name: "Your videos",
        mobileView: false,
        icon: icons.myContent,
    },
    {
        name: "subscrisptions",
        mobileView: true,
        icon: icons.subscribers,
    },
    {
        name: "playlists",
        mobileView: true,
        icon: icons.collections,
    },
    {
        name: "Liked Videos",
        mobileView: false,
        icon: icons.like,
    },
    {
        name: "History",
        mobileView: true,
        icon: icons.history,
    },
    {
        name: "Support",
        mobileView: false,
        icon: icons.support,
    },
    {
        name: "Settings",
        mobileView: false,
        icon: icons.settings,
    },
];

const Sidebar = ({ variant } = "hover", bottomTotalItems = 2) => {
    console.log("Sidebar rendered with variant:", variant);
    const isSticky = variant === "sticky";

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
        <aside className={sidebarClasses}>
            <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                {navItems.map((item, i, arr) => (
                    <li
                        key={item.name}
                        className={`
                ${item.mobileView ? "" : "hidden sm:block"}
                ${arr.length - i === bottomTotalItems ? "mt-auto" : ""}
              `}
                    >
                        <button className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
                            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                                {item.icon}
                            </span>
                            <span className={textClasses}>{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
