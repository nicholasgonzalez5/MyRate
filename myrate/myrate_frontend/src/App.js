import React from 'react';
import Landing from "./Screens/Landing";
import Discover from "./Screens/Discover";
import Collections from "./Screens/Collections";
import MyStats from "./Screens/MyStats";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Landing /> } />
                <Route path="/discover" element={<Discover />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/mystats" element={<MyStats />} />
            </Routes>
        </Router>
    );
};

export default App;
