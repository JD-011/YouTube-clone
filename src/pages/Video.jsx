import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Video as VideoComponent, Header, Sidebar, ErrorPage, Loader } from "../components";
import { videoServices } from "../services";

const Video = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [videoDetails, setVideoDetails] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                const videoData = await videoServices.getVideo(videoId);
                if(videoData?.data) setVideoDetails(videoData.data)
                const videosData = await videoServices.getAllVideos();
                if(videosData?.data?.docs) setVideos(videosData.data.docs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [videoId]);

    if (loading)
        return (
            <Header>
                <Sidebar variant="hover">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Loader size="md" message="Loading the video..." />
                        </div>
                    </section>
                </Sidebar>
            </Header>
        );
        
    if (error){
        let title;
        let msg;
        if(error.status == 400 || error.status == 404){
            title = "Video not found";
            msg = "The video you are looking for does not exist or has been removed.";
        } else {
            title = "Oops! Something went wrong!";
            msg = "We couldn't load the video right now. Please check your connection and try again.";
        }

        return (
            <Header>
                <Sidebar variant="hover">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <ErrorPage
                                title={title}
                                message={msg}
                                onRetry={() => window.location.reload()}
                                onGoHome={() => navigate("/")}
                            />
                        </div>    
                    </section>             
                </Sidebar>
            </Header>
        );
    }

    return (
        <Header>
            <Sidebar variant="hover">
                <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    <VideoComponent videoDetails={videoDetails} videos={videos} />
                </section>   
            </Sidebar>
        </Header>
    );
};

export default Video;