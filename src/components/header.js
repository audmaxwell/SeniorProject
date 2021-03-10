import React from 'react';
import logo from '../catsprite.png';
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