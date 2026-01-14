import React, { useState } from "react";
import { Loader, ErrorPage } from "./";
import { userServices } from "../services";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ChangePass = () => {
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changePassword = async () => {
        try {
            setLoading(true);
            setSuccess(false);
            setError(null);
            if (!currPass || !newPass || !confirmPass)
                throw new Error("All fields are required");
            if (newPass.length < 8)
                throw new Error(
                    "New password must be at least 8 characters long"
                );
            if (newPass !== confirmPass)
                throw new Error(
                    "New password and Confirm password do not match"
                );
            const res = await userServices.changePassword({
                oldPassword: currPass,
                newPassword: newPass,
            });
            if (res?.success) setSuccess(true);
        } catch (err) {            
            if(err.status === 400) err.message = "Invalid current password.";
            setError(err);
        } finally {
            setLoading(false);
            setCurrPass("");
            setNewPass("");
            setConfirmPass("");
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
                    <h5 className="font-semibold">Password</h5>
                    <p className="text-gray-300">
                        Please enter your current password to change your
                        password.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3">
                    {success && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500 px-4 py-3 text-green-500">
                            <CheckCircleIcon className="h-6 w-6" />
                            <p>Password changed successfully!</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500 px-4 py-3 text-red-500">
                            <XCircleIcon className="h-6 w-6" />
                            <p>
                                {error?.message ||
                                    "Failed to change password. Please try again."}
                            </p>
                        </div>
                    )}
                    <div className="rounded-lg border">
                        <div className="flex flex-wrap gap-y-4 p-4">
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="old-pwd"
                                >
                                    Current password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="old-pwd"
                                    placeholder="Current password"
                                    value={currPass}
                                    onChange={(e) =>
                                        setCurrPass(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="new-pwd"
                                >
                                    New password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="new-pwd"
                                    placeholder="New password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                />
                                <p className="mt-0.5 text-sm text-gray-300">
                                    Your new password must be more than 8
                                    characters.
                                </p>
                            </div>
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="cnfrm-pwd"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    id="cnfrm-pwd"
                                    placeholder="Confirm password"
                                    value={confirmPass}
                                    onChange={(e) =>
                                        setConfirmPass(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <hr className="border border-gray-300" />
                        <div className="flex items-center justify-end gap-4 p-4">
                            <button
                                className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
                                onClick={() => {
                                    setCurrPass("");
                                    setNewPass("");
                                    setConfirmPass("");
                                    setError(null);
                                    setSuccess(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black rounded-lg hover:bg-[#9c5fff] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                                onClick={changePassword}
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
