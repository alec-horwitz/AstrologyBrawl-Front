import _ from 'lodash'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Table, Container, Button } from 'semantic-ui-react'

class ScoreBoardComponent extends Component {

  handleSort = clickedColumn => () => {
    let { scoreColumn, scoreData, scoreDirection, scorePage, maxScorePage, modBoard } = this.props

    if (scoreColumn !== clickedColumn) {
      modBoard({
        scorePage: scorePage,
        maxScorePage: maxScorePage,
        scoreColumn: clickedColumn,
        scoreData: _.sortBy(scoreData, [clickedColumn]),
        scoreDirection: 'ascending',
      })
    } else {
      modBoard({
        scorePage: scorePage,
        maxScorePage: maxScorePage,
        scoreColumn: scoreColumn,
        scoreData: scoreData.reverse(),
        scoreDirection: scoreDirection === 'ascending' ? 'descending' : 'ascending',
      })
    }
  }

  componentDidMount = () => {
    let { scoreColumn, scorePage, modBoard } = this.props
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/games/pages/${Number(scorePage)}`).then(res => res.json()).then(games => {
      fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/games/pages`).then(res => res.json()).then(maxScorePage => {
        let dat = games.map(game => ({player: game.playername.toString(), score: Number(game.score)}))
        modBoard({
          scorePage: 0,
          maxScorePage: maxScorePage,
          scoreColumn: scoreColumn,
          scoreDirection: 'descending',
          scoreData: _.sortBy(dat, [(a) => {
            return 2000 - a.score
          }])
        })
      })
    })
  }

  handleNextPage = (n) => {
    let { scoreColumn, scoreData, scoreDirection, scorePage, maxScorePage, modBoard } = this.props
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/games/pages/${Number(scorePage+n)}`).then(res => res.json()).then(games => {
      let dat = games.map(game => ({player: game.playername.toString(), score: Number(game.score)}))
      modBoard({
        scorePage: scorePage + n,
        maxScorePage: maxScorePage,
        scoreColumn: scoreColumn,
        scoreDirection: 'descending',
        scoreData: _.sortBy(dat, [(a) => {
          return 2000 - a.score
        }])
      })
    })
  }

  render() {
    let { scoreColumn, scoreData, scoreDirection, scorePage, maxScorePage } = this.props

    return (
      <Container textAlign="center">
        <Table sortable celled fixed inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={scoreColumn === 'player' ? scoreDirection : null}
                onClick={this.handleSort('player')}
                >
                Player
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={scoreColumn === 'score' ? scoreDirection : null}
                onClick={this.handleSort('score')}
                >
                Score
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(scoreData, ({ score, player }) => (
              <Table.Row name={player}>
                <Table.Cell>{player}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {scorePage ? <Button onClick={() => this.handleNextPage(-1)} color='black' content='Back' icon='left arrow' labelPosition='left' /> : null}
        {scorePage !== maxScorePage ? <Button onClick={() => this.handleNextPage(1)} color='black' content='Next' icon='right arrow' labelPosition='right' /> : null}
      </Container>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    modBoard: (boardMod) => {
      dispatch({type: "SCOREBOARD_MOD", payload: boardMod})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoardComponent);
