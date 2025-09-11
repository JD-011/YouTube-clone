function App() {
    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            {/* <Login /> */}
            {/* <Register /> */}
            <Header />
            {/* don't forget to wrap Sidebar and other components in a div */}
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <Sidebar variant="sticky" />
                {/* don't forget to wrap Channel and other components in a section */}
                {/* be careful about when to use "relative" class in <section> */}
                <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    {/* <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
                        <Playlist />
                        <VideoList />
                    </div> */}
                    <Channel />
                    {/* <AddTweet /> */}
                    {/* <Tweets /> */}
                    <Empty
                        message="No Tweets"
                        description="This channel has not yet made a Tweet."
                        Icon={UsersIcon}
                    />
                    {/* <Subscribed /> */}
                    {/* <UploadVideo /> */}
                    {/* <UploadingVideo /> */}
                    {/* <VideoUploaded /> */}
                    {/* <EditInfo /> */}
                    {/* <EditPersonalInfo /> */}
                    {/* <EditChannelInfo /> */}
                    {/* <ChangePass /> */}
                </section>
            </div>
            <div className="relative flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                {/* <Dashboard /> */}
                {/* <EditVideo /> */}
                {/* <DeleteVideo /> */}
            </div>
            {/* <PrivacyPolicy /> */}
            {/* <TC /> */}
        </div>
    );
}

const Empty = ({ message, description, Icon, BtnText }) => {
    const isOwner = true; // This should be determined by your application logic
    return (
        <div className="px-4 pb-4">
            <div className="flex justify-center p-4">
                <div className="w-full max-w-sm text-center">
                    <p className="mb-3 w-full">
                        <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                            <Icon className="w-6" />
                        </span>
                    </p>
                    <h5 className="mb-2 font-semibold">{message}</h5>
                    <p>{description}</p>
                    {isOwner && BtnText && (
                        <button className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                            <PlusIcon className="h-5 w-5" strokeWidth={2} />{BtnText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};