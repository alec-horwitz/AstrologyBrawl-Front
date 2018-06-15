import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Card, Icon, Image, Progress, Segment, Form, Container } from 'semantic-ui-react'
import './Game.css';

class GameContainer extends Component {
  state = {
    email: "",
    uhp: 100,
    ohp: 100,
    uStatus: {},
    oStatus: {}
  }

  handleCards = () => {
    let user = this.props.user
    let opponent = this.props.opponent
    console.log(opponent.name);
    return (
      <Card.Group centered textAlign="center">
        <Card color='red' className="myCard">
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Progress percent={this.state.uhp} inverted color='red' progress />
          </Card.Content>
          <Image src={user.avatar} />

          <Card.Content>
            <Form.Button inverted onClick={this.handleStartGame} content='Attack' />
          </Card.Content>
        </Card>

        <Card className="myCard">
          <Card.Content>
            <Card.Header>{opponent.name}</Card.Header>
            <Progress percent={this.state.ohp} inverted color='red' progress />
          </Card.Content>
          <Image src={opponent.avatar} />

          <Card.Content>
            <Segment inverted>Status</Segment>
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }

  render() {
    // {this.gameRender()}
    return (
      <div className="GameContainer">
        {this.props.opponent ? this.handleCards() : <Form.Button onClick={this.handleStartGame} content='Start Game' inverted />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    newGame: (newGame) => {
      dispatch({type: "NEW_GAME", payload: newGame})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
