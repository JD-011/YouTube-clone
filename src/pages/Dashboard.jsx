import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dashboard as DashboardComponent,
    Header,
    Loader,
    ErrorPage,
} from "../components";
import { dashboardServices } from "../services/index.js";

const Dashboard = () => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const channelRes = await dashboardServices.getChannelStats();
                const videosRes = await dashboardServices.getChannelVideos();
                if (channelRes?.data) setChannel(channelRes.data);
                if (videosRes?.data) setVideos(videosRes.data);
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
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)] items-center justify-center">
                    <Loader size="md" message="Loading Dashboard..." />
                </div>
            </Header>
        );

    if (error)
        return (
            <Header>
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)] items-center justify-center">
                    <ErrorPage
                        title="Oops! Something went wrong!"
                        message="We couldn't load the videos right now. Please check your connection and try again."
                        onRetry={() => window.location.reload()}
                        onGoHome={() => navigate("/")}
                    />
                </div>
            </Header>
        );

    return (
        <Header>
            <DashboardComponent channel={channel} videos={videos} />
        </Header>
    );
};

export default Dashboard;
