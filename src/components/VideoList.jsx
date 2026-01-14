import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormatDuration, useFormatTime, useFormatNumber } from "../hooks";

const VideoList = ({ videos }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 p-4">
            {videos.map((video) => (
                <div
                    key={video._id}
                    className="w-full max-w-5xl gap-x-4 md:flex"
                >
                    <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                        <div className="w-full pt-[56%]">
                            <div className="absolute inset-0 cursor-pointer">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="h-full w-full"
                                    onClick={() =>
                                        navigate(`/video/${video._id}`)
                                    }
                                />
                            </div>
                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                {useFormatDuration(video.duration)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-x-2 md:w-7/12">
                        <div className="h-10 w-10 shrink-0 md:hidden">
                            <img
                                src={video.owner.avatar}
                                alt={video.owner.username}
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="w-full">
                            <h6 className="mb-1 font-semibold md:max-w-[100%]">
                                {video.title}
                            </h6>
                            <p className="flex text-sm text-gray-200 sm:mt-3">
                                {useFormatNumber(video.views)}&nbsp;Views
                                &middot; {useFormatTime(video.createdAt)}
                            </p>
                            <div className="flex items-center gap-x-4">
                                <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                                    <img
                                        src={video.owner.avatar}
                                        alt={video.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <p className="text-sm font-bold text-gray-200">
                                    {video.owner.fullName}
                                </p>
                            </div>
                            <p className="mt-2 hidden text-sm md:block">
                                {video.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoList;
