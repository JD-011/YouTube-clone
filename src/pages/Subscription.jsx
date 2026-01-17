import { useState, useEffect } from "react";
import {
    ChannelList,
    Header,
    Sidebar,
    Empty,
    Loader,
    ErrorPage,
} from "../components";
import { useSelector } from "react-redux";
import { subscriptionServices } from "../services";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/outline";

const Subscriptions = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await subscriptionServices.getSubscribedChannels(
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
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Loader size="md" message="Loading Channels..." />
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
                                message="We couldn't load the channels right now. Please check your connection and try again."
                                onRetry={() => window.location.reload()}
                                onGoHome={() => navigate("/")}
                            />
                        </div>
                    </section>
                </Sidebar>
            </Header>
        );

    if (channels.length == 0)
        return (
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Empty
                                message="No channels subscribed"
                                description="You have not subscribed to any channels yet."
                                Icon={UsersIcon}
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
                    <ChannelList channels={channels} />
                </section>
            </Sidebar>
        </Header>
    );
};

export default Subscriptions;
