import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import HelpComponent from './components/HelpComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Grid, Icon, Accordion, Responsive, Form, Container, Button, Divider, Modal} from 'semantic-ui-react'
import './App.css';

const bottonGroupStyle = {
  textAlign: `center`
};

class App extends Component {

  componentDidMount = () => {
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users`).then(res => res.json()).then(users => {
      fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/games`).then(res => res.json()).then(games => {
          this.props.dataInit({users,games})
      })
    })
  }

  handleStartGame = () => {
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users/random/${this.props.user.id}`).then(res => res.json()).then(opponent => {
        this.props.newGame(opponent)
    })
  }

  optionRender = () => {
    if (this.props.user) {
      if (this.props.opponent) {
        return (
          <div style={bottonGroupStyle}>
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.props.help} content='Help' />
              <Form.Button color='black' onClick={this.props.forfeit} content='Forfeit' />
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
    // this.displayHelp()
    return (
      <div className="App">
        {this.props.showHelp ? <HelpComponent /> : null}
        {this.props.users ? this.optionRender() : null}
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
    newGame: (newGame) => {
      dispatch({type: "NEW_GAME", payload: newGame})
    },
    handleSignOut: () => {
      dispatch({type: "SIGN_USER_OUT"})
    },
    forfeit: () => {
      dispatch({type: "FORFEIT"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
