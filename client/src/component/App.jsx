import React from 'react';
import Navbar from './shared/Navbar.jsx';
import Footer from './shared/Footer.jsx';
import Home from './Homepage/Home.jsx';
import Slide from './Homepage/Slide.jsx';

const App = () => (
    <div>
    <Navbar />
    <Home />
    <Slide />
    <Footer />
    </div>
);

export default App;