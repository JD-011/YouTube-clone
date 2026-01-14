import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const Empty = ({ message, description, Icon, BtnText }) => {
    return (
        <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
                <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                    <Icon className="w-6" />
                </span>
            </p>
            <h5 className="mb-2 font-semibold">{message}</h5>
            <p>{description}</p>
            {BtnText && (
                <button className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black rounded-lg hover:bg-[#9c5fff] hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out">
                    <PlusIcon className="h-5 w-5" strokeWidth={2} />
                    {BtnText}
                </button>
            )}
        </div>
    );
};

export default Empty;
