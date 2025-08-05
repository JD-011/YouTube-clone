import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Subscribed = () => {
    // this is just for demo you have to fetch all of this from your backend
    const videos = [
        {
            id: "1",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "JavaScript Fundamentals: Variables and Data Types",
            description:
                "Learn the basics of JavaScript, including variables, data types, and how to use them in your programs.",
            duration: "20:45",
            views: "10.3k",
            isPublished: true,
            time: "44 minutes ago",
            createdAt: "2023-09-22T09:54:42.381Z",
            owner: {
                id: "1",
                username: "codemaster",
                fullName: "Code Master",
                avatar: "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 921,
            dislikeCount: 49,
        },
        {
            id: "2",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/3532553/pexels-photo-3532553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "React Hooks Explained: useState and useEffect",
            description:
                "Dive into the world of React hooks and understand how to use useState and useEffect in your components.",
            duration: "15:32",
            views: "8.7k",
            isPublished: false,
            time: "1 hour ago",
            createdAt: "2023-09-21T09:54:42.381Z",
            owner: {
                id: "2",
                username: "reactninja",
                fullName: "React Ninja",
                avatar: "https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2520,
            dislikeCount: 279,
        },
        {
            id: "3",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/3532555/pexels-photo-3532555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Mastering Async Await in JavaScript",
            description:
                "Learn how to work with asynchronous JavaScript using the async/await syntax for cleaner and more readable code.",
            duration: "25:10",
            views: "12.5k",
            isPublished: false,
            time: "2 hours ago",
            createdAt: "2023-09-20T09:54:42.381Z",
            owner: {
                id: "3",
                username: "asyncmasters",
                fullName: "Async Masters",
                avatar: "https://images.pexels.com/photos/3532549/pexels-photo-3532549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 943,
            dislikeCount: 244,
        },
        {
            id: "4",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/3532550/pexels-photo-3532550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Building a ToDo App with React and Context API",
            description:
                "Create a simple ToDo application using React and manage state with the Context API for global data.",
            duration: "30:22",
            views: "15.4k",
            isPublished: false,
            time: "3 hours ago",
            createdAt: "2023-09-19T09:54:42.381Z",
            owner: {
                id: "4",
                username: "codecrafters",
                fullName: "Code Crafters",
                avatar: "https://images.pexels.com/photos/2522659/pexels-photo-2522659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 760,
            dislikeCount: 302,
        },
        {
            id: "5",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/2522660/pexels-photo-2522660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Responsive Web Design with Tailwind CSS",
            description:
                "Explore the power of Tailwind CSS and build a responsive website from scratch.",
            duration: "18:56",
            views: "9.8k",
            isPublished: false,
            time: "4 hours ago",
            createdAt: "2023-09-18T09:54:42.381Z",
            owner: {
                id: "5",
                username: "tailwindpro",
                fullName: "Tailwind Pro",
                avatar: "https://images.pexels.com/photos/2519823/pexels-photo-2519823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2630,
            dislikeCount: 317,
        },
        {
            id: "6",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Getting Started with Express.js",
            description:
                "Learn the basics of building web applications with Node.js and Express.js framework.",
            duration: "22:18",
            views: "11.k",
            isPublished: true,
            time: "5 hours ago",
            createdAt: "2023-09-17T09:54:42.381Z",
            owner: {
                id: "6",
                username: "expresslearner",
                fullName: "Express Learner",
                avatar: "https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 137,
            dislikeCount: 107,
        },
        {
            id: "7",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/7775641/pexels-photo-7775641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "State Management with Redux",
            description:
                "Learn how to manage global state in your React applications using Redux.",
            duration: "27:50",
            views: "13.8k",
            isPublished: false,
            time: "6 hours ago",
            createdAt: "2023-09-16T09:54:42.381Z",
            owner: {
                id: "7",
                username: "reduxmaster",
                fullName: "Redux Master",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1250,
            dislikeCount: 386,
        },
        {
            id: "8",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Building a RESTful API with Node.js and Express",
            description:
                "Learn how to create a RESTful API using Node.js and the Express framework for building web applications.",
            duration: "24:33",
            views: "14.5k",
            isPublished: true,
            time: "7 hours ago",
            createdAt: "2023-09-15T09:54:42.381Z",
            owner: {
                id: "8",
                username: "apibuilder",
                fullName: "API Builder",
                avatar: "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2773,
            dislikeCount: 50,
        },
        {
            id: "9",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Introduction to React Native",
            description:
                "Discover how to build mobile applications using React Native for both Android and iOS platforms.",
            duration: "19:58",
            views: "10.9k",
            isPublished: true,
            time: "8 hours ago",
            createdAt: "2023-09-14T09:54:42.381Z",
            owner: {
                id: "9",
                username: "reactnativedev",
                fullName: "React Native Dev",
                avatar: "https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1346,
            dislikeCount: 353,
        },
        {
            id: "10",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Creating Custom Hooks in React",
            description:
                "Learn how to create and use custom hooks to share logic across multiple React components.",
            duration: "16:37",
            views: "9.3k",
            isPublished: true,
            time: "9 hours ago",
            createdAt: "2023-09-13T09:54:42.381Z",
            owner: {
                id: "10",
                username: "hookmaster",
                fullName: "Hook Master",
                avatar: "https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1578,
            dislikeCount: 294,
        },
        {
            id: "11",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144259/pexels-photo-1144259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Advanced CSS: Flexbox and Grid Layouts",
            description:
                "Dive deep into CSS layout techniques with Flexbox and Grid for modern and responsive web design.",
            duration: "28:15",
            views: "16.7k",
            isPublished: false,
            time: "10 hours ago",
            createdAt: "2023-09-12T09:54:42.381Z",
            owner: {
                id: "11",
                username: "csswizard",
                fullName: "CSS Wizard",
                avatar: "https://images.pexels.com/photos/1144261/pexels-photo-1144261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2506,
            dislikeCount: 87,
        },
        {
            id: "12",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144265/pexels-photo-1144265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Introduction to Python Programming",
            description:
                "Get started with Python, a versatile and powerful programming language for beginners and professionals.",
            duration: "26:50",
            views: "17.8k",
            isPublished: false,
            time: "11 hours ago",
            createdAt: "2023-09-11T09:54:42.381Z",
            owner: {
                id: "12",
                username: "pythonista",
                fullName: "Pythonista",
                avatar: "https://images.pexels.com/photos/1144268/pexels-photo-1144268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1312,
            dislikeCount: 399,
        },
        {
            id: "13",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Building Scalable Web Applications with Django",
            description:
                "Learn how to build robust and scalable web applications using the Django framework for Python.",
            duration: "32:18",
            views: "18.9M",
            isPublished: true,
            time: "12 hours ago",
            createdAt: "2023-09-10T09:54:42.381Z",
            owner: {
                id: "13",
                username: "djangomaster",
                fullName: "Django Master",
                avatar: "https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 553,
            dislikeCount: 219,
        },
        {
            id: "14",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144263/pexels-photo-1144263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Deep Dive into Machine Learning Algorithms",
            description:
                "Explore the inner workings of popular machine learning algorithms and their applications.",
            duration: "34:22",
            views: "19K",
            isPublished: false,
            time: "13 hours ago",
            createdAt: "2023-09-09T09:54:42.381Z",
            owner: {
                id: "14",
                username: "mlgeek",
                fullName: "ML Geek",
                avatar: "https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2061,
            dislikeCount: 359,
        },
        {
            id: "15",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Creating Interactive UIs with React and D3",
            description:
                "Learn how to build dynamic and interactive user interfaces with React and the D3.js data visualization library.",
            duration: "29:30",
            views: "20.1k",
            isPublished: true,
            time: "14 hours ago",
            createdAt: "2023-09-08T09:54:42.381Z",
            owner: {
                id: "15",
                username: "reactd3",
                fullName: "ReactD3",
                avatar: "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1165,
            dislikeCount: 10,
        },
        {
            id: "16",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Node.js Authentication with Passport.js",
            description:
                "Learn how to implement user authentication in Node.js applications using the Passport.js middleware.",
            duration: "26:58",
            views: "21.2k",
            isPublished: true,
            time: "15 hours ago",
            createdAt: "2023-09-07T09:54:42.381Z",
            owner: {
                id: "16",
                username: "passportpro",
                fullName: "Passport Pro",
                avatar: "https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1812,
            dislikeCount: 347,
        },
        {
            id: "17",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144280/pexels-photo-1144280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Creating RESTful APIs with Django Rest Framework",
            description:
                "Learn how to build RESTful APIs with Django Rest Framework for building web applications.",
            duration: "30:42",
            views: "22.3k",
            isPublished: false,
            time: "16 hours ago",
            createdAt: "2023-09-06T09:54:42.381Z",
            owner: {
                id: "17",
                username: "djangorestapi",
                fullName: "Django Rest API",
                avatar: "https://images.pexels.com/photos/1144235/pexels-photo-1144235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1698,
            dislikeCount: 159,
        },
        {
            id: "18",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144282/pexels-photo-1144282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Advanced JavaScript: Closures and Prototypes",
            description:
                "Dive deep into JavaScript concepts like closures and prototypes for more advanced programming.",
            duration: "35:28",
            views: "23.4k",
            isPublished: false,
            time: "17 hours ago",
            createdAt: "2023-09-05T09:54:42.381Z",
            owner: {
                id: "18",
                username: "jsninja",
                fullName: "JS Ninja",
                avatar: "https://images.pexels.com/photos/1144232/pexels-photo-1144232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2393,
            dislikeCount: 146,
        },
        {
            id: "19",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Data Visualization with Tableau",
            description:
                "Learn how to create stunning visualizations and dashboards using Tableau for data analysis.",
            duration: "32:14",
            views: "24.5k",
            isPublished: true,
            time: "18 hours ago",
            createdAt: "2023-09-04T09:54:42.381Z",
            owner: {
                id: "19",
                username: "tableaumaster",
                fullName: "Tableau Master",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2137,
            dislikeCount: 280,
        },
        {
            id: "20",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Building Real-Time Applications with Socket.IO",
            description:
                "Learn how to create real-time applications using Socket.IO for seamless communication between clients and servers.",
            duration: "27:37",
            views: "25.6k",
            isPublished: true,
            time: "19 hours ago",
            createdAt: "2023-09-03T09:54:42.381Z",
            owner: {
                id: "20",
                username: "socketioexpert",
                fullName: "Socket.IO Expert",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2991,
            dislikeCount: 155,
        },
        {
            id: "21",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1144251/pexels-photo-1144251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "GraphQL: Building APIs with Query Language",
            description:
                "Learn how to build efficient APIs using GraphQL and leverage the power of query language for data retrieval.",
            duration: "29:48",
            views: "26.7k",
            isPublished: false,
            time: "20 hours ago",
            createdAt: "2023-09-02T09:54:42.381Z",
            owner: {
                id: "21",
                username: "graphqlpro",
                fullName: "GraphQL Pro",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1095,
            dislikeCount: 359,
        },
        {
            id: "22",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1115890/pexels-photo-1115890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Full-Stack Development with MERN",
            description:
                "Master full-stack development with the MERN (MongoDB, Express, React, Node.js) stack.",
            duration: "33:15",
            views: "27.8k",
            isPublished: false,
            time: "21 hours ago",
            createdAt: "2023-09-01T09:54:42.381Z",
            owner: {
                id: "22",
                username: "mernstack",
                fullName: "MERN Stack",
                avatar: "https://images.pexels.com/photos/1115822/pexels-photo-1115822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 2375,
            dislikeCount: 152,
        },
        {
            id: "23",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Advanced CSS: Animations and Transitions",
            description:
                "Learn how to create captivating animations and transitions using CSS for dynamic web experiences.",
            duration: "31:55",
            views: "28.9k",
            isPublished: true,
            time: "22 hours ago",
            createdAt: "2023-08-31T09:54:42.381Z",
            owner: {
                id: "23",
                username: "cssanimations",
                fullName: "CSS Animations",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 904,
            dislikeCount: 324,
        },
        {
            id: "24",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1115821/pexels-photo-1115821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Machine Learning for Image Recognition",
            description:
                "Dive into the world of image recognition using machine learning models for object detection.",
            duration: "36:40",
            views: "29M",
            isPublished: false,
            time: "23 hours ago",
            createdAt: "2023-08-30T09:54:42.381Z",
            owner: {
                id: "24",
                username: "mlimage",
                fullName: "ML Image",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 912,
            dislikeCount: 97,
        },
        {
            id: "25",
            videoFile: "",
            thumbnail:
                "https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Advanced React Patterns",
            description:
                "Explore advanced patterns and techniques for building scalable and maintainable React applications.",
            duration: "30:25",
            views: "30.1k",
            isPublished: true,
            time: "1 day ago",
            createdAt: "2023-08-29T09:54:42.381Z",
            owner: {
                id: "25",
                username: "reactpatterns",
                fullName: "React Patterns",
                avatar: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            likeCount: 1391,
            dislikeCount: 319,
        },
    ];
    const channels = videos.map((video, i) => ({
        ...video.owner,
        subscribers: 20 * (i + 1) + "K",
        isSubscribed: i % 2 == 0,
    }));
    return (
        <div className="px-4 pb-4">
            <div className="flex flex-col gap-y-4 py-4">
                <div className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                        <MagnifyingGlassIcon
                            className="h-5 w-5"
                            strokeWidth={2}
                        />
                    </span>
                    <input
                        className="w-full bg-transparent outline-none"
                        placeholder="Search"
                    />
                </div>

                {channels.map((channel, i) => (
                    <div
                        className="flex w-full justify-between"
                        key={channel.id + "-" + i}
                    >
                        <div className="flex items-center gap-x-2">
                            <div className="h-14 w-14 shrink-0">
                                <img
                                    src={channel.avatar}
                                    alt={channel.fullName}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            <div className="block">
                                <h6 className="font-semibold">
                                    {channel.fullName}
                                </h6>
                                <p className="text-sm text-gray-300">
                                    {channel.subscribers}&nbsp;Subscribers
                                </p>
                            </div>
                        </div>
                        <div className="block">
                            <button
                                className={
                                    "group/btn px-3 py-2 text-black" +
                                    ` ${
                                        channel.isSubscribed
                                            ? "bg-[#ae7aff] focus:bg-white"
                                            : "bg-white focus:bg-[#ae7aff]"
                                    }`
                                }
                            >
                                <span className="group-focus/btn:hidden">
                                    {channel.isSubscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </span>
                                <span className="hidden group-focus/btn:inline">
                                    {!channel.isSubscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribed;
