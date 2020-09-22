import React from 'react';
import { Route } from 'react-router-dom';
import Index from '../Index/Index.js';
import Map from '../Map/Map.js';
import Result from '../Result/Result.js';
import '../../assets/scss/main.scss';

function App() {
  return (
    <div className="main_container">
      {/* The corresponding component will show here if the current URL matches the path */}
      <Route path="/" exact component={Index} />
      <Route path="/map/" component={Map} />
      <Route path="/result/" component={Result} />
      {/* <Route path="/electronics" component={Electronics} /> */}
    </div>
  );
}

export default App;