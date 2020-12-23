import React from "react";
import { Route } from "wouter";
import Boss from "./boss";
import Main from "./Main";
import Mars from "./Mars";

const Home = () => {
  window.location.href = "/main";
  return <div>loading...</div>;
};

const App = () => {
  return (
    <div>
      <Route path="/" component={Home}></Route>
      <Route path="/main" component={Main}></Route>
      <Route path="/boss-battle" component={Boss}></Route>
      <Route path="/mars" component={Mars}></Route>
    </div>
  );
};

export default App;
