import React from "react";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const Tweets = () => {
    // this is just for demo you have to fetch Tweets from your backend
    const tweets = [
        {
            id: "1",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Exploring the latest features in JavaScript ES11! The language keeps evolving. 💡 #JavaScript #ES11",
            createdAt: "5 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "2",
            likeCount: 425,
            dislikeCount: 87,
            liked: false,
            disliked: false,
            content:
                "Embracing the benefits of TypeScript for stronger, more reliable code. 🚀 #TypeScript #Programming",
            createdAt: "6 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "3",
            likeCount: 425,
            dislikeCount: 87,
            liked: false,
            disliked: false,
            content:
                "Styling made easy with Tailwind CSS! Rapidly build beautiful, responsive interfaces. 🎨 #TailwindCSS #WebDev",
            createdAt: "7 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "4",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Building dynamic user interfaces with React! The go-to library for modern web development. 🚀 #React #WebDev",
            createdAt: "8 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "5",
            likeCount: 425,
            dislikeCount: 87,
            liked: false,
            disliked: true,
            content:
                "Next.js makes server-side rendering a breeze! Boost your React app's performance with ease. 🚀 #Nextjs #React",
            createdAt: "9 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "6",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Dive into advanced JavaScript concepts like closures and prototypes. Level up your coding skills! 🔍 #AdvancedJS #CodingTips",
            createdAt: "10 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "7",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Mastering TypeScript: From basics to advanced concepts. Boost your development workflow with strong typing! 🚀 #TypeScript #Development",
            createdAt: "11 hours ago",
            owner: {
                id: "26",
                username: "tscripter",
                fullName: "TS Scripter",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "420K",
            },
        },
        {
            id: "8",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Simplify your CSS workflow with Tailwind CSS. Effortless styling for modern web development! 🎨 #TailwindCSS #WebDev",
            createdAt: "12 hours ago",
            owner: {
                id: "27",
                username: "tailwiz",
                fullName: "Tailwind Wizard",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "600K",
            },
        },
        {
            id: "9",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Building dynamic UIs with React - A comprehensive guide for developers. Get started with React today! 🚀 #React #WebDevelopment",
            createdAt: "13 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
        {
            id: "10",
            likeCount: 425,
            dislikeCount: 87,
            liked: true,
            disliked: false,
            content:
                "Optimize server-side rendering with Next.js. Improve performance and SEO for your React applications! 🚀 #Nextjs #React",
            createdAt: "14 hours ago",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                subscribers: "757K",
            },
        },
    ];
    return (
        <div className="px-4 pb-4">
            <div className="py-4">
                {tweets.map((tweet) => (
                    <div
                        key={tweet.id}
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
                                    {tweet.createdAt}
                                </span>
                            </h4>
                            <p className="mb-2">{tweet.content}</p>
                            <div className="flex gap-4">
                                <button
                                    className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]`}
                                    data-like-count={tweet.likeCount}
                                    data-like-count-alt={
                                        tweet.liked
                                            ? tweet.likeCount - 1
                                            : tweet.likeCount + 1
                                    }
                                >
                                    <HandThumbUpIcon
                                        className={`h-5 w-5 ${
                                            tweet.liked
                                                ? "text-[#ae7aff] group-focus:text-inherit"
                                                : "text-inherit group-focus:text-[#ae7aff]"
                                        }`}
                                    />
                                </button>
                                <button
                                    className={`group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]`}
                                    data-dislike-count={tweet.dislikeCount}
                                    data-dislike-count-alt={
                                        tweet.disliked
                                            ? tweet.dislikeCount - 1
                                            : tweet.dislikeCount + 1
                                    }
                                >
                                    <HandThumbDownIcon
                                        className={`h-5 w-5 ${
                                            tweet.disliked
                                                ? "text-[#ae7aff] group-focus:text-inherit"
                                                : "text-inherit group-focus:text-[#ae7aff]"
                                        }`}
                                    />
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
