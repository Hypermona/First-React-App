import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/MainComponent";
import { DISHES } from "./shared/dishes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}
export default App;
