// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import image from "../../../server/models/image";

// const imageuploader = () => {
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("tags", tags);
//     formData.append("image", image);
    
//     try {
//       await axios.post("http://localhost:5000/api/images", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       navigate("/");
//     } catch (error) {
//       console.error("Upload error:", error);
//       setError("Failed to upload image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2 className="form-title">Upload New Image</h2>
      
//       {error && (
//         <div className="error-message">{error}</div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input
//             type="text"
//             id="title"
//             className="form-input"
//             placeholder="Enter image title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="tags" className="form-label">Tags</label>
//           <input
//             type="text"
//             id="tags"
//             className="form-input"
//             placeholder="Enter tags (comma separated)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="image" className="form-label">Image</label>
//           <input
//             type="file"
//             id="image"
//             className="form-input"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
        
//         {preview && (
//           <div className="preview-container">
//             <p className="form-label">Preview:</p>
//             <img 
//               src={preview} 
//               alt="Preview" 
//               className="preview-image" 
//             />
//           </div>
//         )}
        
//         <button
//           type="submit"
//           disabled={loading}
//           className="submit-button"
//         >
//           {loading ? "Uploading..." : "Upload Image"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default imageuploader;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);
    
    try {
      // Explicitly set the Content-Type header as multipart/form-data
      const response = await axios.post("http://localhost:5000/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false
      });
      
      console.log("Upload successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="form-title">Upload New Image</h2>
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input
            type="text"
            id="tags"
            className="form-input"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            id="image"
            className="form-input"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        
        {preview && (
          <div className="preview-container">
            <p className="form-label">Preview:</p>
            <img 
              src={preview} 
              alt="Preview" 
              className="preview-image" 
            />
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;