import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import SigningComponent from './components/SigningComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Form, Container, Button, Divider, Modal} from 'semantic-ui-react'
import './App.css';

class App extends Component {

  componentDidMount = () => {
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users`).then(res => res.json()).then(users => {
      fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/games`).then(res => res.json()).then(games => {
          this.props.dataInit({users,games})
      })
    })
  }

  handleStartGame = () => {
    let opponent = null
    while (!opponent) {
      let index = Math.floor(Math.random() * Math.floor(this.props.users.length))
      opponent = this.props.users.filter(user => !(user.id === this.props.user.id))[index]
    }
    this.props.newGame(opponent)
  }

  optionRender = () => {
    if (this.props.user) {
      if (this.props.opponent) {
        return (
          <div>
            <Divider hidden/>
            <Divider hidden/>
            <Button.Group >
              <Modal trigger={<Button color='black'>Help</Button>} basic>
                <Modal.Content className="modal1">
                  <h1>Actions</h1>
                  <p>
                    <Button color='white' inverted>
                      Attack
                    </Button>
                    Your basic attack action
                  </p>
                  <p>
                    <Button color='white' inverted>
                      Defend
                    </Button>
                    Sacrifice your turn so that you absorb <br/>
                    more damage durring your opponent's turn
                    <p>EFFECTS DO NOT STACK</p>
                  </p>
                  <p>
                    <Button color='white' inverted>
                      Charge
                    </Button>
                    Sacrifice your turn so that your <br/>
                  attack action does more damage your next turn
                  <p>EFFECTS DO NOT STACK</p>
                </p>
                </Modal.Content>
              </Modal>
              <Form.Button color='black' onClick={this.props.forfeit} content='Forfeit' />
            </Button.Group>
            <Divider hidden/>
            <Divider hidden/>
            <GameContainer />
          </div>
        )
      } else {
        return (
          <Container textAlign="center">
            <Divider hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.handleStartGame} content='New Game' />
              <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
            </Button.Group>
            <Divider hidden/>
            <h1> {this.props.game ? this.props.game.mod0 : null} </h1>
            <Divider hidden/>
            <h1>Score Board</h1>
            <ScoreBoardComponent />
            <Divider hidden/>
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
