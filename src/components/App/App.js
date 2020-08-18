import React from 'react';
import '../../assets/main.scss';

function App() {
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
          <h1 className="title">tripMap</h1>
          <input type="text" placeholder="搜尋景點" className="form_control main_search" />
          <div className="main_button">
            <button className="btn cancel">搜尋</button>
            <button className="btn">搜尋</button>
          </div>
        </div>
      </div>
      <footer className="footer">tripMap</footer>
    </div>
  );
}

export default App;