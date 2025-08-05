import React from "react";
import {
    EllipsisHorizontalIcon,
    FaceSmileIcon,
} from "@heroicons/react/24/outline";

const AddTweet = () => {
    return (
        <div className="px-4 pb-2">
            <div className="mt-2 border pb-2">
                <textarea
                    className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                    placeholder="Write a tweet"
                ></textarea>
                <div className="flex items-center justify-end gap-x-3 px-3">
                    <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                        <FaceSmileIcon strokeWidth={2} />
                    </button>
                    <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                        <EllipsisHorizontalIcon strokeWidth={2} />
                    </button>
                    <button className="bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTweet;
