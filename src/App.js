import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Registration from './pages/registration';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Profile from './pages/profile';
import {Redirect,Switch,BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  useEffect(function(){
    fetch("/ping").then((res)=> res.json()).then(console.log)
  });

  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("userID"))

  const logout = () => {
    sessionStorage.clear("userID")
    setIsLoggedIn(false)
  }

  let homepage
  if (isLoggedIn) {
    homepage = <Homepage />
  } else {
    homepage = <Registration onLogin={() => setIsLoggedIn(true) } />
  }

  return (
    <div className="initialScreen">
      <div className="Wrapper">
        <Header/>
      </div>

      <h1>Welcome!</h1>

      <button onClick={logout}>Logout</button>

      <Router>
          <Switch>
            {isLoggedIn && <Route exact path='/profile'><Profile isClient /></Route>}
            <Route path='/profile/:username'><Profile /></Route>
            <Route path='/login'><Login onLogin = {() => setIsLoggedIn(true) }/></Route>
            <Route path='/'>{homepage}</Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
