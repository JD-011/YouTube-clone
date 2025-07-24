import React, { useState, useEffect } from 'react';
import userServices from "./Services/user.js";

// --- Main App Component for API Testing ---
function App() {
    // State to manage user data and authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // State for form inputs
    const [formData, setFormData] = useState({
        // For register/login/update
        fullName: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        // For change password
        oldPassword: 'password123',
        newPassword: 'newpassword456',
        // For file uploads
        avatar: null,
        coverImage: null,
        // For channel profile
        channelUsername: 'itachi',
    });

    // State for API feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    // --- Utility Functions ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const executeApiCall = async (apiFunction, ...args) => {
        setLoading(true);
        setError('');
        setApiResponse(null);
        try {
            const response = await apiFunction(...args);
            setApiResponse(response);
            // After successful login/getUser, update user state
            if (apiFunction === userServices.login || apiFunction === userServices.getUser) {
                if (response?.data?.user) {
                    setCurrentUser(response.data.user);
                    setIsLoggedIn(true);
                }
            }
            // After logout, clear user state
            if (apiFunction === userServices.logout) {
                setCurrentUser(null);
                setIsLoggedIn(false);
            }
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
            setApiResponse(err.response?.data || err.toJSON());
        } finally {
            setLoading(false);
        }
    };

    // --- API Handlers ---
    const handleRegister = () => {
        const registerData = new FormData();
        registerData.append('fullName', formData.fullName);
        registerData.append('username', formData.username);
        registerData.append('email', formData.email);
        registerData.append('password', formData.password);
        if (formData.avatar) registerData.append('avatar', formData.avatar);
        if (formData.coverImage) registerData.append('coverImage', formData.coverImage);
        executeApiCall(userServices.register, registerData);
    };

    const handleLogin = () => {
        const loginData = { email: formData.email, password: formData.password };
        executeApiCall(userServices.login, loginData);
    };

    const handleChangePassword = () => {
        const passwordData = { oldPassword: formData.oldPassword, newPassword: formData.newPassword };
        executeApiCall(userServices.change_password, passwordData);
    };

    const handleUpdateDetails = () => {
        const detailsData = { fullName: formData.fullName, email: formData.email };
        executeApiCall(userServices.update_account_details, detailsData);
    };

    const handleUpdateAvatar = () => {
        const avatarData = new FormData();
        if (formData.avatar) {
            avatarData.append('avatar', formData.avatar);
            executeApiCall(userServices.update_image, avatarData);
        } else {
            setError("Please select an avatar file first.");
        }
    };

    const handleGetChannelProfile = () => {
        executeApiCall(userServices.get_channel_profile, formData.channelUsername);
    };

    // Check login status on initial component mount
    useEffect(() => {
        executeApiCall(userServices.getUser);
    }, []);

    // --- JSX Render ---
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <header style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
                <h1>API Testing Dashboard</h1>
                <div>
                    <strong>Status:</strong> {isLoggedIn ? `Logged In as ${currentUser?.username}` : 'Logged Out'}
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
                {/* --- Authentication Section --- */}
                <section style={sectionStyle}>
                    <h2>Authentication</h2>
                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" style={inputStyle} />
                    <input name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" style={inputStyle} />
                    <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" style={inputStyle} />
                    <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" style={inputStyle} />
                    <label>Avatar:</label><input name="avatar" type="file" onChange={handleFileChange} style={inputStyle} />
                    <label>Cover Image:</label><input name="coverImage" type="file" onChange={handleFileChange} style={inputStyle} />
                    <button onClick={handleRegister} style={buttonStyle}>Register</button>
                    <button onClick={handleLogin} style={buttonStyle}>Login</button>
                    <button onClick={() => executeApiCall(userServices.logout)} style={buttonStyle}>Logout</button>
                    <button onClick={() => executeApiCall(userServices.refresh_token)} style={buttonStyle}>Refresh Token</button>
                </section>

                {/* --- User Account Section --- */}
                <section style={sectionStyle}>
                    <h2>User Account</h2>
                    <input name="oldPassword" type="password" value={formData.oldPassword} onChange={handleInputChange} placeholder="Old Password" style={inputStyle} />
                    <input name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} placeholder="New Password" style={inputStyle} />
                    <button onClick={handleChangePassword} style={buttonStyle}>Change Password</button>
                    <hr style={hrStyle} />
                    <button onClick={() => executeApiCall(userServices.getUser)} style={buttonStyle}>Get Current User</button>
                    <button onClick={handleUpdateDetails} style={buttonStyle}>Update Account (Name/Email)</button>
                    <button onClick={handleUpdateAvatar} style={buttonStyle}>Update Avatar</button>
                </section>

                {/* --- Channel & History Section --- */}
                <section style={sectionStyle}>
                    <h2>Channel & History</h2>
                    <input name="channelUsername" value={formData.channelUsername} onChange={handleInputChange} placeholder="Channel Username" style={inputStyle} />
                    <button onClick={handleGetChannelProfile} style={buttonStyle}>Get Channel Profile</button>
                    <hr style={hrStyle} />
                    <button onClick={() => executeApiCall(userServices.get_watch_history)} style={buttonStyle}>Get Watch History</button>
                </section>
            </div>

            {/* --- API Response Viewer --- */}
            <footer style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #333' }}>
                <h2>API Response</h2>
                {loading && <p>Loading...</p>}
                {error && <pre style={{ color: 'red', ...preStyle }}>Error: {error}</pre>}
                {apiResponse && <pre style={preStyle}>{JSON.stringify(apiResponse, null, 2)}</pre>}
            </footer>
        </div>
    );
}

// --- Basic Styles ---
const sectionStyle = { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px 15px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' };
const preStyle = { background: '#f4f4f4', padding: '15px', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' };
const hrStyle = { width: '100%', border: 'none', borderTop: '1px solid #eee', margin: '10px 0' };

export default App;
