import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useFormatDuration, useFormatTime, useFormatNumber } from "../hooks";

const VideoCards = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {data.pages.map((page) => {
                return page.docs.map((video) => (
                    <div key={video._id} className="w-full">
                        <div className="relative mb-2 w-full pt-[56%]">
                            <div className="absolute inset-0 cursor-pointer">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="h-full w-full"
                                    onClick={() => navigate(`/video/${video._id}`)}
                                />
                            </div>
                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                {useFormatDuration(video.duration)}
                            </span>
                        </div>
                        <div className="flex gap-x-2">
                            <div className="h-10 w-10 shrink-0">
                                <img
                                    src={video.owner.avatar}
                                    alt={video.owner.username}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <h6 className="mb-1 font-semibold">
                                    {video.title}
                                </h6>
                                <p className="flex text-sm text-gray-200">
                                    {useFormatNumber(video.views)}&nbsp;Views &middot;{" "}
                                    {useFormatTime(video.createdAt)}
                                </p>
                                <p className="text-sm font-bold text-gray-200">
                                    {video.owner.fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                ));
            })}
        </div>
    );
};

export default VideoCards;
