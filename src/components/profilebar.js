import React from 'react';
import './comp.css';
import {Link} from "react-router-dom";
import axios from 'axios';

export default function ProfileBar() {
  const [profileImage, setProfileImage] = React.useState()
  const [profileDescription, setProfileDescription] = React.useState("")
  const [wereChangesSaved, setWereChangesSaved] = React.useState(false)
  const imageUploader = React.useRef();
  const formRef = React.useRef();

  React.useEffect(() => {
    const userID = sessionStorage.getItem('userID')

    axios.get(`/users/${userID}`)
      .then(res => {
        const { profileImage, profileDescription } = res.data;

        setProfileImage(profileImage)
        setProfileDescription(profileDescription)
      })
  }, [])

  const onClick = () => {
    imageUploader.current.click()
  }

  const onSubmit = e => {
    e.preventDefault();

    const userID = sessionStorage.getItem('userID');
    const formData = new FormData(formRef.current);

    const imageupload = formData.get('imageupload')
    if (imageupload !== "") {
      console.log('updating pfp...')
      
      axios.post('/uploads', formData)
        .then((res) => {
          const url = res.data;

          console.log(url)

          setProfileImage(url)

          axios.post('/users/update-profile-image', { 
            userID: userID,
            profileImage: res.data
          })
        })

      setWereChangesSaved(true)
    }
    
    const description = formData.get('description')
    if (description !== profileDescription) {
      console.log('updating description...')
      
      axios.post('/users/update-profile-description', {
        userID: userID,
        profileDescription: description
      })
      
      setWereChangesSaved(true)
    }
  }

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
        <div className="pfpcont">
          <a href="#" onClick={onClick}>
            <img
              src={profileImage}
              className="pfp"
            />
          </a>
        </div>

        <form ref={formRef} onSubmit={onSubmit}>
          <input
            type="file"
            name="imageupload"
            accept="image/*"
            ref={imageUploader}
          />

          <input
            type="text"
            name="description"
            placeholder="Profile description"
            defaultValue={profileDescription}
          />

          <input type="submit" value="Update" />
          
          {wereChangesSaved && <p>Changes save!</p>}
        </form>

        <Link to="/profile" >My Profile</Link>
      </div>
    </div>
  );
  }
 
  