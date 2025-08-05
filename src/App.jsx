import React, { useState, useEffect } from "react";
import userServices from "./Services/user.js";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import VideoCards from "./components/VideoCards.jsx";
import VideoList from "./components/VideoList.jsx";
import Video from "./components/Video.jsx";
import Channel from "./components/Channel.jsx";
import Empty from "./components/Empty.jsx";
import { PlayIcon, UsersIcon } from "@heroicons/react/24/outline";
import Playlists from "./components/Playlists.jsx";
import Playlist from "./components/PlayList.jsx";
import Tweets from "./components/Tweets.jsx";
import Subscribed from "./components/Subscribed.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import UploadingVideo from "./components/UploadingVideo.jsx";
import VideoUploaded from "./components/VideoUploaded.jsx";
import AddTweet from "./components/AddTweet.jsx";
import EditInfo from "./components/EditInfo.jsx";
import EditPersonalInfo from "./components/EditPersonalInfo.jsx";
import EditChannelInfo from "./components/EditChannelInfo.jsx";
import ChangePass from "./components/ChangePass.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TC from "./components/TC.jsx";

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

export default App;
