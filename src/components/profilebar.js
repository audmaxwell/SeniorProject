import React from 'react';
import './comp.css';
import {Link} from "react-router-dom";
import axios from 'axios';

export default function ProfileBar() {
  const [profileImage, setProfileImage] = React.useState()
  const imageUploader = React.useRef(null);
  const formRef = React.useRef();

  React.useEffect(() => {
    const userID = sessionStorage.getItem('userID')

    axios.get(`/users/${userID}`)
      .then(res => setProfileImage(res.data.profileImage))
  }, [])

  const onClick = () => {
    imageUploader.current.click()
  }

  const handleImageUpload = e => {
    const formData = new FormData(formRef.current)

    axios.post('/uploads', formData)
      .then((res) => {
        const url = res.data;

        console.log(url)
        
        setProfileImage(url)
        
        axios.post('/users/update-profile-image', { 
          userID: sessionStorage.getItem('userID'),
          profileImage: res.data
        })
      })
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
        <form ref={formRef} onChange={handleImageUpload}>
          <input
            type="file"
            name="imageupload"
            accept="image/*"
            ref={imageUploader}
            style={{
              display: "none"
            }}
          />
        </form>

        <div className="pfpcont">
          <a href="#" onClick={onClick}>
            <img
              src={profileImage}
              className="pfp"
            />
          </a>
        </div>
        <p><a href="#" onClick={onClick}>Click to upload Image</a></p>

        <Link to="/profile" >My Profile</Link>
      </div>
    </div>
    


  );
  }
 
  