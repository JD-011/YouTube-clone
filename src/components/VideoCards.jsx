import React from "react";

const VideoCards = ({ data }) => {
    const formatDuration = (seconds) => {
        const totalSeconds = Math.floor(seconds);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    };

    const formatTimeAgo = (createdAt) => {
        const now = new Date();
        const uploadTime = new Date(createdAt);
        const diffInMs = now - uploadTime;
        
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInYears > 0) {
            return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        } else if (diffInWeeks > 0) {
            return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
        } else if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {data.pages.map((page) => {
                return page.docs.map((video) => (
                    <div key={video._id} className="w-full">
                        <div className="relative mb-2 w-full pt-[56%]">
                            <div className="absolute inset-0">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="h-full w-full"
                                />
                            </div>
                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                {formatDuration(video.duration)}
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
                                    {video.views}&nbsp;Views &middot;{" "}
                                    {formatTimeAgo(video.createdAt)}
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
