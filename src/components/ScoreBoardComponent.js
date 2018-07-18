import _ from 'lodash'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Table } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 1 },
  { name: 'Amber', age: 40, gender: 2 },
  { name: 'Leslie', age: 25, gender: 3 },
  { name: 'Ben', age: 70, gender: 4 },
]

class ScoreBoardComponent extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentDidMount = () => {
    // console.log(this.props.games);
    let dat = this.props.games.map(game => ({player: game.playername.toString(), score: Number(game.score)}))
    this.setState({
      direction: 'descending',
      data: _.sortBy(dat, [(a) => {
        return 2000 - a.score
      }])
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (
      <Table sortable celled fixed inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'player' ? direction : null}
              onClick={this.handleSort('player')}
            >
              Player
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'score' ? direction : null}
              onClick={this.handleSort('score')}
            >
              Score
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ score, player }) => (
            <Table.Row name={player}>
              <Table.Cell>{player}</Table.Cell>
              <Table.Cell>{score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoardComponent);
