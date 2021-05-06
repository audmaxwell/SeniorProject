import React from 'react';
import logo from '../yes1.png';
import './comp.css';
export default class Header extends React.Component {
  render(){
    return (
      <header className="Header">
        <h1 className="brand">
          <img src={logo} alt="Social network logo" className="Logo" />
          meow
        </h1>
      </header>
    );
  }
}