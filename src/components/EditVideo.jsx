import { useState } from "react";
import { videoServices }  from "../services/index.js"
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditVideo = ({
    setShowEdit,
    videoId,
    thumbnail,
    title,
    description,
    setThumbnail,
    setTitle,
    setDescription,
}) => {
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const updateVideo = async () => {
        try {
            const videoData = new FormData();
            if (thumbnailFile) videoData.append("thumbnail", thumbnailFile);
            videoData.append("title", title);
            videoData.append("description", description);
            await videoServices.updateVideo(videoId, videoData);
            window.location.reload();
        } catch (error) {
            console.error("Failed to update video:", error);
        }
    };

    return (
        <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
            <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                <div className="mb-4 flex items-start justify-between">
                    <h2 className="text-xl font-semibold">
                        Edit Video
                    </h2>
                    <button
                        className="h-6 w-6 transition-all duration-200 hover:scale-110 hover:text-blue-500 active:scale-95"
                        onClick={() => setShowEdit(false)}
                    >
                        <XMarkIcon />
                    </button>
                </div>

                <label htmlFor="thumbnail" className="mb-1 inline-block">
                    Thumbnail<sup>*</sup>
                </label>
                <label
                    className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
                    htmlFor="thumbnail"
                >
                    <input
                        type="file"
                        className="sr-only"
                        id="thumbnail"
                        onChange={(e) => {
                            setThumbnailFile(e.target.files[0]);
                            handleThumbnailChange(e);
                        }}
                    />
                    <img src={thumbnail} alt="State Management with Redux" />
                </label>

                <div className="mb-6 flex flex-col gap-y-4">
                    <div className="w-full">
                        <label htmlFor="title" className="mb-1 inline-block">
                            Title<sup>*</sup>
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border bg-transparent px-2 py-1 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="desc" className="mb-1 inline-block">
                            Description<sup>*</sup>
                        </label>
                        <textarea
                            id="desc"
                            className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="border px-4 py-3 transition-all duration-200 hover:bg-gray-700 hover:border-gray-500 active:scale-95"
                        onClick={() => setShowEdit(false)}
                    >
                        Cancel
                    </button>
                    <button className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF] transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-95" onClick={updateVideo}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditVideo;
