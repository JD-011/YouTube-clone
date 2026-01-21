import React, { useState } from "react";
import { Loader } from "./";
import { userServices } from "../services/index.js";
import { useOutletContext } from "react-router-dom";
import {
    EnvelopeIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

const EditPersonalInfo = () => {
    const { avatarFile, coverImageFile } = useOutletContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setSuccess(false);
            setError(null);
            if (!firstName || !lastName || !email)
                throw new Error("All fields are required");
            if(avatarFile) {
                const formData = new FormData();
                formData.append("avatar", avatarFile);
                await userServices.updateAvatar(formData);
            }
            if(coverImageFile) {
                const formData = new FormData();
                formData.append("coverImage", coverImageFile);
                await userServices.updateCoverImage(formData);
            }
            const res = await userServices.updateAccountDetails({
                fullName: `${firstName} ${lastName}`,
                email,
            });
            if (res?.success) {
                setSuccess(true);
                window.location.reload();
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setFirstName("");
            setLastName("");
            setEmail("");
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
                    <h5 className="font-semibold">Personal Info</h5>
                    <p className="text-gray-300">
                        Update your photo and personal details.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3">
                    {success && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500 px-4 py-3 text-green-500">
                            <CheckCircleIcon className="h-6 w-6" />
                            <p>Personal info changed successfully!</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500 px-4 py-3 text-red-500">
                            <XCircleIcon className="h-6 w-6" />
                            <p>
                                {error?.message ||
                                    "Failed to change personal info. Please try again."}
                            </p>
                        </div>
                    )}
                    <div className="rounded-lg border">
                        <div className="flex flex-wrap gap-y-4 p-4">
                            <div className="w-full lg:w-1/2 lg:pr-2">
                                <label
                                    htmlFor="firstname"
                                    className="mb-1 inline-block"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="firstname"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full lg:w-1/2 lg:pl-2">
                                <label
                                    htmlFor="lastname"
                                    className="mb-1 inline-block"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="lastname"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="email"
                                    className="mb-1 inline-block"
                                >
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                                        <EnvelopeIcon />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                                        id="lastname"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="border border-gray-300" />
                        <div className="flex items-center justify-end gap-4 p-4">
                            <button
                                className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                                onClick={() => {
                                    setFirstName("");
                                    setLastName("");
                                    setEmail("");
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

export default EditPersonalInfo;
