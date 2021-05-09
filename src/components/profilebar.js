import React from 'react';
import './comp.css';
import {Link} from "react-router-dom";

export default function ProfileBar() {
 const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profilecont">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        className="pfpcont"
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          className="pfp"
        />
      </div>
      <p>Click to upload Image</p>
    <Link to="/profile" >My Profile</Link>
    </div>
    </div>
    


  );
  }
 
  