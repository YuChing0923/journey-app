import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '../../assets/scss/main.scss';

function Index() {
  return (
    <div className="index">
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
          <div className="form_control">
            <input type="text" placeholder="搜尋景點" className="main_search" />
            <i className="icon search"><FontAwesomeIcon icon={faSearch} /></i>
          </div>
          <div className="sub_title">
            找不到喜歡的？自己安排一個！
          </div>
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

export default Index;