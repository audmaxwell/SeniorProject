import React from 'react';
import axios from 'axios';
import './comp.css';
 
export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state={ posts : [] };

        axios.get('/new-post')
            .then(response =>{
                const post = response.data[1]
                this.setState({posts: response.data})
                console.log(post)
            })
            .then(posts => {
                
            })
        }
          
    render(){

        return(
            <div className="allposts">
                {this.state.posts.map( (post,index) => 
                <div key = {index}>{post.content}</div>
                )}
        </div>
        )
    }
}
