import { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Using a try-catch to handle potential network errors
        const res = await axios.get("http://localhost:5000/api/images");
        setImages(res.data);
        setFilteredImages(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []);
  
  useEffect(() => {
    if (tag.trim() === "") {
      setFilteredImages(images);
    } else {
      const filtered = images.filter(img => 
        img.tags && img.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
      setFilteredImages(filtered);
    }
  }, [tag, images]);

  return (
    <div className="gallery-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          aria-label="Search images by tag"
        />
        <svg 
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      {loading ? (
        <div className="loading-message">Loading images...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredImages.length === 0 ? (
        <div className="empty-message">
          {tag ? `No images found with tag "${tag}"` : "No images available"}
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredImages.map((img) => (
            <div key={img._id || img.id} className="gallery-item">
              <img 
                src={img.url} 
                alt={img.title} 
                className="gallery-image" 
              />
              <div className="gallery-info">
                <h3 className="gallery-title">{img.title}</h3>
                <div className="gallery-tags">
                  {img.tags && img.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;