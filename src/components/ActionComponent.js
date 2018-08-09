import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Button, Grid, Transition, Card, Icon, Image, Progress, Segment, Form, Container } from 'semantic-ui-react'
import './Signing.css';

class CardComponent extends Component {
  render() {
    let user = this.props.user
    let opponent = this.props.opponent
    console.log(this.props.uhp);
    return (
      <Card.Group centered textAlign="center">
        <Transition animation={this.props.uAnimation} duration={500} visible={this.props.uVisible}>
          <Card color='red' className="myCard">
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Progress percent={Math.floor(this.props.uhp)} inverted color='red' progress />
              <Responsive as={Image} minWidth={740} src={user.avatar} />
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {user.main} {user.type1}</Grid.Column>
                  <Grid.Column>Defense: {user.main} {user.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {user.attack} {user.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {user.defence} {user.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>

            <Card.Content>
              <Button.Group>
                <Form.Button disabled={!this.props.uStatus} inverted onClick={() => this.handleActions(this.opponentAction("Attacking"), "Attacking")} content='Attack' />
                <Form.Button disabled={!this.props.uStatus} inverted onClick={() => this.handleActions(this.opponentAction("Defending"), "Defending")} content='Defend' />
                <Form.Button disabled={!this.props.uStatus} inverted onClick={() => this.handleActions(this.opponentAction("Charging"), "Charging")} content='Charge' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Transition>

        <Transition animation={this.props.oAnimation} duration={500} visible={this.props.oVisible}>
          <Card className="myCard">
            <Card.Content>
              <Card.Header>{opponent.name}</Card.Header>
              <Progress percent={Math.floor(this.props.ohp)} inverted color='red' progress />
              <Responsive as={Image} minWidth={740} src={opponent.avatar} />
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {opponent.main} {opponent.type1}</Grid.Column>
                  <Grid.Column>Defense: {opponent.main} {opponent.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {opponent.attack} {opponent.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {opponent.defence} {opponent.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>

            <Card.Content>
              <Segment inverted>{this.props.oStatus}</Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
