import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import '../components/comp.css';

export default function Profile({ isClient }) {
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        if (isClient) {
            axios.post('/user/all-posts', { userID: sessionStorage.getItem('userID') })
                .then(res => setPosts(res.data))
        } else {
            axios.post('/user/get-user', { username: username })
                .then(res => axios.post('/user/all-posts', { userID: res.data.userID }))
                .then(res => setPosts(res.data))
        }
    }, [])

    if (isClient) {
        // TODO: Allow users to upload a header for their profile
        // TODO: Allow users to set a description for their profile
        // Update 'users' table for both of these
    }

    if (posts.length > 0) {
        return <div>
            <div className="allposts">
                {posts.reverse().map((post, index) => {
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
