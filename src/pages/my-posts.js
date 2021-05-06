import axios from 'axios';
import React from 'react';
import '../components/comp.css';

export default class MyPosts extends React.Component{
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }

    getPosts(){
        axios.get('/new-post').then(response =>{
            const userID = sessionStorage.getItem("userID");

            const posts = response.data.filter(post => {
                return post.userID == userID;
            })

            console.log(posts);

            this.setState({
                posts: posts
            })
        })
    }

    render() {
        return <div className="allposts">
            {this.state.posts.map((post, index) => {
                return <div className="each-post" key={index}>
                    <p>{post.content}</p>
                    {post.photourl && <img src={post.photourl} />}
                    <p>userID: {post.userID}</p>
                    <hr className="postborder"/>
                </div>
            })}
        </div>
    }

    componentDidMount() {
        this.getPosts()
    }
}