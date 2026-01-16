import React, { useState } from "react";
import { subscriptionServices } from "../services";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormatNumber } from "../hooks";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const ChannelList = ({ channels }) => {
    const navigate = useNavigate();
    const { loggedIn, userData } = useSelector((state) => state.auth);
    const [state, setState] = useState(false);

    return (
        <div className="px-4 pb-4">
            <div className="flex flex-col gap-y-4 py-4">
                {channels.map((channel) => (
                    <div
                        className="flex w-full justify-between p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/5 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                        key={channel._id}
                        onClick={() => navigate(`/channel/@${channel.subscriber.username}`)}
                    >
                        <div className="flex items-center gap-x-2">
                            <div className="h-14 w-14 shrink-0">
                                <img
                                    src={channel.subscriber.avatar}
                                    alt={channel.subscriber.fullName}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="block">
                                <h6 className="font-semibold">
                                    {channel.subscriber.fullName}
                                </h6>
                                <p className="text-sm text-gray-300">
                                    {useFormatNumber(
                                        channel.subscriber.subscribers
                                    )}
                                    &nbsp;Subscribers
                                </p>
                            </div>
                        </div>
                        <div className="block">
                            {userData?.username !==
                            channel.subscriber.username ? (
                                <button
                                    className="mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black hover:bg-[#9c5fff] shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                    onClick={async () => {
                                        if (!loggedIn) {
                                            navigate("/login");
                                            return;
                                        }
                                        await subscriptionServices.toggleSubscription(
                                            channel.subscriber._id
                                        );
                                        if (channel.subscriber.subscribed)
                                            channel.subscriber.subscribed = false;
                                        else
                                            channel.subscriber.subscribed = true;
                                        setState((prev) => !prev);
                                    }}
                                >
                                    <span className="inline-block w-5">
                                        <UserPlusIcon strokeWidth={2} />
                                    </span>
                                    {channel.subscriber.subscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </button>
                            ) : (
                                <button
                                    className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black hover:bg-[#9c5fff] shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                    onClick={() =>
                                        navigate(
                                            `/${userData.username}/edit/personal-info`
                                        )
                                    }
                                >
                                    <span className="inline-block w-5">
                                        <PencilIcon strokeWidth={2} />
                                    </span>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelList;
