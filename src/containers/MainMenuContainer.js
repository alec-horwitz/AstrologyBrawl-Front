import React, { Component } from 'react';
import {connect} from 'react-redux'
import ScoreBoardComponent from '../components/ScoreBoardComponent';
import MusicPlayerComponent from '../components/MusicPlayerComponent';
import {defaultBackground} from '../base64Images.js'
import {Responsive, Form, Container, Button, Divider} from 'semantic-ui-react'

class MainMenuContainer extends Component {

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
        if (arena === '') {
          arena = defaultBackground
        }
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

  render() {

    return (

      <Container textAlign="center">
        {true ? <MusicPlayerComponent /> : null}
        <Responsive as={Divider} minWidth={700} hidden/>
        <Button.Group >
          <Form.Button color='black' onClick={this.props.handleAudioToggle} content='Toggle Audio' />
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
    handleAudioToggle: () => {
      dispatch({type: "TOGGLE_MUTE"})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuContainer);
