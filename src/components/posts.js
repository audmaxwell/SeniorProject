import React from 'react';
import axios from 'axios';
import './comp.css';

import FileUploader from './fileupload';
 
export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state={
            posts : [],
            subject:"",
            file: "",
            imageurl: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPosts()
        }
        getPosts(){
            axios.get('/new-post')
            .then(response =>{
                const data = response.data
                for (let post of data){
                  if(post.photo){
                    console.log(post.photo)
                  }
                }
                console.log(this.state.imageurl)
                this.setState({posts: response.data})
            })
        }
        handleChange(event){
            this.setState({subject:event.target.value})}
          handleSubmit(event){
            event.preventDefault();
            if(this.state.file){

              axios.post("uploads", this.state.file, { 
             })
           .then(res => {
               console.log(res)
               console.log(this.state.imageurl)
            })
           }
            
            axios.post('new-post', {subject: this.state.subject}
            ).then(response => {console.log(response)})
            document.getElementById("postbox").reset();
            this.getPosts()
          }
          
    render(){
        const newFile = (selectedFile) =>{
            this.setState({file: selectedFile})
          }

        return(
            <div className="text-post">
            <div className="form-area">  
                <form id= "postbox" onSubmit={this.handleSubmit}>              
                  <div className="form-group">
                  <textarea className="form-control"
                    onChange={this.handleChange}
                    type="textarea"
                    id="subject"
                    placeholder="Subject" 
                    maxLength="500" 
                    rows="7"></textarea>
                  </div>
                <button type="submit" id="submit" name="submit">Add Post</button>
                <form className = "upload btns" method="POST" action="/uploads" enctype="multipart/form-data">
                  <div>
                      <label>Upload a photo:</label>
                      <input type="file" name="imageupload" />
                  </div>
                  <div>
                      <input type="submit" name="btn_upload_profile_pic" value="Upload" />
                  </div>
              </form>
                </form>
            </div>
            <div className="allposts">
                {this.state.posts.map( (post,index) => 
                <div key = {index} >{post.content}</div>
                )}
        </div>
        </div>
        )
    }
}
