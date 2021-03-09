import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Register from './routes/registration';
import Homepage from './routes/homepage';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
function App() {
  useEffect(function(){
    fetch("/ping").then((res)=> res.json()).then(console.log)
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const page = isLoggedIn ?<Homepage/> : <Register onLogin ={()=>setIsLoggedIn(true)}/>;
  console.log(isLoggedIn);
  return (
    <div className="initialScreen">
      <div className="Wrapper">
        <Header/>
      </div>
      <h1>Welcome!</h1>
      {page}
      {/* <Router>
          <Switch>3
            <Route path='/homepage'><Homepage /></Route>
            <Route exact path='/'><Register /></Route>
          </Switch>
      </Router>
      */}
    </div>
  );
}

export default App;
