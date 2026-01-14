import React, { useEffect } from "react";
import {
    Empty,
    VideoCards,
    Loader,
    ErrorPage,
} from "../components";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { videoServices } from "../services";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

function ChannelVideos() {
    const { userId } = useOutletContext();
    const navigate = useNavigate();

    const fetchVideos = async ({ pageParam }) => {
        try {
            const [res] = await Promise.all([
                videoServices.getAllVideos(pageParam, 12, "", "createdAt", "desc", userId),
                new Promise((resolve) => setTimeout(resolve, 1000)),
            ]);
            return res.data;
        } catch (err) {
            console.error("Error fetching videos:", err);
            throw err;
        }
    };

    const {
        isPending,
        error,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["videos", "channel", userId],
        queryFn: fetchVideos,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000,
        refetchInterval: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.nextPage ? lastPage.nextPage : null,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isPending)
        return (
            <div className="flex mt-25 items-center justify-center">
                <Loader size="md" message="Loading videos..." />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center">
                <ErrorPage
                    title="Oops! Something went wrong!"
                    message="We couldn't load the videos right now. Please check your connection and try again."
                    onRetry={() => refetch()}
                    onGoHome={() => navigate("/")}
                />
            </div>
        );

    if (data.pages[0].docs.length == 0)
        return (
            <div className="flex mt-20 items-center justify-center">
                <Empty
                    message="No videos uploaded"
                    description="This page has not uploaded any videos yet. Search another page in order to find more videos."
                    Icon={PlayIcon}
                    BtnText="New Video"
                />
            </div>
        );

    return (
        <div className="w-full">
            <VideoCards data={data} />
            <div ref={ref} className="w-full flex justify-center py-1">
                {isFetchingNextPage && (
                    <Loader size="sm" message="Loading more videos..." />
                )}
            </div>
        </div>
    );
}

export default ChannelVideos;
