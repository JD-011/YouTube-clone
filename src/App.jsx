import { React, useEffect} from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Outlet />
            </div>
        </QueryClientProvider>
    );
}

export default App;
