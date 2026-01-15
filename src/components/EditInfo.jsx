import React, { useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const EditInfo = ({ channel, setAvatarFile, setCoverImageFile }) => {
    const { userData } = useSelector((state) => state.auth);
    const [avatar, setAvatar] = useState(channel?.avatar);
    const [coverImage, setCoverImage] = useState(channel?.coverImage);
    const navigate = useNavigate();
    const location = useLocation();

    const isPersonalInfoActive =
        location.pathname === `/@${userData.username}/edit` ||
        location.pathname === `/@${userData.username}/edit/personal-info`;
    const isChannelInfoActive =
        location.pathname === `/@${userData.username}/edit/channel-info`;
    const isChangePassActive =
        location.pathname === `/@${userData.username}/edit/change-password`;

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setCoverImage(previewUrl);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            setAvatar(previewUrl);
        }
    };

    return (
        <>
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={coverImage} alt="cover-photo" />
                </div>
                {isPersonalInfoActive && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <input
                            type="file"
                            id="cover-image"
                            className="hidden"
                            onChange={handleCoverImageChange}
                        />
                        <label
                            htmlFor="cover-image"
                            className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
                        >
                            <CloudArrowUpIcon />
                        </label>
                    </div>
                )}
            </div>
            <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src={avatar}
                            alt="Channel"
                            className="h-full w-full"
                        />
                        {isPersonalInfoActive && (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <input
                                    type="file"
                                    id="profile-image"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                                <label
                                    htmlFor="profile-image"
                                    className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
                                >
                                    <CloudArrowUpIcon />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">
                            {channel?.fullName}
                        </h1>
                        <p className="text-sm text-gray-400">
                            @{channel?.username}
                        </p>
                    </div>

                    <div className="inline-block">
                        <button
                            className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black hover:bg-[#9c5fff] shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                            onClick={() =>
                                navigate(`/channel/@${userData?.username}`)
                            }
                        >
                            View channel
                        </button>
                    </div>
                </div>

                <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                    <li className="w-full">
                        <button
                            onClick={() =>
                                navigate(
                                    `/@${userData.username}/edit/personal-info`
                                )
                            }
                            className={`w-full border-b-2 px-3 py-1.5 transition-all duration-200 ${
                                isPersonalInfoActive
                                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                                    : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            Personal Information
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            onClick={() =>
                                navigate(
                                    `/@${userData.username}/edit/channel-info`
                                )
                            }
                            className={`w-full border-b-2 px-3 py-1.5 transition-all duration-200 ${
                                isChannelInfoActive
                                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                                    : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            Channel Information
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                            onClick={() =>
                                navigate(
                                    `/@${userData.username}/edit/change-password`
                                )
                            }
                            className={`w-full border-b-2 px-3 py-1.5 transition-all duration-200 ${
                                isChangePassActive
                                    ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                                    : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            Change Password
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default EditInfo;
