import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(function(){
    fetch("/ping").then((res)=> res.json()).then(console.log)
  });
  return (
    <div className="initialScreen">
      <h1>Welcome!</h1>
      <form action="/create-user" method="POST">
        <h2 className="label-wrapper">
          <label htmlFor="loginInput" className="label__userlog">
            Sign up
          </label>
        </h2>
        <input
          placeholder="email"
          type="text"
          id="emailReg"
          className="input input__lg"
          name="text"
          autoComplete="off"
          required
        />
        <div>
        <input
          placeholder="username"
          type="text"
          id="usernameReg"
          className="input input__lg"
          name="text"
          autoComplete="off"
          required
        />
        </div>
        <div>
        <input
          placeholder="password"
          type="text"
          id="passwordReg"
          className="input input__lg"
          name="text"
          autoComplete="off"
          required
        />
        </div>
        <div>
        <button type="submit" className="btn btn__primary btn__lg">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default App;
