import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Loader } from "./components"
import { userServices } from "./services/index.js";

function App() {
    const queryClient = new QueryClient();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading)
            return (
                <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                    <div className="flex h-full items-center justify-center">
                        <Loader size="lg" message="Loading..." />
                    </div>
                </div>
            );

    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Outlet />
            </div>
        </QueryClientProvider>
    );
}

export default App;
