import React from 'react';
import '../../assets/scss/main.scss';

function Index() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">tripMap</div>
        <ul className="menu">
          <li><a href="">nav</a></li>
          <li><a href="">nav</a></li>
          <li><a href="">nav</a></li>
        </ul>
      </nav>
      <div className="main_page">
        <div className="container">
          <h1 className="title">Map</h1>
        </div>
      </div>
      <footer className="footer">tripMap</footer>
    </div>
  );
}

export default Index;