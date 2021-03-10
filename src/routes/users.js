import React from 'react';  
export default class registration extends React.Component{
  constructor() {
    super();
    this.state = {
      input: {userID:null,email:null,username:null,password:null,created:null},
      errors: {email:'',username:'',password:''}
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.validate()){
        let input = {};
        input["username"] = "";
        input["email"] = "";
        input["password"] = "";
        this.setState({input:input});
    }
    
  }
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    console.log(input);
    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }
    if (!input["username"]) {
      isValid = false;
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
    
    this.setState({
      errors: errors
    });

    return isValid;
}


  render(){
    return (
      <form action="/create-user" method="POST" onSubmit={this.handleSubmit} >
        <h2 className="label-wrapper">
          <label>Sign up!</label>
        </h2>
        <div>
          <input
          placeholder="email"
          type="text"
          id="email"
          value={this.state.input.email}
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
          value={this.state.input.username}
          onChange={this.handleChange}
          name="username"
          autoComplete="off"
          required/>
        </div>
        <div> 
          <input
          placeholder="password"
          type="text"
          id="passwordReg"
          className="input input__lg"
          value={this.state.input.password}
          onChange={this.handleChange}
          name="password"
          autoComplete="off"
          required/></div>
        <div>
        <button type="submit" className="register btn">
          Submit
        </button>
        </div>
      </form>
    );
  }
}