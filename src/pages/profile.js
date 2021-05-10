import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../components/comp.css';

export default function Profile({ isClient }) {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        if (isClient) {
            const userID = sessionStorage.getItem('userID')
            console.log(userID)

            axios.post('/users/all-posts', { userID: sessionStorage.getItem('userID') })
                .then(res => setPosts(res.data))

            axios.get(`/users/${userID}`)
                .then(res => setUser(res.data))
        } else {
            axios.post('/users/get-user', { username: username })
                .then(res => {
                    const { userID } = res.data;

                    console.log(userID)

                    axios.get(`/users/${userID}`)
                        .then(res => setUser(res.data))
                
                    axios.post('/users/all-posts', { userID: userID })
                        .then(res => setPosts(res.data))
                })
        }
    }, [])

    if (isClient) {
        // TODO: Allow users to upload a header for their profile
        // TODO: Allow users to set a description for their profile
        // Update 'users' table for both of these
    }

    if (posts.length > 0) {
        return <div>
            <div>
                <img src={user.profileImage} />
            </div>

            <div className="allposts">
                {posts.map((post, index) => {
                    return <div className="each-post" key={index}>
                        <p>{post.content}</p>
                        {post.photourl && <img src={post.photourl} />}
                        <hr className="postborder"/>
                    </div>
                })}
            </div>
        </div>
    } else {
        return <p>No posts :(</p>
    }
}
