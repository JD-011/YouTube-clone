import React, { useEffect } from "react";
import { Empty, VideoCards, Loader, ErrorPage, Header, Sidebar } from "../components";
import { videoServices } from "../services";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

function Home() {
    const fetchVideos = async ({ pageParam }) => {
        try {
            const [res] = await Promise.all([
                videoServices.getAllVideos(pageParam),
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
        queryKey: ["videos"],
        queryFn: fetchVideos,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000,
        refetchInterval: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ? lastPage.nextPage : null,
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isPending)
        return (
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Loader size="md" message="Loading awesome videos..." />
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
                                onRetry={() => refetch()}
                                onGoHome={() => window.location.reload()}
                            />
                        </div>    
                    </section>             
                </Sidebar>
            </Header>
        );

    if (data.pages[0].docs.length == 0)
        return (
            <Header>
                <Sidebar variant="sticky">
                    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                        <div className="flex h-full items-center justify-center">
                            <Empty
                                message="No videos available"
                                description="There are no videos available here."
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
                        <VideoCards data={data} />
                        <div 
                            ref={ref} 
                            className="w-full flex justify-center py-1"
                        >
                            {isFetchingNextPage && <Loader size="sm" message="Loading more videos..." />}
                        </div>
                    </div>
                </section>   
            </Sidebar>
        </Header>
    )
}

export default Home;
