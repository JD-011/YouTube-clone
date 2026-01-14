import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, VideoList, Loader, ErrorPage, Header, Sidebar } from "../components";
import { userServices } from "../services";
import { PlayIcon } from "@heroicons/react/24/outline";

function History() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const res = await userServices.getWatchHistory();                
                if(res?.data?.watchHistory) setVideos(res.data.watchHistory)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading)
        return (
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Loader size="md" message="Loading History..." />
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
                                title="Oops! Something went wrong!"
                                message="We couldn't load the videos right now. Please check your connection and try again."
                                onRetry={() => window.location.reload()}
                                onGoHome={() => navigate("/")}
                            />
                        </div>    
                    </section>             
                </Sidebar>
            </Header>
        );

    if (videos?.length == 0)
        return (
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Empty
                                message="No videos Here"
                                description="It seems like you haven't watched any videos yet."
                                Icon={PlayIcon}
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
                    <div className="w-full">
                        <VideoList videos={videos} />
                    </div>
                </section>   
            </Sidebar>
        </Header>
    )
}

export default History;
