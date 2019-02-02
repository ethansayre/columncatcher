import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu/MainMenu';
import MainCard from './components/MainCard/MainCard';
import AddArticles from "./components/AddArticles/AddArticles";
import ViewArticles from "./components/ViewArticles/ViewArticles";
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: "main",
      key: Math.random()
    };
    this.changeLayout = this.changeLayout.bind(this);
  }
  changeLayout(layout) {
    this.setState({
      active: layout
    });
  }
  render() {
    if (this.state.active === "main"){
      return (
        <div>
          <MainMenu changeLayout={this.changeLayout} key={Math.random()}/>
          <br></br>
          <h1 style={{marginBottom: "5%"}}></h1>
        </div>
      );
    } else if (this.state.active === "add") {
      return (
        <div>
          <MainMenu changeLayout={this.changeLayout} key={Math.random()}/>
          <br></br>
          <h1 style={{marginBottom: "5%"}}></h1>
          <AddArticles/>
        </div>
      );
    } else if (this.state.active === "view") {
      return (
        <div>
          <MainMenu changeLayout={this.changeLayout} key={Math.random()}/>
          <br></br>
          <h1 style={{marginBottom: "5%"}}></h1>
          <ViewArticles/>
        </div>
      );
    }
  }
}

export default App;