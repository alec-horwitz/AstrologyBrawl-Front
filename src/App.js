import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import SigningComponent from './components/SigningComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import {Form, Container, Button, Segment, Image, Divider} from 'semantic-ui-react'
import './App.css';

class App extends Component {

  componentDidMount = () => {
    let userId = localStorage.getItem("userId")
    let gameId = localStorage.getItem("gameId")
    let opponentId = localStorage.getItem("opponentId")
    let user = null
    let game = null
    let opponent = null
    fetch(`http://localhost:3000/api/v1/users`).then(res => res.json()).then(users => {
      fetch(`http://localhost:3000/api/v1/games`).then(res => res.json()).then(games => {
        if (userId) {
          user = users.find(user => `${user.id}` === userId)
          if (gameId) {
            game = games.find(game => `${game.id}` === gameId)
            if (opponentId) {
              opponent = users.find(user => `${user.id}` === opponentId)
              // console.log(opponentId, opponent);
              this.props.dataInit({users,games,user,game,opponent})
            } else {
              this.props.dataInit({users,games,user,game,opponent})
            }
          } else {
            this.props.dataInit({users,games,user,game,opponent})
          }
        } else {
          this.props.dataInit({users,games,user,game,opponent})
        }
      })
    })
  }

  handleStartGame = () => {
    let opponent = null
    while (!opponent) {
      let index = Math.floor(Math.random() * Math.floor(this.props.users.length))
      opponent = this.props.users.filter(user => !(user.id === this.props.user.id))[index]
    }
    fetch(`http://localhost:3000/api/v1/games`, {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({user_id:this.props.user.id, playername:this.props.user.name, score: 0})
    }).then(res => res.json()).then(game => {
      this.props.newGame({game, opponent})
    })
  }

  optionRender = () => {
    if (this.props.user) {
      if (this.props.game) {
        return (
          <Container>
            <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
            <GameContainer />
          </Container>
        )
      } else {
        return (
          <Container textAlign="center">
            <Divider hidden/>
            <Button.Group textAlign="center" >
              <Form.Button color='black' onClick={this.handleStartGame} content='New Game' />
              <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
            </Button.Group>
            <Divider hidden/>
            <ScoreBoardComponent />
          </Container>
        )
      }
    } else {
      return (<SigningComponent />)
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
