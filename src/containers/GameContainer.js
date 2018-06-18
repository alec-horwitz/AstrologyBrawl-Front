import React, { Component } from 'react';
import {connect} from 'react-redux'
import GameComponent from '../components/GameComponent'
import { Button, Grid, Transition, Card, Icon, Image, Progress, Segment, Form, Container } from 'semantic-ui-react'
import './Game.css';

class GameContainer extends Component {
  state = {
    uStatus: true,
    uAnimation: "pulse",
    uVisible: true,
    oStatus: "Your Turn",
    oAnimation: "pulse",
    oVisible: true
  }

  getDmgDelt = (attacker, defender, aMod, dMod) => {
    let attackerD = aMod === "Charging" ? Number(attacker.main)*2 : Number(attacker.main)
    let defenderR = dMod === "Defending" ? Number(defender.main)*2 : Number(defender.main)
    console.log(attacker.name, "Attack: ", attackerD, aMod);
    console.log(defender.name, "Defence: ", defenderR, dMod);
    let attack = (attackerD) + (Math.floor(Math.random() * Math.floor(attacker.attack))+1)
    let defense = (defenderR - 5) + (Math.floor(Math.random() * Math.floor(defender.defence))+1)
    if (attack > defense) {
      return (attack - defense) * 2
    } else {
      return 1
    }
  }

  opponentAction = () => {
    let selection = Math.floor(Math.random() * Math.floor(3))
    if (selection === 0) {
      if (localStorage.getItem("ohp") < 50) {
        return 'Defending'
      } else {
        return 'Charging'
      }
    } else {
      return 'Attacking'
    }
  }

  handleOpponentAction = (oA, uA) => {
    if (oA === 'Charging') {
      console.log("hit 46 oCharging");
      localStorage.setItem('oDefending', false)
      localStorage.setItem('oA', "Charging")
      localStorage.setItem('oCharged', true)
      this.setState({
        oStatus: localStorage.getItem("oA"),
        oAnimation: "glow",
        oVisible: !this.state.oVisible,
        uStatus: true
      })
    } else if (oA === 'Defending') {
      localStorage.setItem('oCharged', false)
      localStorage.setItem('oA', "Defending")
      localStorage.setItem('oDefending', true)
      this.setState({
        oStatus: localStorage.getItem("oA"),
        oAnimation: "jiggle",
        oVisible: !this.state.oVisible,
        uStatus: true
      })
    } else {
      localStorage.setItem('oA', "Attacking")
      console.log("hit 62 oAttacking")
      let oAttack = "Attacking"
      let uAttack = "Blocking"
      if (localStorage.getItem("uDefending") === "true") {
        localStorage.setItem('uDefending', false)
        uAttack =  'Defending'
      }
      if (localStorage.getItem("oCharged") === "true") {
        localStorage.setItem('oCharged', false)
        oAttack = 'Charging'
      }
      let opponentDmg = this.getDmgDelt(this.props.opponent, this.props.user, oAttack, uAttack)

      this.setState({
        oStatus: localStorage.getItem("oA"),
      }),
      setTimeout(() => {
        localStorage.setItem('uhp', localStorage.getItem("uhp") -(opponentDmg))
        this.setState({
          oVisible: !this.state.oVisible,
          uVisible: !this.state.uVisible,
          oAnimation: "tada",
          uAnimation: "flash",
        })
      }, 2000),
      setTimeout(() => {
        this.setState({
          oStatus: "Attacked",
          uStatus: true
        },console.log(this.state)),console.log(this.state)
      }, 3000)
    }
  }

  handlePlayerAction = (oA, uA) => {
    if (uA === 'Charging') {
      localStorage.setItem('uDefending', false)
      console.log("hit uCharging", )
      localStorage.setItem('uCharged', true)
      this.setState({
        uStatus: false,
        uAnimation: "glow",
        uVisible: !this.state.uVisible
      }),setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
    } else if (uA === 'Defending') {
      localStorage.setItem('uCharged', false)
      console.log("hit 97 uDefending")
      localStorage.setItem('uDefending', true)
      this.setState({
        uStatus: false,
        uAnimation: "jiggle",
        uVisible: !this.state.uVisible
      }),setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
    } else {
      console.log("hit 105 uAttacking")
      let uAttack = "Attacking"
      let oAttack = "Blocking"
      if (localStorage.getItem("oDefending") === "true") {
        localStorage.setItem('oDefending', false)
        oAttack = 'Defending'
      }
      if (localStorage.getItem("uCharged") === "true") {
        localStorage.setItem('uCharged', false)
        let chargevar = localStorage.getItem("uCharged")
        console.log("User Charged and Chargevar is" + chargevar)
        uAttack = 'Charging'
      }
      let userDmg = this.getDmgDelt(this.props.user, this.props.opponent, uAttack, oAttack)

      localStorage.setItem('ohp', localStorage.getItem("ohp") -(userDmg))
      this.setState({
        uAnimation: "tada",
        oVisible: !this.state.oVisible,
        uVisible: !this.state.uVisible,
        oAnimation: "flash",
        uStatus: false,
      }),setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
    }
  }

  handleActions = (oA, uA) => {
    this.handlePlayerAction(oA, uA)
  }

  handleCards = () => {
    let user = this.props.user
    let opponent = this.props.opponent
    // console.log(opponent.name);
    return (
      <Card.Group centered textAlign="center">
        <Transition animation={this.state.uAnimation} duration={500} visible={this.state.uVisible}>
          <Card color='red' className="myCard">
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Progress percent={localStorage.getItem("uhp")} inverted color='red' progress />
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
                <Form.Button disabled={!this.state.uStatus} inverted onClick={() => this.handleActions(this.opponentAction(), "Attacking")} content='Attack' />
                <Form.Button disabled={!this.state.uStatus} inverted onClick={() => this.handleActions(this.opponentAction(), "Defending")} content='Defend' />
                <Form.Button disabled={!this.state.uStatus} inverted onClick={() => this.handleActions(this.opponentAction(), "Charging")} content='Charge' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Transition>

        <Transition animation={this.state.oAnimation} duration={500} visible={this.state.oVisible}>
          <Card className="myCard">
            <Card.Content>
              <Card.Header>{opponent.name}</Card.Header>
              <Progress percent={localStorage.getItem("ohp")} inverted color='red' progress />
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
