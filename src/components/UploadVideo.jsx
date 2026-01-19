import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { videoServices } from "../services";
import { ErrorPage } from "./";
import {
    ArrowUpTrayIcon,
    FilmIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const UploadVideo = ({ setShowUpload }) => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            if (!videoFile || !thumbnail || !title || !description) {
                setError("Please fill in all required fields.");
                return;
            }

            const videoData = new FormData();
            videoData.append("title", title);
            videoData.append("description", description);
            videoData.append("videoFile", videoFile);
            videoData.append("thumbnail", thumbnail);

            const res = await videoServices.publishVideo(videoData);
            if (res.success) setSuccess(true);
        } catch (err) {
            setError("An error occurred while uploading the video.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
        } else {
            alert("Please select a valid video file");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    if (loading)
        return (
            <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
                <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                    <div className="mb-4 flex items-start justify-between">
                        <h2 className="text-xl font-semibold">
                            Uploading Video...
                        </h2>
                    </div>
                    <div className="mb-6 flex gap-x-2 border p-3">
                        <div className="w-8 shrink-0">
                            <span className="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
                                <FilmIcon />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h6>{videoFile.name}</h6>
                            <p className="text-sm">
                                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <div className="mt-2">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="mr-2 inline-block h-5 w-5 animate-spin text-gray-200"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#AE7AFF"
                                    />
                                </svg>
                                Uploading...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    if (success)
        return (
            <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
                <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                    <div className="mb-4 flex items-start justify-between">
                        <h2 className="text-xl font-semibold">
                            Video Uploaded
                        </h2>
                        <button className="h-6 w-6">
                            <XMarkIcon />
                        </button>
                    </div>
                    <div className="mb-6 flex gap-x-2 border p-3">
                        <div className="w-8 shrink-0">
                            <span className="inline-block w-full rounded-full bg-[#E4D3FF] p-1 text-[#AE7AFF]">
                                <FilmIcon />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h6>{videoFile.name}</h6>
                            <p className="text-sm">
                                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <div className="mt-2 flex items-center">
                                <span
                                    className="mr-2 inline-block w-6 text-[#ae7aff] cusror-pointer"
                                    onClick={() => setShowUpload(false)}
                                >
                                    <CheckCircleIcon />
                                </span>
                                Uploaded Successfully
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="border px-4 py-3"
                            onClick={() => setShowUpload(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                            onClick={() => setShowUpload(false)}
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
                <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                    <div className="flex items-center justify-center">
                        <ErrorPage
                            title="Error uploading video!"
                            message={error}
                            onRetry={() => setError("")}
                            onGoHome={() => navigate("/")}
                        />
                    </div>
                </div>
            </div>
        );

    return (
        <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
            <div className="h-full overflow-auto border bg-[#121212]">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">Upload Video</h2>
                    <button
                        className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
                    <div
                        className={`w-full border-2 border-dashed px-4 py-12 text-center transition-colors ${
                            isDragging
                                ? "border-[#ae7aff] bg-[#ae7aff]/10"
                                : "border-gray-600"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                            <ArrowUpTrayIcon />
                        </span>
                        {videoFile ? (
                            <>
                                <h6 className="mb-2 font-semibold text-[#ae7aff]">
                                    Video Selected: {videoFile.name}
                                </h6>
                                <p className="text-gray-400">
                                    Size:{" "}
                                    {(videoFile.size / (1024 * 1024)).toFixed(
                                        2,
                                    )}{" "}
                                    MB
                                </p>
                            </>
                        ) : (
                            <>
                                <h6 className="mb-2 font-semibold">
                                    Drag and drop video files to upload
                                </h6>
                                <p className="text-gray-400">
                                    Your videos will be private untill you
                                    publish them.
                                </p>
                            </>
                        )}
                        <label
                            htmlFor="upload-video"
                            className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                        >
                            <input
                                type="file"
                                id="upload-video"
                                className="sr-only"
                                accept="video/*"
                                onChange={handleFileChange}
                            />
                            {videoFile ? "Change Video" : "Select Files"}
                        </label>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="thumbnail"
                            className="mb-1 inline-block"
                        >
                            Thumbnail<sup>*</sup>
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5 file:text-black file:cursor-pointer outline-none"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="title" className="mb-1 inline-block">
                            Title<sup>*</sup>
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border bg-transparent px-2 py-1 outline-none"
                            placeholder="video title"
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
                            placeholder="video description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadVideo;
