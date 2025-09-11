import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";
import { Header, Sidebar, AuthLayout } from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Header />,
                children: [
                    {
                        path: "/",
                        element: <Sidebar variant="sticky" />,
                        children: [
                            {
                                path: "/",
                                element: (
                                    <AuthLayout authentication>
                                        <Home />
                                    </AuthLayout>
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
