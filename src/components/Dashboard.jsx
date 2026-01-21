import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { videoServices } from "../services/index.js";
import { UploadVideo, EditVideo, DeleteVideo } from "./";
import {
    EyeIcon,
    HeartIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const Dashboard = ({ channel, videos }) => {
    const navigate = useNavigate();
    const [state, setState] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            <div className="flex w-full flex-col gap-y-6 px-4 py-8">
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="block">
                        <h1 className="text-2xl font-bold">
                            Welcome Back, {channel.fullName}
                        </h1>
                    </div>
                    <div className="block">
                        <button
                            className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black hover:bg-[#9c5fff] active:scale-95 transition-all duration-150 shadow-[5px_5px_0px_0px_#4f4e4e] active:shadow-[2px_2px_0px_0px_#4f4e4e] active:translate-x-[3px] active:translate-y-[3px]"
                            onClick={() => setShowUpload(true)}
                        >
                            <PlusIcon className="h-5 w-5" strokeWidth={2} />{" "}
                            Upload video
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
                    {[
                        {
                            Icon: EyeIcon,
                            title: "Total views",
                            count: channel.views,
                        },
                        {
                            Icon: UserIcon,
                            title: "Total subscribers",
                            count: channel.subscribers,
                        },
                        {
                            Icon: HeartIcon,
                            title: "Total likes",
                            count: channel.likes,
                        },
                    ].map(({ title, Icon, count }) => (
                        <div key={title} className="border p-4">
                            <div className="mb-4 block">
                                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                                    <Icon />
                                </span>
                            </div>
                            <h6 className="text-gray-300">{title}</h6>
                            <p className="text-3xl font-semibold">{count}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full overflow-auto">
                    <table className="w-full min-w-[1200px] border-collapse border text-white">
                        <thead>
                            <tr>
                                <th className="border-collapse border-b p-4">
                                    Status
                                </th>
                                <th className="border-collapse border-b p-4">
                                    Status
                                </th>
                                <th className="border-collapse border-b p-4">
                                    Uploaded
                                </th>
                                <th className="border-collapse border-b p-4">
                                    Rating
                                </th>
                                <th className="border-collapse border-b p-4">
                                    Date uploaded
                                </th>
                                <th className="border-collapse border-b p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.map((video) => (
                                <tr key={video._id} className="group border">
                                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        <div className="flex justify-center">
                                            <label
                                                htmlFor={"vid-pub-" + video._id}
                                                className="relative inline-block w-12 cursor-pointer overflow-hidden"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={"vid-pub-" + video._id}
                                                    className="peer sr-only"
                                                    defaultChecked={
                                                        video.isPublished
                                                    }
                                                    onChange={async (e) => {
                                                        await videoServices.togglePublishStatus(
                                                            video._id,
                                                        );
                                                        video.isPublished =
                                                            e.target.checked;
                                                        setState(
                                                            (prev) => !prev,
                                                        );
                                                    }}
                                                />
                                                <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        <div className="flex justify-center">
                                            <span
                                                className={
                                                    "inline-block rounded-2xl border px-1.5 py-0.5 " +
                                                    (video.isPublished
                                                        ? "border-green-600 text-green-600"
                                                        : "border-orange-600 text-orange-600")
                                                }
                                            >
                                                {video.isPublished
                                                    ? "Published"
                                                    : "Unpublished"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={video.thumbnail}
                                                alt={video.title}
                                            />
                                            <h3
                                                className="font-semibold cursor-pointer hover:text-[#ae7aff] transition-colors duration-200"
                                                onClick={() =>
                                                    navigate(
                                                        `/video/${video._id}`,
                                                    )
                                                }
                                            >
                                                {video.title}
                                            </h3>
                                        </div>
                                    </td>
                                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        <div className="flex justify-center gap-4">
                                            <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                                                {video.likes} likes
                                            </span>
                                            <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
                                                {video.dislikes} dislikes
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        {new Date(
                                            video.createdAt,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                                        <div className="flex gap-4">
                                            <button
                                                className="h-5 w-5 hover:text-[#ae7aff]"
                                                onClick={() => {
                                                    setVideoId(video._id);
                                                    setShowDelete(true);
                                                }}
                                            >
                                                <TrashIcon />
                                            </button>
                                            <button
                                                className="h-5 w-5 hover:text-[#ae7aff]"
                                                onClick={() => {
                                                    setVideoId(video._id);
                                                    setThumbnail(
                                                        video.thumbnail,
                                                    );
                                                    setTitle(video.title);
                                                    setDescription(video.description);
                                                    setShowEdit(true);
                                                }}
                                            >
                                                <PencilIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showUpload && (
                <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
                    <UploadVideo setShowUpload={setShowUpload} />
                </div>
            )}
            {showDelete && (
                <DeleteVideo setShowDelete={setShowDelete} videoId={videoId} />
            )}
            {showEdit && (
                <EditVideo
                    setShowEdit={setShowEdit}
                    videoId={videoId}
                    thumbnail={thumbnail}
                    title={title}
                    description={description}
                    setThumbnail={setThumbnail}
                    setTitle={setTitle}
                    setDescription={setDescription}
                />
            )}
        </>
    );
};

export default Dashboard;
