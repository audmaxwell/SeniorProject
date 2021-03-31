import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Registration from './pages/registration';
import Homepage from './pages/homepage';
import {Switch,BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  useEffect(function(){
    fetch("/ping").then((res)=> res.json()).then(console.log)
  });
  return (
    <div className="initialScreen">
      <div className="Wrapper">
        <Header/>
      </div>
      <h1>Welcome!</h1>
      <Router>
          <Switch>
            <Route path='/homepage'><Homepage/></Route>
            <Route path='/'><Registration/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
