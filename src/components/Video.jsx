import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormatDuration, useFormatTime, useFormatNumber } from "../hooks";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { likeServices, dislikeServices, subscriptionServices, commentServices } from "../services";
import { useSelector } from "react-redux";

const Video = ({ videoDetails, videos }) => {
    const navigate = useNavigate();
    const { loggedIn, userData } = useSelector((state) => state.auth);
    const [state, setState] = React.useState(false);

    return (
        <div className="flex w-full flex-wrap gap-4 p-5 lg:flex-nowrap">
            <div className="col-span-12 w-full">
                <div className="relative mb-4 w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <video
                            className="h-full w-full"
                            controls
                            autoPlay
                            muted
                        >
                            <source
                                src={videoDetails.videoFile}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
                <div
                    className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                    role="button"
                    tabIndex={0}
                >
                    <div className="flex flex-wrap gap-y-2">
                        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                            <h1 className="text-lg font-bold">
                                {videoDetails.title}
                            </h1>
                            <p className="flex text-sm text-gray-200">
                                {videoDetails.views.toLocaleString("en-US")}
                                &nbsp;Views &middot;{" "}
                                {useFormatTime(videoDetails.createdAt)}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                            <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                                <div className="flex overflow-hidden rounded-lg border">
                                    <button
                                        className="flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 hover:bg-white/10"
                                        onClick={async () => {
                                            if (!loggedIn) {
                                                navigate("/login");
                                                return;
                                            }
                                            await likeServices.ToggleVideoLike(
                                                videoDetails._id
                                            );
                                            if (videoDetails.liked) {
                                                videoDetails.likeCount--;
                                                videoDetails.liked = false;
                                            } else {
                                                videoDetails.likeCount++;
                                                videoDetails.liked = true;
                                                if (videoDetails.disliked) {
                                                    videoDetails.dislikeCount--;
                                                    videoDetails.disliked = false;
                                                }
                                            }
                                            setState((prev) => !prev);
                                        }}
                                    >
                                        <span
                                            className={`inline-block w-5 ${
                                                videoDetails.liked &&
                                                "text-[#ae7aff]"
                                            }`}
                                        >
                                            <HandThumbUpIcon />
                                        </span>
                                        {videoDetails.likeCount}
                                    </button>
                                    <button
                                        className="flex items-center gap-x-2 px-4 py-1.5 hover:bg-white/10"
                                        onClick={async () => {
                                            if (!loggedIn) {
                                                navigate("/login");
                                                return;
                                            }
                                            await dislikeServices.ToggleVideoDislike(
                                                videoDetails._id
                                            );
                                            if (videoDetails.disliked) {
                                                videoDetails.dislikeCount--;
                                                videoDetails.disliked = false;
                                            } else {
                                                videoDetails.dislikeCount++;
                                                videoDetails.disliked = true;
                                                if (videoDetails.liked) {
                                                    videoDetails.likeCount--;
                                                    videoDetails.liked = false;
                                                }
                                            }
                                            setState((prev) => !prev);
                                        }}
                                    >
                                        <span
                                            className={`inline-block w-5 ${
                                                videoDetails.disliked &&
                                                "text-[#ae7aff]"
                                            }`}
                                        >
                                            <HandThumbDownIcon />
                                        </span>
                                        {videoDetails.dislikeCount}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className="mt-2 h-12 w-12 shrink-0">
                                <img
                                    src={videoDetails.owner.avatar}
                                    alt={videoDetails.owner.username}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="block">
                                <p className="text-gray-200">
                                    {videoDetails.owner.fullName}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {useFormatNumber(
                                        videoDetails.owner.subscribers
                                    )}{" "}
                                    Subscribers
                                </p>
                            </div>
                        </div>
                        <div className="block">
                            <button
                                className="mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                                onClick={async () => {
                                    if (!loggedIn) {
                                        navigate("/login");
                                        return;
                                    }
                                    await subscriptionServices.toggleSubscription(videoDetails.owner._id);
                                    if (videoDetails.owner.subscribed) videoDetails.owner.subscribed = false;
                                    else videoDetails.owner.subscribed = true;
                                    setState((prev) => !prev);
                                }}
                            >
                                <span className="inline-block w-5">
                                    <UserPlusIcon strokeWidth={2} />
                                </span>
                                {videoDetails.owner.subscribed
                                    ? "Subscribed"
                                    : "Subscribe"}
                            </button>
                        </div>
                    </div>
                    <hr className="my-4 border-white" />
                    <div className="h-5 overflow-hidden group-focus:h-auto">
                        <p className="text-sm">{videoDetails.description}</p>
                    </div>
                </div>
                <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                    <h6 className="font-semibold">
                        {videoDetails.commentCount} Comments...
                    </h6>
                </button>
                <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                    <div className="block">
                        <h6 className="mb-4 font-semibold">
                            {videoDetails.commentCount} Comments
                        </h6>
                        <input
                            type="text"
                            className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                            placeholder="Add a Comment"
                            onKeyDown={async(e) => {
                                if(e.key !== "Enter") return;
                                if(!loggedIn){
                                    navigate("/login");
                                    return;
                                }
                                const comment = await commentServices.addComment(videoDetails._id, {content: e.target.value});
                                const newComment = {
                                    _id: comment.data._id,
                                    content: e.target.value,
                                    likeCount: 0,
                                    dislikeCount: 0,
                                    liked: false,
                                    disliked: false,
                                    owner: {
                                        fullName: userData.fullName,
                                        username: userData.username,
                                        avatar: userData.avatar,
                                    },
                                    createdAt: new Date().toISOString(),
                                }
                                e.target.value = "";
                                videoDetails.commentCount++;
                                videoDetails.comments.unshift(newComment);
                                setState((prev) => !prev);
                            }}
                        />
                    </div>
                    <hr className="my-4 border-white" />
                    {videoDetails.comments.map((comment) => (
                        <div key={comment._id}>
                            <div className="flex gap-x-4">
                                <div className="mt-2 h-11 w-11 shrink-0">
                                    <img
                                        src={comment.owner.avatar}
                                        alt={comment.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <p className="flex items-center text-gray-200">
                                        {comment.owner.fullName}
                                        &nbsp;&middot;&nbsp;
                                        <span className="text-sm">
                                            {useFormatTime(comment.createdAt)}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-200">
                                        @{comment.owner.username}
                                    </p>
                                    <p className="mt-3 text-sm">
                                        {comment.content}
                                    </p>
                                    <div className="flex gap-4 mt-3">
                                        <button
                                            className={`inline-flex items-center gap-x-2 outline-none`}
                                            onClick={async () => {
                                                if (!loggedIn) {
                                                    navigate("/login");
                                                    return;
                                                }
                                                await likeServices.ToggleCommentLike(
                                                    comment._id
                                                );
                                                if (comment.liked) {
                                                    comment.likeCount--;
                                                    comment.liked = false;
                                                } else {
                                                    comment.likeCount++;
                                                    comment.liked = true;
                                                    if (comment.disliked) {
                                                        comment.dislikeCount--;
                                                        comment.disliked = false;
                                                    }
                                                }
                                                setState((prev) => !prev);
                                            }}
                                        >
                                            <span
                                                className={`inline-block w-5 ${
                                                    comment.liked &&
                                                    "text-[#ae7aff]"
                                                }`}
                                            >
                                                <HandThumbUpIcon />
                                            </span>
                                            {comment.likeCount}
                                        </button>
                                        <button
                                            className={`inline-flex items-center gap-x-2 outline-none`}
                                            onClick={async () => {
                                                if (!loggedIn) {
                                                    navigate("/login");
                                                    return;
                                                }
                                                await dislikeServices.ToggleCommentDislike(
                                                    comment._id
                                                );
                                                if (comment.disliked) {
                                                    comment.dislikeCount--;
                                                    comment.disliked = false;
                                                } else {
                                                    comment.dislikeCount++;
                                                    comment.disliked = true;
                                                    if (comment.liked) {
                                                        comment.likeCount--;
                                                        comment.liked = false;
                                                    }
                                                }
                                                setState((prev) => !prev);
                                            }}
                                        >
                                            <span
                                                className={`inline-block w-5 ${
                                                    comment.disliked &&
                                                    "text-[#ae7aff]"
                                                }`}
                                            >
                                                <HandThumbDownIcon />
                                            </span>
                                            {comment.dislikeCount}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4 border-white" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                {videos
                    .filter((video) => video.isPublished)
                    .map((video) => (
                        <div
                            key={video._id}
                            className="w-full gap-x-2 border pr-2 md:flex"
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
                            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                                <div className="h-12 w-12 shrink-0 md:hidden">
                                    <img
                                        src={videoDetails.owner.avatar}
                                        alt={videoDetails.owner.username}
                                        className="h-full w-full rounded-full"
                                    />
                                </div>
                                <div className="w-full pt-1 md:pt-0">
                                    <h6 className="mb-1 text-sm font-semibold">
                                        {video.title}
                                    </h6>
                                    <p className="mb-0.5 mt-2 text-sm text-gray-200 font-semibold">
                                        {video.owner.fullName}
                                    </p>
                                    <p className="flex text-sm text-gray-200">
                                        {useFormatNumber(video.views)}
                                        &nbsp;Views &middot;{" "}
                                        {useFormatTime(video.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Video;
