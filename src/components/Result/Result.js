import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/main.scss';

const Division = ({ division }) => (
  <div className="division_block">
    <div className="image"></div>
    <div className="info">
      <div className="main_info">
        <span className="title">{division.title}</span>
        <span className="author">{division.author}</span>
      </div>
      <span className="time">{division.time}</span>
    </div>
  </div>
)

const List = ({ list }) => (
  <div className="list_block" key={list.id}>
    <div className="title">{list.title}</div>
    <div className="sub_info">
      <span className="author">{list.author}</span>
      <span className="time">{list.time}</span>
    </div>
  </div>
)

function Result() {
  const initResult = [{
    id: 1,
    title: "title",
    author: "author1",
    time: "2020-09-23 09:23",
  }, {
    id: 2,
    title: "title2",
    author: "author2",
    time: "2020-09-23 09:23",
  }, {
    id: 3,
    title: "title3",
    author: "author3",
    time: "2020-09-23 09:23",
  }]
  const [divisionResult, setDivisionResult] = useState(initResult),
    [listResult, ListResult] = useState(initResult);

  return (
    <div className="list_page">
      <nav className="navbar">
        <div className="logo">TripMap</div>
        <ul className="menu">
          <li>
            <Link to={`/#/`}>首頁</Link>
          </li>
          <li>
            <Link to={`/map/`}>行程安排</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="search">
          <input type="text" placeholder="搜尋景點" className="main_search" />
        </div>
        <div className="result result_division">
          {divisionResult.map((division)=>(
            <Division
            division={division}
            key={division.id}
            />
          ))}
        </div>
        <div className="result result_list">
          {listResult.map((list)=>(
            <List
            list={list}
            key={list.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;