import _ from 'lodash'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Table, Container, Button } from 'semantic-ui-react'
import UUID from 'uuid';

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
    this.handleNextPage(0, 1)
  }

  handleNextPage = (n, DidMount) => {
    let { scoreColumn, scorePage, modBoard } = this.props
    let maxScorePage
    if (DidMount) {
      fetch(`${this.props.backend}/api/v1/games/pages`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `${this.props.token}`
        }
      }).then(res => res.json()).then(maxNumScorePage => {
        maxScorePage = maxNumScorePage
      })
    } else {
      maxScorePage = this.props.maxScorePage
    }
    fetch(`${this.props.backend}/api/v1/games/pages/${Number(scorePage+n)}`, {
      headers: {
        'content-type': 'application/json',
        "Authorization": this.props.token
      }
    }).then(res => res.json()).then(games => {
      let dat = games.map(game => ({player: JSON.parse(game.winner).name, score: Number(game.score), history: JSON.parse(game.game_history)}))
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
                Winner
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={scoreColumn === 'score' ? scoreDirection : null}
                onClick={this.handleSort('score')}
                >
                Score
              </Table.HeaderCell>
              <Table.HeaderCell>

              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(scoreData, ({ score, player }) => (
              <Table.Row name={player} key={UUID()}>
                <Table.Cell>{player}</Table.Cell>
                <Table.Cell>{score}</Table.Cell>
                <Table.Cell>{<Button color='black' content='new feature coming soon' fluid />}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {scorePage ? <Button onClick={() => this.handleNextPage(-1, 0)} color='black' content='Back' icon='left arrow' labelPosition='left' /> : null}
        {scorePage !== maxScorePage ? <Button onClick={() => this.handleNextPage(1, 0)} color='black' content='Next' icon='right arrow' labelPosition='right' /> : null}
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
