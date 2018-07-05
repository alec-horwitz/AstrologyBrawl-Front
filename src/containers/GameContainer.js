import React, { Component } from 'react';
import {connect} from 'react-redux'
// import GameComponent from '../components/GameComponent'
import { Button, Grid, Transition, Card, Image, Progress, Segment, Form } from 'semantic-ui-react'
import './Game.css';

typeDmgs = {
  water: {fire:1, earth:0, air:2},
  fire: {water:1, earth:2, air:0},
  earth: {water:2, fire:0, air:1},
  air: {water:0, fire:2, earth:1}
}

class GameContainer extends Component {

  getDmgDelt = (attacker, defender, aMod, dMod) => {
    let attackerD = aMod === "Charging" ? Number(attacker.main)*2 : Number(attacker.main)
    let defenderR = dMod === "Defending" ? Number(defender.main)*3 : Number(defender.main)
    console.log(attacker.name, "Attack: ", attackerD, aMod);
    console.log(defender.name, "Defence: ", defenderR, dMod);
    let attack = (attackerD) + (Math.floor(Math.random() * Math.floor(attacker.attack))+1)*5
    let defense = (defenderR) + (Math.floor(Math.random() * Math.floor(defender.defence))+1)
    if (attack > defense) {
      return (attack - defense)
    } else {
      return 1
    }
  }

  aTypeDamage = (attacker, defender, aMod, dMod) => {

    if (aMod == "Charging" && dMod == "Defending") {
      return threeToThree(attacker, defender)
    } else if (aMod == "Charging" && dMod != "Defending") {
      return threeToTwo(attacker, defender)
    } else if (aMod != "Charging" && dMod == "Defending") {
      return twoToThree(attacker, defender)
    } else {
      return twoToTwo(attacker, defender)
    }
  }

  threeToThree = (attacker, defender) => {}
  threeToTwo = (attacker, defender) => {}
  twoToThree = (attacker, defender) => {}
  twoToTwo = (attacker, defender) => {
    let attack = (Number(attacker.main)*
    typeDmgs[attacker.type1][defender.type1]) +
    (Math.floor(Math.random() *
    Math.floor(attacker.attack))+1)*
    (5*typeDmgs[attacker.type2][defender.type2])

    let defense = Number(defender.main) +
    (Math.floor(Math.random() *
    Math.floor(defender.defence))+1)

    if (attack > defense) {
      return (attack - defense)
    } else {
      return 1
    }
  }

  opponentAction = (uA) => {
    let selection = Math.floor(Math.random() * Math.floor(12))
    if ((selection === 0 || selection === 1 || selection === 2) && !this.props.oCharged) {
      if (uA === 'Charging') {
        return 'Defending'
      } else {
        return 'Charging'
      }
    } else if ((selection === 3 || selection === 4 || selection === 5) && !this.props.oCharged) {
      if (uA === 'Charging' && this.props.ohp > 50) {
        return 'Charging'
      } else {
        return 'Attacking'
      }
    } else if ((selection === 6 || selection === 7 || selection === 8) && !this.props.oCharged) {
      if (uA === 'Defending') {
        return 'Charging'
      } else {
        return 'Attacking'
      }
    } else if ((selection === 9 || selection === 10 || selection === 11) && !this.props.oCharged) {
      if (uA === 'Attacking' && this.props.ohp > 75) {
        return 'Charging'
      } else {
        return 'Defending'
      }
    } else {
      return 'Attacking'
    }
  }

  handleOpponentAction = (oA, uA) => {
    if (oA === 'Charging') {
      this.props.opponentCharge()
    } else if (oA === 'Defending') {
      this.props.opponentDefense()
    } else {
      let oAttack = "Attacking"
      let uAttack = "Blocking"
      if (this.props.uDefending === true) {
        uAttack =  'Defending'
      }
      if (this.props.oCharged === true) {
        oAttack = 'Charging'
      }
      let opponentDmg = this.getDmgDelt(this.props.opponent, this.props.user, oAttack, uAttack)

      if (this.props.uhp < (opponentDmg)) {
        this.GameOver(this.props.opponent, this.props.ohp)
      } else {
        setTimeout(() => {
          this.props.opponentPreAttack()
          setTimeout(() => {
            this.props.opponentAttack((this.props.uhp - (opponentDmg)))
            setTimeout(() => {
              this.props.opponentPostAttack()
            }, 1000)
          }, 1000)
        }, 0)
      }
    }
  }

  handlePlayerAction = (oA, uA) => {
    if (uA === 'Charging') {
      this.props.playerCharge()
      setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
    } else if (uA === 'Defending') {
      this.props.playerDefense()
      setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
    } else {
      let uAttack = "Attacking"
      let oAttack = "Blocking"
      if (this.props.oDefending === true) {
        oAttack = 'Defending'
      }
      if (this.props.uCharged === true) {
        uAttack = 'Charging'
      }
      let userDmg = this.getDmgDelt(this.props.user, this.props.opponent, uAttack, oAttack)
      if (this.props.ohp < (userDmg)) {
        this.GameOver(this.props.user, this.props.uhp)
      } else {
        this.props.playerAttack(this.props.ohp -(userDmg))
        setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
      }
    }
  }

  GameOver = (winner, points) => {
    let messege
    if (winner.id === this.props.user.id) {
      messege = `YOU WON WITH A SCORE OF: ${((100 + points)*100)}`
    } else {
      messege = "DEFEATED!!!"
    }
    fetch(`http://localhost:3000/api/v1/games`, {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({user_id: winner.id, playername: winner.name, score: ((100 + points)*100)})
    }).then(res => res.json()).then(game => {
      console.log([...this.props.games, game]);
      this.props.endGame({games: [...this.props.games, game], game: {...game, mod0: messege}})
    })
  }

  handleActions = (oA, uA) => {
    this.handlePlayerAction(oA, uA)
  }

  handleCards = () => {
    let user = this.props.user
    let opponent = this.props.opponent
    console.log(this.props.uVisible);
    return (
      <Card.Group centered textAlign="center">
        <Transition animation={this.props.uAnimation} duration={500} visible={this.props.uVisible}>
          <Card color='red' className="myCard">
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Progress percent={this.props.uhp} inverted color='red' progress />
              <Image src={user.avatar} />
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
              <Progress percent={this.props.ohp} inverted color='red' progress />
              <Image src={opponent.avatar} />
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
    },
    endGame: (newGames) => {
      dispatch({type: "END_GAME", payload: newGames})
    },
    playerDefense: () => {
      dispatch({type: "PLAYER_DEFENSE"})
    },
    playerCharge: () => {
      dispatch({type: "PLAYER_CHARGE"})
    },
    playerAttack: (ohp) => {
      dispatch({type: "PLAYER_ATTACK", payload: ohp})
    },
    opponentDefense: () => {
      dispatch({type: "OPPONENT_DEFENSE"})
    },
    opponentCharge: () => {
      dispatch({type: "OPPONENT_CHARGE"})
    },
    opponentAttack: (uhp) => {
      dispatch({type: "OPPONENT_ATTACK", payload: uhp})
    },
    opponentPreAttack: () => {
      dispatch({type: "OPPONENT_PRE_ATTACK"})
    },
    opponentPostAttack: () => {
      dispatch({type: "OPPONENT_POST_ATTACK"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
