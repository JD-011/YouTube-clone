import { useState, useEffect } from "react";
import { playlistServices } from "../services/index.js";
import { useNavigate, useParams } from "react-router-dom";
import {
    Playlist as PlaylistComponent,
    Header,
    Sidebar,
    Loader,
    ErrorPage,
    Empty,
} from "../components";

const Playlist = () => {
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await playlistServices.getPlaylist(playlistId);
                if (res?.data) setPlaylist(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })()
    }, [playlistId])

    if (loading)
            return (
                <Header>
                    <Sidebar variant="sticky">
                        <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                            <div className="flex h-full items-center justify-center">
                                <Loader size="md" message="Loading Playlist..." />
                            </div>
                        </section>
                    </Sidebar>
                </Header>
            );

    if (error)
            return (
                <Header>
                    <Sidebar variant="sticky">
                        <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                            <div className="flex h-full items-center justify-center">
                                <ErrorPage
                                    title={error.status == 404 ? "Playlist does not exist!" : "Oops! Something went wrong!"}
                                    message={error.status == 404 ? "We couldn't find the Playlist you're looking for." : "We couldn't load the playlist right now. Please check your connection and try again."}
                                    onRetry={() => window.location.reload()}
                                    onGoHome={() => navigate("/")}
                                />
                            </div>    
                        </section>             
                    </Sidebar>
                </Header>
            );

    return (
        <Header>
            <Sidebar variant="sticky">
                <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    <PlaylistComponent playlist={playlist} />
                </section>
            </Sidebar>
        </Header>
    );
};

export default Playlist;
