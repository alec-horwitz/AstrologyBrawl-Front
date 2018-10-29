import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {} from 'semantic-ui-react'
import MusicPlayerComponent from './components/MusicPlayerComponent';
import HelpComponent from './components/HelpComponent';
import GameContainer from './containers/GameContainer';
import MainMenuContainer from './containers/MainMenuContainer';
import FormContainer from './containers/FormContainer';
import './App.css';

class App extends Component {

  optionRender = () => {
    return (
      <div>
        {true ? <MusicPlayerComponent /> : null}
        {this.props.opponent ? <GameContainer /> : <MainMenuContainer />}
      </div>
    )
  }


  render() {
    document.body.style.backgroundImage = 'url("' + this.props.arena + '")'
    return (
      <div className="App">
        {this.props.showHelp ? <HelpComponent /> : null}
        {this.props.token ? this.optionRender() : <FormContainer />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App);
