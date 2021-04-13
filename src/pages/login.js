import axios from 'axios';
import React from 'react'; 
import {Route,Redirect, useHistory} from "react-router-dom";
import Homepage from './homepage';

export default class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      input: {username: "",password: ""},
      errors: {username:'',password:''},
      isRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({
      input: {
        ...this.state.input,
        [event.target.name]: event.target.value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.validate().then((isValid)=>{
      if(isValid){
      this.setState({
        isRedirect: true,
        input: {
          ...this.state.input,
          username: "",
          password: "",
        }
      })
      this.props.onLogin()
    }
    })
  }
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    let isMatch = false;

    return axios.get('/create-user').then(response => {
      const data = response.data
      for(let user of data){
        if (user.username === input["username"]){
                isMatch = true;
            if(user.password === input["password"]){
                isValid = true;}   
            else if (user.password !== input["password"]){
                errors["password"] = "Incorrect password."
            }     
        }
      }
    }).then(()=>{
    if (!isMatch){
        errors["username"] = "Username does not exist."
    }
    if (!input["username"]) {
      isValid = false
      errors["username"] = "Please enter a username.";
    }
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter a password.";
    }
    console.log(errors)
    this.setState({
      errors: errors
    });
  return isValid
  })
}
    


  render(){
    if(this.state.isRedirect){
      return(
        <Redirect to="/homepage" exact component = {Homepage}/>)
    }
    else{
    return (
      <form onSubmit={this.handleSubmit} >
        <h2 className="label-wrapper">
          <label>Log in!</label>
        </h2>
        <div>
        <input
          placeholder="username"
          type="text"
          id="usernameReg"
          className="input input__lg"
          onChange={this.handleChange}
          name="username"
          autoComplete="off"
          required/>
           <div className="text-danger">{this.state.errors.username}</div>
        </div>
        <div> 
          <input
          placeholder="password"
          type="password"
          id="passwordReg"
          className="input input__lg"
          onChange={this.handleChange}
          name="password"
          autoComplete="off"
          required/>
           <div className="text-danger">{this.state.errors.password}</div></div>
        <div>
        <button type="submit" className="register btn">
          Submit
        </button>
        </div>
        <p>Don't have an account? Click <a href="/"> here.</a></p>
      </form>
    );
  }
}
}