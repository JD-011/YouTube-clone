import { ChannelList, Empty, Loader, ErrorPage } from "./";
import { useState, useEffect } from "react";
import { subscriptionServices } from "../services/index.js";
import { useSelector } from "react-redux";
import { useOutletContext, useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/outline";

const ChannelSubscribers = () => {
    const { userData } = useSelector((state) => state.auth);
    const { userId } = useOutletContext();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await subscriptionServices.getSubscribers(
                    userId,
                    userData?._id
                );
                if (res?.data) setChannels(res.data);
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
                <Loader size="md" message="Loading subscribers..." />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center">
                <ErrorPage
                    title="Oops! Something went wrong!"
                    message="We couldn't load your subscribers right now. Please check your connection and try again."
                    onRetry={() => window.location.reload()}
                    onGoHome={() => navigate("/")}
                />
            </div>
        );

    if (channels.length === 0)
        return (
            <div className="flex mt-25 items-center justify-center">
                <Empty
                    message="No subscribers yet"
                    description="This channel has not gained any subscribers yet."
                    Icon={UsersIcon}
                />
            </div>
        );

    return <ChannelList channels={channels} />;
};

export default ChannelSubscribers;
