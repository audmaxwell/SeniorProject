import React from 'react';
import axios from 'axios';
import './comp.css';

export default class AddPost extends React.Component {
  constructor() {
    super();
    this.state = {
      subject:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

    handleChange(event){
      this.setState({subject:event.target.value})
      console.log(this.state.subject)}
    handleSubmit(event){
      event.preventDefault();
      console.log(this.state.subject)
      axios.post('new-post', {subject: this.state.subject}).then(response => {console.log(response)})
      document.getElementById("postbox").reset();
    }
    
    render(){
        return(
        <div className="text_post">
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
              <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
        )
    }
    
}
