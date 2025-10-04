import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import userServices from "./services/user";

function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const res = await userServices.getUser();
                if (res?.data?.user) dispatch(login(res.data.user));
                else dispatch(logout());
            } catch (err) {
                if (err?.status === 401) {
                    try {
                        await userServices.refreshToken();
                        const res = await userServices.getUser();
                        if (res?.data?.user) dispatch(login(res.data.user));
                        else dispatch(logout());
                    } catch (e) {
                        dispatch(logout());
                    }
                } else {
                    dispatch(logout());
                }
            }
        })();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Outlet />
            </div>
        </QueryClientProvider>
    );
}

export default App;
