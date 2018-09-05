import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import HelpComponent from './components/HelpComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Responsive, Form, Container, Button, Divider} from 'semantic-ui-react'
import './App.css';

const bottonGroupStyle = {
  textAlign: `center`
};

class App extends Component {

  handleStartGame = () => {
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users/random/${this.props.user.id}`, {
      headers: {
        'content-type': 'application/json',
        "Authorization": this.props.token
      }
    }).then(res => res.json()).then(opponent => {
        this.props.newGame({
          opponent: {
            ...opponent,
            hp: Number(opponent.hp),
            charged: (opponent.charged === "true"),
            defending: (opponent.defending === "true"),
            status: opponent.status,
            visible: (opponent.visible === "true"),
            animation: opponent.animation,
          },
          player: {
            ...this.props.user,
            hp: Number(this.props.user.hp),
            charged: (this.props.user.charged === "true"),
            defending: (this.props.user.defending === "true"),
            status: this.props.user.status,
            visible: this.props.user.visible,
            animation: this.props.user.animation,
          },
        })
    })
  }

  optionRender = () => {
    if (this.props.token) {
      if (this.props.opponent) {
        return (
          <div style={bottonGroupStyle}>
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.props.help} content='Help' />
              <Form.Button color='black' onClick={() => this.props.forfeit({
                ...this.props.user,
                hp: Number(this.props.user.hp),
                charged: (this.props.user.charged === "true"),
                defending: (this.props.user.defending === "true"),
                status: this.props.user.status,
                visible: (this.props.user.visible === "true"),
                animation: this.props.user.animation,
              })} content='Forfeit' />
            </Button.Group>
            <Responsive as={Divider} minWidth={700} hidden/>
            <GameContainer />
          </div>
        )
      } else {
        return (
          <Container textAlign="center">
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.handleStartGame} content='New Game' />
              <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
            </Button.Group>
            <Responsive as={Divider} minWidth={700} hidden/>
            <h1> {this.props.game ? this.props.game.mod0 : null} </h1>
            <Responsive as={Divider} minWidth={700} hidden/>
            <h1>Score Board</h1>
            <ScoreBoardComponent />
            <Responsive as={Divider} minWidth={700} hidden/>
          </Container>
        )
      }
    } else {
      return (
        <FormContainer />
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.showHelp ? <HelpComponent /> : null}
        {this.optionRender()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    dataInit: (initData) => {
      dispatch({type: "INIT_DATA", payload: initData})
    },
    newGame: (newGameResult) => {
      dispatch({type: "NEW_GAME", payload: newGameResult})
    },
    handleSignOut: () => {
      dispatch({type: "SIGN_USER_OUT"})
    },
    forfeit: (player) => {
      dispatch({type: "FORFEIT", payload: player})
    },
    help: () => {
      dispatch({type: "HELP"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
