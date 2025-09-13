import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
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
                                element: <Home />
                            },
                        ],
                    },
                ],
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                )
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignUp />
                    </AuthLayout>
                )
            }
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
