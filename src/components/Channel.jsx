import React from "react";
import { PlayIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const Channel = () => {
    return (
        <>
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
                        alt="cover-photo"
                    />
                </div>
            </div>
            <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Channel"
                            className="h-full w-full"
                        />
                    </span>

                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">React Patterns</h1>
                        <p className="text-sm text-gray-400">@reactpatterns</p>
                        <p className="text-sm text-gray-400">
                            600k Subscribers&nbsp;&middot;&nbsp;220 Subscribed
                        </p>
                    </div>

                    <div className="inline-block">
                        <div className="inline-flex min-w-[145px] justify-end">
                            <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                <span className="inline-block w-5">
                                    <UserPlusIcon strokeWidth={2} />
                                </span>
                                <span className="group-focus/btn:hidden">
                                    Subscribe
                                </span>
                                <span className="hidden group-focus/btn:block">
                                    Subscribed
                                </span>
                            </button>
                        </div>
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
                            Playlist
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
