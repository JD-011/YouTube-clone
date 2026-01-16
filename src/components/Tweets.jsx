import React, { useState, useEffect, use } from "react";
import { tweetServices, likeServices, dislikeServices } from "../services";
import { useSelector } from "react-redux";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useFormatTime } from "../hooks";
import { Empty, Loader, ErrorPage } from "../components";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    UsersIcon,
    FaceSmileIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const Tweets = () => {
    const navigate = useNavigate();
    const { loggedIn, userData } = useSelector((state) => state.auth);
    const { userId } = useOutletContext();
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState(false);
    const m = userId === userData?._id ? "mt-6" : "mt-25";

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await tweetServices.getUserTweets(
                    userId,
                    userData?._id
                );
                if (res?.data) setTweets(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const createTweet = async () => {
        const res = await tweetServices.createTweet({
            content: tweet,
        });
        const newTweet = {
            _id: res.data._id,
            content: tweet,
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
        };
        setTweet("");
        setTweets([newTweet, ...tweets]);
        setState((prev) => !prev);
    };

    if (loading)
        return (
            <div className="flex mt-25 items-center justify-center">
                <Loader size="md" message="Loading tweets..." />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center">
                <ErrorPage
                    title="Oops! Something went wrong!"
                    message="We couldn't load the tweets right now. Please check your connection and try again."
                    onRetry={() => window.location.reload()}
                    onGoHome={() => navigate("/")}
                />
            </div>
        );

    if (tweets.length === 0)
        return (
            <>
                {userId === userData?._id && (
                    <div className="px-4 pb-4">
                        <div className="mt-2 border pb-2">
                            <textarea
                                className="mb-2 h-10 w-full h-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                                placeholder="Write a tweet"
                                value={tweet}
                                onChange={(e) => setTweet(e.target.value)}
                            ></textarea>
                            <div className="flex items-center justify-end gap-x-3 px-3">
                                <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                                    <FaceSmileIcon strokeWidth={2} />
                                </button>
                                <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                                    <EllipsisHorizontalIcon strokeWidth={2} />
                                </button>
                                <button
                                    className="bg-[#ae7aff] px-3 py-2 font-semibold text-black rounded-lg hover:bg-[#9c5fff] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                                    onClick={createTweet}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`flex ${m} items-center justify-center`}>
                    <Empty
                        message="No Tweets"
                        description="This channel has not yet made a tweet."
                        Icon={UsersIcon}
                    />
                </div>
            </>
        );

    return (
        <div className="px-4 pb-4">
            {userId === userData?._id && (
                <div className="mt-2 border pb-2">
                    <textarea
                        className="mb-2 h-10 w-full h-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                        placeholder="Write a tweet"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    ></textarea>
                    <div className="flex items-center justify-end gap-x-3 px-3">
                        <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                            <FaceSmileIcon strokeWidth={2} />
                        </button>
                        <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                            <EllipsisHorizontalIcon strokeWidth={2} />
                        </button>
                        <button
                            className="bg-[#ae7aff] px-3 py-2 font-semibold text-black rounded-lg hover:bg-[#9c5fff] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                            onClick={createTweet}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
            <div className="py-4">
                {tweets.map((tweet) => (
                    <div
                        key={tweet._id}
                        className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent"
                    >
                        <div className="h-14 w-14 shrink-0">
                            <img
                                src={tweet.owner.avatar}
                                alt={tweet.owner.fullName}
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="w-full">
                            <h4 className="mb-1 flex items-center gap-x-2">
                                <span className="font-semibold">
                                    {tweet.owner.fullName}
                                </span>
                                &nbsp;
                                <span className="inline-block text-sm text-gray-400">
                                    {useFormatTime(tweet.createdAt)}
                                </span>
                            </h4>
                            <p className="mb-2">{tweet.content}</p>
                            <div className="flex gap-4">
                                <button
                                    className={`inline-flex items-center gap-x-2 outline-none`}
                                    onClick={async () => {
                                        if (!loggedIn) {
                                            navigate("/login");
                                            return;
                                        }
                                        await likeServices.ToggleTweetLike(
                                            tweet._id
                                        );
                                        if (tweet.liked) {
                                            tweet.likeCount--;
                                            tweet.liked = false;
                                        } else {
                                            tweet.likeCount++;
                                            tweet.liked = true;
                                            if (tweet.disliked) {
                                                tweet.dislikeCount--;
                                                tweet.disliked = false;
                                            }
                                        }
                                        setState((prev) => !prev);
                                    }}
                                >
                                    <span
                                        className={`inline-block w-5 ${
                                            tweet.liked && "text-[#ae7aff]"
                                        }`}
                                    >
                                        <HandThumbUpIcon />
                                    </span>
                                    {tweet.likeCount}
                                </button>
                                <button
                                    className={`inline-flex items-center gap-x-2 outline-none`}
                                    onClick={async () => {
                                        if (!loggedIn) {
                                            navigate("/login");
                                            return;
                                        }
                                        await dislikeServices.ToggleTweetDislike(
                                            tweet._id
                                        );
                                        if (tweet.disliked) {
                                            tweet.dislikeCount--;
                                            tweet.disliked = false;
                                        } else {
                                            tweet.dislikeCount++;
                                            tweet.disliked = true;
                                            if (tweet.liked) {
                                                tweet.likeCount--;
                                                tweet.liked = false;
                                            }
                                        }
                                        setState((prev) => !prev);
                                    }}
                                >
                                    <span
                                        className={`inline-block w-5 ${
                                            tweet.disliked && "text-[#ae7aff]"
                                        }`}
                                    >
                                        <HandThumbDownIcon />
                                    </span>
                                    {tweet.dislikeCount}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tweets;
