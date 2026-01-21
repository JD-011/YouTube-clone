import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "./";
import { userServices } from "../services/index.js";
import {
    ClockIcon,
    ListBulletIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

const EditChannelInfo = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setSuccess(false);
            setError(null);
            if (!username || !description)
                throw new Error("All fields are required");
            const res = await userServices.updateUsername(username);
            if (res?.success) {
                setSuccess(true);
                navigate(`/@${username}/edit/channel-info`);
                window.location.reload();
            }
        } catch (err) {
            if (err.status === 400) err.message = "Username is already taken.";
            setError(err);
        } finally {
            setLoading(false);
            setUsername("");
            setDescription("");
        }
    };

    if (loading)
        return (
            <div className="flex mt-25 items-center justify-center">
                <Loader size="md" message="Loading..." />
            </div>
        );

    return (
        <div className="px-4 pb-4">
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                    <h5 className="font-semibold">Channel Info</h5>
                    <p className="text-gray-300">
                        Update your Channel details here.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3">
                    {success && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500 px-4 py-3 text-green-500">
                            <CheckCircleIcon className="h-6 w-6" />
                            <p>Channel info changed successfully!</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500 px-4 py-3 text-red-500">
                            <XCircleIcon className="h-6 w-6" />
                            <p>
                                {error?.message ||
                                    "Failed to change channel info. Please try again."}
                            </p>
                        </div>
                    )}
                    <div className="rounded-lg border">
                        <div className="flex flex-wrap gap-y-4 p-4">
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <div className="flex rounded-lg border">
                                    <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">
                                        vidplay.com/
                                    </p>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent px-2 py-1.5"
                                        id="username"
                                        placeholder="@username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="desc"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    rows={4}
                                    id="desc"
                                    placeholder="Channel Description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                                <p className="mt-0.5 text-sm text-gray-300">
                                    275 characters left
                                </p>
                            </div>
                            <div className="flex w-full items-center gap-3">
                                <div className="w-full max-w-xs rounded-lg border">
                                    <select
                                        className="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-2"
                                        defaultValue="regular"
                                    >
                                        <option value="regular">Regular</option>
                                    </select>
                                </div>
                                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                                    <svg
                                        width="11"
                                        height="14"
                                        viewBox="0 0 11 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.6 6.79C9.57 6.12 10.25 5.02 10.25 4C10.25 1.74 8.5 0 6.25 0H0V14H7.04C9.13 14 10.75 12.3 10.75 10.21C10.75 8.69 9.89 7.39 8.6 6.79ZM3 2.5H6C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5H3V2.5ZM6.5 11.5H3V8.5H6.5C7.33 8.5 8 9.17 8 10C8 10.83 7.33 11.5 6.5 11.5Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                                    <svg
                                        width="12"
                                        height="14"
                                        viewBox="0 0 12 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                                    <svg
                                        width="20"
                                        height="10"
                                        viewBox="0 0 20 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                                    <ListBulletIcon />
                                </button>
                                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                                    <svg
                                        width="19"
                                        height="16"
                                        viewBox="0 0 19 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="timezone"
                                >
                                    Timezone
                                </label>
                                <div className="relative w-full rounded-lg border">
                                    <div className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                                        <ClockIcon />
                                    </div>
                                    <select
                                        id="timezone"
                                        className="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-8"
                                        defaultValue="UTC+05:30"
                                    >
                                        <option value="UTC+05:30">
                                            (UTC+05:30) Chennai, Kolkata,
                                            Mumbai, New Delhi
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr className="border border-gray-300" />
                        <div className="flex items-center justify-end gap-4 p-4">
                            <button
                                className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                                onClick={() => {
                                    setUsername("");
                                    setDescription("");
                                    setError(null);
                                    setSuccess(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black rounded-lg hover:bg-[#9c5fff] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                                onClick={handleSubmit}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditChannelInfo;
