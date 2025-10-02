// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Layout from './components/layout/Layout';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Streams from './pages/Streams';
// import Categories from './pages/Categories';
// import LiveTV from './pages/LiveTv';
// import Highlights from './pages/Highlights';
// import SocialLinks from './pages/SocialLinks';
// import BaseURLs from './pages/BaseUrls';
// import Announcements from './pages/Announcements';
// import Ads from './pages/Ads';
// import NotFound from './pages/NotFound';
//
// function App() {
//     return (
//         <ThemeProvider>
//             <AuthProvider>
//                 <Router>
//                     <AppRoutes />
//                 </Router>
//             </AuthProvider>
//         </ThemeProvider>
//     );
// }
//
// function AppRoutes() {
//     const { user, loading } = useAuth();
//
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
//             </div>
//         );
//     }
//
//     return (
//         <Routes>
//             <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//             <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
//                 <Route index element={<Dashboard />} />
//                 <Route path="streams" element={<Streams />} />
//                 <Route path="categories" element={<Categories />} />
//                 <Route path="live-tv" element={<LiveTV />} />
//                 <Route path="highlights" element={<Highlights />} />
//                 <Route path="social-links" element={<SocialLinks />} />
//                 <Route path="base-urls" element={<BaseURLs />} />
//                 <Route path="announcements" element={<Announcements />} />
//                 <Route path="ads" element={<Ads />} />
//                 <Route path="*" element={<NotFound />} />
//             </Route>
//         </Routes>
//     );
// }
//
// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Streams from './pages/Streams';
import Categories from './pages/Categories';
import LiveTV from './pages/LiveTv';
import Highlights from './pages/Highlights';
import SocialLinks from './pages/SocialLinks';
import BaseURLs from './pages/BaseUrls';
import Announcements from './pages/Announcements';
import Ads from './pages/Ads';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
                <Route index element={<Dashboard />} />
                <Route path="streams" element={<Streams />} />
                <Route path="categories" element={<Categories />} />
                <Route path="live-tv" element={<LiveTV />} />
                <Route path="highlights" element={<Highlights />} />
                <Route path="social-links" element={<SocialLinks />} />
                <Route path="base-urls" element={<BaseURLs />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="ads" element={<Ads />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
