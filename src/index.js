import React from "react";
import ReactDOM from "react-dom";
import './index.scss'

const Index = () => {
  return <div className="header">Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));