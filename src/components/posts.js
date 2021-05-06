import React from 'react';
import axios from 'axios';
import './comp.css';
import UserInfo from './userinfo.js';
 
export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state={
            posts : [],
            subject:"",
            userID: "",
            imageurl: "" };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if(this.state.imageurl === ""){
          this.getPosts()
        }
       
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
                
                this.setState({posts: response.data})
            })
            console.log(UserInfo.getUserID())             
        }
        handleFileChange(event){
          event.preventDefault()
          const data = new FormData(this.myRef.current)
          fetch('uploads', {
            method: "POST",
            body: data,
          }).then((res)=> res.json()).then(res => {this.setState({imageurl:res},()=>{console.log(this.state.imageurl)})})}
        handleChange(event){
            this.setState({subject:event.target.value})
          console.log(this.state.subject)}
        handleSubmit(event){
            event.preventDefault();
            const uid = UserInfo.getUserID()
            console.log(uid)
            this.setState({ userID: uid }, 
              ()=>{console.log(this.state.userID)});
            console.log(this.state.userID)
            const info = [this.state.subject,this.state.imageurl,uid]
            console.log(info)
            fetch('new-post', {
              method: "POST",
              body: JSON.stringify(info),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(() => {console.log("why")
              document.getElementById("postbox").reset()
              this.setState({subject: ""})
              this.setState({imageurl: ""})
            this.getPosts()})
            
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
                </form>
                <form ref={this.myRef} className = "upload btns" onChange = {this.handleFileChange} onSubmit={this.onFileSubmit} encType="multipart/form-data">
                  <div>
                      <label>Upload a photo:</label>
                      <input type="file" name="imageupload" />
                  </div>
              </form>
            </div>
            <div className="allposts">
                {this.state.posts.slice(0).reverse().map( (post,index) => 
                <div className="each-post" key = {index} >
                {post.content} 
                <img src={post.photourl} width="500"/>
                <hr className="postborder"/></div>

                )}
        </div>
        </div>
        )
    }
}
