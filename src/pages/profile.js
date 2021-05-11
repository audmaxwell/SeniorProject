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

    if (posts.length > 0) {
        return <div>
            <div>
                <img src={user.profileImage} width={300} />
                
                <p>{user.profileDescription}</p>
            </div>

            <div className="allposts">
                {posts.map((post, index) => <div key={index} className="each-post">
                    {post.content}
                    <p>{post.userID}</p>
                    {post.photourl && <img src={post.photourl} width={500} />}
                    <hr className="postborder" />
                </div>)}
            </div>
        </div>
    } else {
        return <p>No posts :(</p>
    }
}
