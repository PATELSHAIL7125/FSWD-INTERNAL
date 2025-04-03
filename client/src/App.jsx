// import React from 'react'
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// const App = () => {
//   const cld = new Cloudinary({ cloud: { cloudName: 'dqitngqvn' } });
  
//   // Use this sample image or upload your own via the Media Explorer
//   const img = cld
//         .image('cld-sample-5')
//         .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
//         .quality('auto')
//         .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

//   return (<AdvancedImage cldImg={img}/>);
// };

// export default App

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImageUpload from "./components/imageuploader";
import ImageGallery from "./components/ImageGallary";
import React from "react";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Image Gallery web</h1>
            <nav className="nav-links">
              <Link to="/" className="nav-link">Gallery</Link>
              <Link to="/upload" className="nav-button">Upload Image</Link>
            </nav>
          </div>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ImageGallery />} />
            <Route path="/upload" element={<ImageUpload />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Image Gallery App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
