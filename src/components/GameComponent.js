import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button, Grid, Transition, Card, Icon, Image, Progress, Segment, Form, Container } from 'semantic-ui-react'
import './Signing.css';

class GameComponent extends Component {
  render() {
    let user = this.props.user
    let opponent = this.props.opponent
    // console.log(opponent.name);
    return (
      <Card.Group centered textAlign="center">
        <Transition animation={this.state.uAnimation} duration={500} visible={this.state.uVisible}>
          <Card color='red' className="myCard">
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Progress percent={this.state.uhp} inverted color='red' progress />
              <Image src={user.avatar} />
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {user.main} {user.type1}</Grid.Column>
                  <Grid.Column>Defence: {user.main} {user.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {user.attack} {user.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {user.defence} {user.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>

            <Card.Content>
              <Button.Group>
                <Form.Button disabled={!this.state.uStatus} inverted onClick={this.handleAttack} content='Attack' />
                <Form.Button disabled={!this.state.uStatus} inverted onClick={this.handleDefend} content='Defend' />
                <Form.Button disabled={!this.state.uStatus} inverted onClick={this.handleAttack} content='Charge' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Transition>

        <Transition animation={this.state.oAnimation} duration={500} visible={this.state.oVisible}>
          <Card className="myCard">
            <Card.Content>
              <Card.Header>{opponent.name}</Card.Header>
              <Progress percent={this.state.ohp} inverted color='red' progress />
              <Image src={opponent.avatar} />
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {opponent.main} {opponent.type1}</Grid.Column>
                  <Grid.Column>Defence: {opponent.main} {opponent.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {opponent.attack} {opponent.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {opponent.defence} {opponent.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>

            <Card.Content>
              <Segment inverted>{this.state.oStatus}</Segment>
            </Card.Content>
          </Card>
        </Transition>
      </Card.Group>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    handleSignIn: user => {
      dispatch({type: "SIGN_USER_IN", payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
