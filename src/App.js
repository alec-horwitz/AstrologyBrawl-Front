import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import HelpComponent from './components/HelpComponent';
import MusicPlayerComponent from './components/MusicPlayerComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Responsive, Form, Container, Button, Divider} from 'semantic-ui-react'
import {defaultBackground} from './base64Images.js'
import './App.css';

const bottonGroupStyle = {
  textAlign: `center`
};

class App extends Component {

  handleStartGame = (shouldUseImage) => {
    fetch(`${this.props.backend}/api/v1/users/random/${this.props.user.id}`, {
      headers: {
        'content-type': 'application/json',
        "Authorization": this.props.token
      }
    }).then(res => res.json()).then(res => {
        let opponent = {...res.opponent}
        let arena
        shouldUseImage ? arena = res.arena_image : arena = res.arena_color
        arena === '' ? arena = defaultBackground : arena = arena
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
          arena: arena
        })
    })
  }

  optionRender = () => {
    if (this.props.token) {
      if (this.props.opponent) {
        return (
          <div style={bottonGroupStyle}>
            {true ? <MusicPlayerComponent /> : null}
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
        // <Responsive as={Button.Group} minWidth={700} >
        // </Responsive>
        // <Responsive as={Button.Group} maxWidth={800} >
        //   <Form.Button color='black' onClick={() => this.handleStartGame(false)} content='New Game' />
        //   <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
        // </Responsive>
        return (
          <Container textAlign="center">
            {true ? <MusicPlayerComponent /> : null}
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={() => this.handleStartGame(true)} content='New Game' />
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
    document.body.style.backgroundImage = 'url("' + this.props.arena + '")'
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
