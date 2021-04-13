import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Registration from './pages/registration';
import Homepage from './pages/homepage';
import Login from './pages/login';
import {Redirect,Switch,BrowserRouter as Router, Route} from 'react-router-dom';


function PrivateRoute({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        JSON.parse(sessionStorage.getItem('thisCheck')) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
const useSessionStorage = sessionStorageKey => {
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem(sessionStorageKey) || false
  );
 
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, isLogin);
    JSON.parse(sessionStorage.getItem('thisCheck'))  }, [isLogin]);
 
  return [isLogin, setIsLogin];
};
function App() {
  useEffect(function(){
    fetch("/ping").then((res)=> res.json()).then(console.log)
  });
  const [isLogin, setIsLogin] = useSessionStorage(
    'thisCheck'
  );
  console.log(sessionStorage.getItem('thisCheck'))
  const login = () =>{
    setIsLogin(true);
  }

  return (
    <div className="initialScreen">
      <div className="Wrapper">
        <Header/>
      </div>
      <h1>Welcome!</h1>
      <Router>
          <Switch>
          <Route exact path='/register'><Registration onLogin = {login}/></Route>
          <PrivateRoute path='/' component = {Homepage} isLogin = {isLogin}></PrivateRoute>
          <Route exact path='/login'><Login onLogin = {login}/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
