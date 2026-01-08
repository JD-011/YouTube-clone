import React from "react";
import { PlayIcon, UserPlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { subscriptionServices } from "../services";
import { useFormatNumber } from "../hooks";

const Channel = ({ channel }) => {
    const { loggedIn, userData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [state, setState] = React.useState(false);

    return (
        <>
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={channel?.coverImage} alt="cover-photo" />
                </div>
            </div>
            <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src={channel?.avatar}
                            alt="Channel"
                            className="h-full w-full"
                        />
                    </span>

                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">
                            {channel?.fullName}
                        </h1>
                        <p className="text-sm text-gray-400">
                            @{channel?.username}
                        </p>
                        <p className="text-sm text-gray-400">
                            {useFormatNumber(channel?.subscribersCount)}{" "}
                            Subscribers&nbsp;&middot;&nbsp;
                            {useFormatNumber(channel?.subscribedToCount)}{" "}
                            Subscribed
                        </p>
                    </div>

                    <div className="inline-block">
                        {loggedIn &&
                        userData?.username !== channel?.username ? (
                            <button
                                className="mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                onClick={async () => {
                                    if (!loggedIn) {
                                        navigate("/login");
                                        return;
                                    }
                                    await subscriptionServices.toggleSubscription(
                                        channel._id
                                    );
                                    if (channel.isSubscribed)
                                        channel.isSubscribed = false;
                                    else channel.isSubscribed = true;
                                    setState((prev) => !prev);
                                }}
                            >
                                <span className="inline-block w-5">
                                    <UserPlusIcon strokeWidth={2} />
                                </span>
                                {channel?.isSubscribed
                                    ? "Subscribed"
                                    : "Subscribe"}
                            </button>
                        ) : (
                            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                <span className="inline-block w-5">
                                    <PencilIcon strokeWidth={2} />
                                </span>
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                    <li className="w-full">
                        <button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
                            Videos
                        </button>
                    </li>
                    <li className="w-full">
                        <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                            Playlists
                        </button>
                    </li>
                    <li className="w-full">
                        <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                            Tweets
                        </button>
                    </li>
                    <li className="w-full">
                        <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                            Subscribed
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Channel;
