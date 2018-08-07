import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import SigningComponent from './components/SigningComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Icon, Accordion, Responsive, Form, Container, Button, Divider, Modal} from 'semantic-ui-react'
import './App.css';

const inlineStyle = {
 marginTop: `0px !important`,
 marginLeft: `auto`,
 marginRight: `auto`
};

const bottonGroupStyle = {
  textAlign: `center`
};

class App extends Component {

  handleSetIndex = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.props
    const newIndex = activeIndex === index ? -1 : index

    this.props.setIndex(newIndex)
  }

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

  displayHelp = () => {
    // <Form.Button color='black' onClick={this.props.help} content='X' />
    return (
      <Modal open={`open`} onClose={this.props.help} dimmer={false} style={inlineStyle} basic closeIcon>
        <Modal.Content>
          <Accordion inverted>
            <h1>Actions:</h1>
            <p>
              <Accordion.Title active={this.props.activeIndex === 0} index={0} onClick={this.handleSetIndex} inverted>
                <Button color='white' inverted>Attack</Button>
                Click For Details
                <Icon name='dropdown' />
              </Accordion.Title>
              <Accordion.Content active={this.props.activeIndex === 0} inverted>
                <h3>
                  Your basic attack action. By default the opponent still absorbs damage based on they're defence stats.
                </h3>
              <p>
                <h5>
                  Here's the equation for how the basic attack damage is calculated: <br/>
                  ((Player's Damage * Player's Damage Type Multipier) + (Player's Damage Modifier * Player's Damage Modifier Type Multipier) + (A Number Between 1 And The Player's Damage Modifier)) - Opponent's Defence <br/><br/>
                  Here's the equation for how damage is taken when not defending: <br/>
                  Opponent's Attack - ((Player's Damage) + (A Number Between 1 And The Player's Defence Modifier))
                </h5>
              </p>
              </Accordion.Content>
            </p>
            <p>
              <Accordion.Title active={this.props.activeIndex === 1} index={1} onClick={this.handleSetIndex} inverted>
                <Button color='white' inverted>Defend</Button>
                Click For Details
                <Icon name='dropdown' />
              </Accordion.Title>
              <Accordion.Content active={this.props.activeIndex === 1} inverted>
                <h3>
                  When defending you sacrifice your turn so that you absorb more damage durring your opponent's turn.
                </h3>
                <p>
                  <h5>
                    EFFECTS DO NOT STACK <br/><br/>
                    Here's the equation for how damage is taken when defending: <br/>
                    ((Opponent's Attack/3) - 10) * 3 <br/><br/>
                    Even if this formula results in a number less then 3 you will still recive 3 points of damage as the bare minimum.
                  </h5>
                </p>
              </Accordion.Content>
            </p>
            <p>
              <Accordion.Title active={this.props.activeIndex === 2} index={2} onClick={this.handleSetIndex} inverted>
                <Button color='white' inverted>Charge</Button>
                Click For Details
                <Icon name='dropdown' />
              </Accordion.Title>
              <Accordion.Content active={this.props.activeIndex === 2} inverted>
                <h3>
                  Sacrifice your turn so that your attack action does more damage on your next turn.
                </h3>
                <p>
                  <h5>
                    EFFECTS DO NOT STACK <br/><br/>
                    Here's the equation for how the charged attack damage is calculated: <br/>
                    ((10 * Player's Damage Type Multipier) - (Opponent's Defence/3)) +
                    ((10 * Player's Damage Modifier Type Multipier) - (Opponent's Defence/3)) +
                    ((10 * Player's Defence Modifier Type Multipier) - (Opponent's Defence/3))<br/><br/>
                    Even if this formula results in a number less then 3 you will still recive 3 points of damage as the bare minimum.
                  </h5>
                </p>
              </Accordion.Content>
            </p>
        </Accordion>
      </Modal.Content>
      </Modal>
    )
  }

  optionRender = () => {
    if (this.props.user) {
      if (this.props.opponent) {
        return (
          <div style={bottonGroupStyle}>
            <Responsive as={Divider} minWidth={700} hidden/>
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.props.help} content='Help' />
              <Form.Button color='black' onClick={this.props.forfeit} content='Forfeit' />
            </Button.Group>
            <Responsive as={Divider} minWidth={700} hidden/>
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
        {this.props.showHelp ? this.displayHelp() : null}
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
    },
    help: () => {
      dispatch({type: "HELP"})
    },
    help: () => {
      dispatch({type: "HELP"})
    },
    setIndex: (newIndex) => {
      dispatch({type: "NEW_INDEX", payload: newIndex})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
