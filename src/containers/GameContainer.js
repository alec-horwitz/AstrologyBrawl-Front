import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import CardComponent from '../components/CardComponent';
import './Game.css';

const typeDmgs = {
  water: {water:0.5, air:1.5, fire:1, earth:1},
  air: {water:1, air:0.5, fire:1.5, earth:1},
  fire: {water:1, air:1, fire:0.5, earth:1.5},
  earth: {water:1.5, air:1, fire:1, earth:0.5},
}

class GameContainer extends Component {
  getDmgDelt = (attacker, defender, aMod, dMod) => {

      if (aMod === "Charging" && dMod === "Defending") {
        return this.threeToThree(attacker, defender)
      } else if (aMod === "Charging" && dMod !== "Defending") {
        return this.threeToTwo(attacker, defender)
      } else if (aMod !== "Charging" && dMod === "Defending") {
        return this.twoToThree(attacker, defender)
      } else {
        return this.twoToTwo(attacker, defender)
      }
    }

    threeToThree = (attacker, defender) => {
      let dmg1 = 1
      let dmg2 = 1
      let dmg3 = 1

      let attack1 = (10 *
        typeDmgs[attacker.type1][defender.type1])

      let attack2 = (10 *
        typeDmgs[attacker.type2][defender.type1])

      let attack3 = (10 *
        typeDmgs[attacker.type3][defender.type2])

      let defense1 = (((Math.floor(Math.random() *
      (Number(defender.defence)))+(8 *
      typeDmgs[attacker.type1][defender.type1]))))
      let defense2 = (((Math.floor(Math.random() *
      (Number(defender.defence)))+(8 *
      typeDmgs[attacker.type2][defender.type1]))))
      let defense3 = (((Math.floor(Math.random() *
      (Number(defender.defence)))+(8 *
      typeDmgs[attacker.type3][defender.type2]))))

      if (attack1 > defense1) {
        dmg1 = (attack1 - defense1)
      }
      if (attack2 > defense2) {
        dmg2 = (attack2 - defense2)
      }
      if (attack3 > defense3) {
        dmg3 = (attack3 - defense3)
      }

      return dmg1+dmg2+dmg3
    }
    threeToTwo = (attacker, defender) => {
      let dmg1 = 1
      let dmg2 = 1
      let dmg3 = 1

      let attack1 = (10 *
        typeDmgs[attacker.type1][defender.type1])

      let attack2 = (10 *
        typeDmgs[attacker.type2][defender.type1])

      let attack3 = (10 *
        typeDmgs[attacker.type3][defender.type2])

      let defense = (Number(defender.main)) +
      ((Math.floor(Math.random() *
      (Number(defender.defence)))))

      if (attack1 > (defense/3)) {
        dmg1 = (attack1 - (defense/3))
      }
      if (attack2 > (defense/3)) {
        dmg2 = (attack2 - (defense/3))
      }
      if (attack3 > defense/3) {
        dmg3 = (attack3 - defense/3)
      }

      return dmg1+dmg2+dmg3
    }
    twoToThree = (attacker, defender) => {
      let dmg1 = 1
      let dmg2 = 1
      let dmg3 = 1

      let attack = Math.floor((Number(attacker.main)*
      typeDmgs[attacker.type1][defender.type1]) +
      (Number(attacker.attack)*
      typeDmgs[attacker.type2][defender.type2]))
      // (Math.floor(Math.random() * Math.floor(Number(attacker.attack)))+1)

      let defense1 = 10
      // ((Math.floor(Math.random() * Math.floor(Number(defender.defence)))+6))
      let defense2 = 10
      // ((Math.floor(Math.random() * Math.floor(Number(defender.defence)))+6))
      let defense3 = 10
      // ((Math.floor(Math.random() * Math.floor(Number(defender.defence)))+6))

      if ((attack/3) > defense1) {
        dmg1 = ((attack/3) - defense1)
      }
      if ((attack/3) > defense2) {
        dmg2 = ((attack/3) - defense2)
      }
      if ((attack/3) > defense3) {
        dmg3 = ((attack/3) - defense3)
      }

      return dmg1+dmg2+dmg3
    }
    twoToTwo = (attacker, defender) => {
      let attack = ((Number(attacker.main) *
      typeDmgs[attacker.type1][defender.type1]) +
      (Number(attacker.attack) *
      typeDmgs[attacker.type2][defender.type2]) +
      (Math.floor(Math.random() *
      (Number(attacker.attack)))+1))

      let defense = (Number(defender.main)) +
      ((Math.floor(Math.random() *
      (Number(defender.defence)))))


      if (attack > defense) {
        return (attack - defense)

      } else {
        return 1
      }
    }


    opponentAction = (uA) => {
      let selection = Math.floor(Math.random() * Math.floor(8))
      if (uA === 'Charging' && !this.props.opponent.charged) {
        if ((this.props.opponent.hp > 25) && !(selection === 0 || selection === 1 || selection === 2)) {
          return 'Defending'
        } else {
          if ((this.props.player.hp < this.props.opponent.hp)) {
            return 'Charging'
          } else {
            return 'Attacking'
          }
        }
      } else if (uA === 'Defending' && !this.props.opponent.charged) {
        if ((this.props.opponent.hp > 25) && !(selection === 0 || selection === 1 || selection === 2)) {
          return 'Charging'
        } else {
          if ((selection === 0 || selection === 1 || selection === 2)) {
            return 'Charging'
          } else {
            return 'Attacking'
          }
        }
      } else {
        if (this.props.opponent.charged) {
          return 'Attacking'
        } else if (this.props.opponent.hp > 50) {
          if ((selection === 0 || selection === 1 || selection === 2)) {
            return 'Charging'
          } else {
            return 'Attacking'
          }
        } else {
          if ((selection === 0 || selection === 1 || selection === 2)) {
            return 'Defending'
          } else if ((selection === 3 || selection === 4 || selection === 5)) {
            return 'Charging'
          } else {
            return 'Attacking'
          }
        }
      }
    }

    handleOpponentAction = (oA, uA) => {
      if (oA === 'Charging') {
        this.props.opponentCharge({
            player: {
              ...this.props.player,
              status: true,
            },
            opponent: {
              ...this.props.opponent,
              status: "Charging",
              animation: "glow",
              visible: !this.props.opponent.visible,
              charged: true,
              defending: false
            }
          })
      } else if (oA === 'Defending') {
        this.props.opponentDefense({
            player: {
              ...this.props.player,
              status: true,
            },
            opponent: {
              ...this.props.opponent,
              status: "Defending",
              animation: "jiggle",
              visible: !this.props.opponent.visible,
              charged: false,
              defending: true,
            }
          })
      } else {
        let oAttack = "Attacking"
        let uAttack = "Blocking"
        if (this.props.player.defending === true) {
          uAttack =  'Defending'
        }
        if (this.props.opponent.charged === true) {
          oAttack = 'Charging'
        }
        let opponentDmg = this.getDmgDelt(this.props.opponent, this.props.player, oAttack, uAttack)

        if ((this.props.player.hp - opponentDmg) < 1) {
          this.GameOver(this.props.opponent, this.props.player, this.props.opponent.hp)
        } else {
          setTimeout(() => {
            this.props.opponentPreAttack({
              ...this.props.opponent,
              status: "Attacking"
            })
            setTimeout(() => {
              this.props.opponentAttack({
                  player: {
                    ...this.props.player,
                    visible: !this.props.player.visible,
                    animation: "flash",
                    hp: (this.props.player.hp - (opponentDmg)),
                  },
                  opponent: {
                    ...this.props.opponent,
                    visible: !this.props.opponent.visible,
                    animation: "tada",
                  }
                })
              setTimeout(() => {
                this.props.opponentPostAttack({
                    player: {
                      ...this.props.player,
                      defending: false,
                      status: true,
                    },
                    opponent: {
                      ...this.props.opponent,
                      charged: false,
                      status: "Attacked",
                    }
                  })
              }, 1000)
            }, 1000)
          }, 0)
        }
      }
    }

    handlePlayerAction = (oA, uA) => {
      if (uA === 'Charging') {
        this.props.playerCharge({
          ...this.props.player,
          status: false,
          animation: "glow",
          defending: false,
          charged: true,
          visible: !this.props.player.visible})
        setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
      } else if (uA === 'Defending') {
        this.props.playerDefense({
          ...this.props.player,
          status: false,
          animation: "jiggle",
          defending: true,
          charged: false,
          visible: !this.props.player.visible})
        setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
      } else {
        let uAttack = "Attacking"
        let oAttack = "Blocking"
        if (this.props.opponent.defending === true) {
          oAttack = 'Defending'
        }
        if (this.props.player.charged === true) {
          uAttack = 'Charging'
        }
        let userDmg = this.getDmgDelt(this.props.player, this.props.opponent, uAttack, oAttack)
        if ((this.props.opponent.hp - userDmg) < 1) {
          this.GameOver(this.props.player, this.props.opponent, this.props.player.hp)
        } else {
          this.props.playerAttack({
              player: {
                ...this.props.player,
                animation: "tada",
                visible: !this.props.player.visible,
                status: false,
                charged: false,
              },
              opponent: {
                ...this.props.opponent,
                hp: (this.props.opponent.hp -(userDmg)),
                visible: !this.props.opponent.visible,
                animation: "flash",
                defending: false,
              }
            })
          setTimeout(() => this.handleOpponentAction(oA, uA), 1000)
        }
      }
    }

    handleActions = (oA, uA) => {
      this.handlePlayerAction(oA, uA)
    }

    GameOver = (winner, loser, points) => {
      let messege
      // let gamePlayer
      // let gameOpponent
      //
      // if (winner.id === this.props.player.id) {
      //   gamePlayer = winner
      //   gameOpponent = loser
      // } else {
      //   gamePlayer = loser
      //   gameOpponent = winner
      // }
      if (winner.id === this.props.player.id) {
        messege = `YOU WON WITH A SCORE OF: ${Math.floor((100 + points)*100)}`
      } else {
        messege = "DEFEATED!!!"
      }
      fetch(`${this.props.backend}/api/v1/games`, {
        method: "post",
        headers: {'content-type': 'application/json',"Authorization": this.props.token},
        body: JSON.stringify(
          {
            winner: JSON.stringify(winner),
            winner_id: winner.id,
            winner_name: winner.name,
            winner_health: winner.hp,
            loser: JSON.stringify(loser),
            loser_name: loser.name,
            loser_id: loser.id,
            loser_health: loser.hp,
            score: Math.floor((100 + points)*100),
            game_history: JSON.stringify(this.props.gameHistory)
          })
      }).then(res => res.json()).then(game => {
        this.props.endGame({
          game: {...game, mod0: messege},
          player: {
            ...this.props.player,
            defending: false,
            charged: false,
            status: true,
            visible: true,
            hp: 100,
            animation: "pulse",
          },
        })
      })
    }

    renderCardButtons = (card) => {
      return(
        <Button.Group>
          <Form.Button Compact disabled={!card.status} inverted onClick={() => this.handleActions(this.opponentAction("Attacking"), "Attacking")} content='Attack' />
          <Form.Button Compact disabled={!card.status} inverted onClick={() => this.handleActions(this.opponentAction("Defending"), "Defending")} content='Defend' />
          <Form.Button Compact disabled={!card.status} inverted onClick={() => this.handleActions(this.opponentAction("Charging"), "Charging")} content='Charge' />
        </Button.Group>
      )
    }

  render() {
    return (
      <div className="GameContainer" >
          {this.props.opponent ? <CardComponent renderCardButtons={this.renderCardButtons} /> : <Form.Button onClick={this.handleStartGame} content='Start Game' inverted />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    playerDefense: (player) => {
      dispatch({type: "PLAYER_DEFENSE", payload: player})
    },
    playerCharge: (player) => {
      dispatch({type: "PLAYER_CHARGE", payload: player})
    },
    playerAttack: (attackResult) => {
      dispatch({type: "PLAYER_ATTACK", payload: attackResult})
    },
    opponentDefense: (defenseResult) => {
      dispatch({type: "OPPONENT_DEFENSE", payload: defenseResult})
    },
    opponentCharge: (chargeResult) => {
      dispatch({type: "OPPONENT_CHARGE", payload: chargeResult})
    },
    opponentAttack: (attackResult) => {
      dispatch({type: "OPPONENT_ATTACK", payload: attackResult})
    },
    opponentPreAttack: (opponent) => {
      dispatch({type: "OPPONENT_PRE_ATTACK", payload: opponent})
    },
    opponentPostAttack: (postAttackResult) => {
      dispatch({type: "OPPONENT_POST_ATTACK", payload: postAttackResult})
    },
    endGame: (endGameResult) => {
      dispatch({type: "END_GAME", payload: endGameResult})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
