import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, SignUp, Video, LikedVideos, History } from "./pages";
import { AuthLayout } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import conf from "./conf";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/register",
                element: (
                    <AuthLayout authentication={false}>
                        <SignUp />
                    </AuthLayout>
                ),
            },
            {
                path: "/video/:videoId",
                element: <Video />,
            },
            {
                path: "/liked-videos",
                element: (
                    <AuthLayout authentication={true}>
                        <LikedVideos />
                    </AuthLayout>
                ),
            },
            {
                path: "/history",
                element: (
                    <AuthLayout authentication={true}>
                        <History />
                    </AuthLayout>
                ),
            }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={conf.googleClientId}>
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </Provider>
    </StrictMode>
);
