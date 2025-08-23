import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <Header />
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <Sidebar variant="sticky" />
                <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    <Outlet />
                </section>
            </div>
        </div>
    );
    
}

export default App;
