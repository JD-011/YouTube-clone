import { useState, useEffect } from "react";
import { useFormatTime, useFormatNumber } from "../hooks";
import { playlistServices } from "../services";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Loader, ErrorPage, Empty } from "./";
import { FolderIcon } from "@heroicons/react/24/outline";

const Playlists = () => {
    const navigate = useNavigate();
    const { userId } = useOutletContext();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await playlistServices.getUserPlaylist(userId);
                if (res?.data) setPlaylists(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading)
        return (
            <div className="flex mt-25 items-center justify-center">
                <Loader size="md" message="Loading playlists..." />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center">
                <ErrorPage
                    title="Oops! Something went wrong!"
                    message="We couldn't load the playlists right now. Please check your connection and try again."
                    onRetry={() => window.location.reload()}
                    onGoHome={() => navigate("/")}
                />
            </div>
        );

    if (playlists.length === 0)
        return (
            <div className={`flex mt-25 items-center justify-center`}>
                <Empty
                    message="No playlist created"
                    description="There are no playlist created on this channel."
                    Icon={FolderIcon}
                />
            </div>
        );

    return (
        <div className="px-4 pb-4">
            <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
                {playlists.map(
                    (playlist) =>
                        playlist.videos > 0 && (
                            <div key={playlist._id} className="w-full">
                                <div className="relative mb-2 w-full pt-[56%]">
                                    <div className="absolute inset-0  cursor-pointer" onClick={() => navigate(`/playlist/${playlist._id}`)}>
                                        <img
                                            src={playlist.thumbnail}
                                            alt={playlist.name}
                                            className="h-full w-full"
                                        />
                                        <div className="absolute inset-x-0 bottom-0">
                                            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                                                <div className="relative z-[1]">
                                                    <p className="flex justify-between">
                                                        <span className="inline-block">
                                                            Playlist
                                                        </span>
                                                        <span className="inline-block">
                                                            {useFormatNumber(playlist.videos)}
                                                            &nbsp;videos
                                                        </span>
                                                    </p>
                                                    <p className="text-sm text-gray-200">
                                                        {useFormatNumber(playlist.views)}{" "}
                                                        Views&nbsp;&middot;&nbsp;
                                                        {useFormatTime(
                                                            playlist.createdAt,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mb-1 font-semibold">
                                    {playlist.name}
                                </h6>
                                <p className="flex text-sm text-gray-200">
                                    {playlist.description}
                                </p>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

export default Playlists;
