import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react'; 
import {Route,Redirect, useHistory} from "react-router-dom";
import Homepage from './homepage';
import UserInfo from '../components/userinfo.js';

export default class Registration extends React.Component{
  constructor() {
    super();
    this.state = {
      input: {email: "",username: "",password: ""},
      errors: {email:'',username:'',password:''},
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
      fetch('create-user', {
        method: "POST",
        body: JSON.stringify(this.state.input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.setState({
        isRedirect: true,
        input: {
          ...this.state.input,
          username: "",
          email: "",
          password: "",
        }
      })
      UserInfo.setName(this.state.username)
      }
    })
  }
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    return axios.get('/create-user').then(response => {
      const data = response.data
      for(let user of data){
        if (user.username === input["username"]){
          errors["username"] = "Username is already taken."
          isValid= false;
        }
        if (user.email === input["email"]){
          errors["email"] = "This email has already been registered with an account."
          isValid= false;
        }
      }
    }).then(()=>{if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }
    if (!input["username"]) {
      isValid = false
      errors["username"] = "Please enter a username.";
    }
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter a password.";
    }
    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    console.log(errors)
    this.setState({
      errors: errors
    });
    if(isValid){
      this.props.onLogin()
    }
  return isValid
  })
}
    


  render(){
    if(this.state.isRedirect){
      return(
      <div>
        <Route path="/homepage" exact component={Homepage} />
        <Redirect from="/" to="/homepage" exact />
      </div>)
    }
    else{
    return (
      <form className="formbg" onSubmit={this.handleSubmit} >
        <h2 className="label-wrapper">
          <label>Sign up!</label>
        </h2>
        <div>
          <input
          autoFocus
          placeholder="email"
          type="email"
          id="email"
          onChange={this.handleChange}
          className="input input__lg"
          name="email"
          autoComplete="off"
          required />
          <div className="text-danger">{this.state.errors.email}</div>
        </div>
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
        <p>Already have an account? Click <a href="/login"> here.</a></p>
      </form>
    );
  }
}
}