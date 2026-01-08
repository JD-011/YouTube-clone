import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty, Channel as ChannelComponent, Loader, ErrorPage, Header, Sidebar } from "../components";
import { userServices } from "../services";
import { PlayIcon } from "@heroicons/react/24/outline";

function Channel() {
    const { username } = useParams();
    const { userData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [channel, setChannel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const res = await userServices.getChannelProfile(username, userData?._id);                
                if(res?.data) setChannel(res.data)
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
                            <Loader size="md" message="Loading..." />
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
                                title={error.status == 404 ? "Channel does not exist!" :  "Oops! Something went wrong!"}
                                message={error.status == 404 ? "We couldn't find the channel you're looking for. Please check the username and try again." : "We couldn't load the channel right now. Please check your connection and try again."}
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
                    <ChannelComponent channel={channel} />
                </section>   
            </Sidebar>
        </Header>
    )
}

export default Channel;
