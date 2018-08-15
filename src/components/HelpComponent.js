import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Grid, Icon, Accordion, Button, Modal} from 'semantic-ui-react'

const inlineStyle = {
 marginTop: `0px !important`,
 marginLeft: `auto`,
 marginRight: `auto`
};

class HelpComponent extends Component {
  handleSetIndex = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.props
    const newIndex = activeIndex === index ? -1 : index

    this.props.setIndex(newIndex)
  }

  handleActionsIndex = (e, titleProps) => {
    const { index } = titleProps
    const { mainIndex } = this.props
    const newActionsIndex = mainIndex === index ? -1 : index

    this.props.setActionsIndex(newActionsIndex)
  }

  render() {

    return (
      <Modal open={true} onClose={this.props.help} style={inlineStyle} basic closeIcon>
        <Modal.Content>
          <Accordion inverted>

            <Accordion.Title active={this.props.mainIndex === 0} index={0} onClick={this.handleActionsIndex} inverted>
              <h1>Actions<Icon name='dropdown' /></h1>
            </Accordion.Title>
            <Accordion.Content active={this.props.mainIndex === 0} inverted>
              <p>
                <Accordion.Title active={this.props.activeIndex === 0} index={0} onClick={this.handleSetIndex} inverted>
                  <Button inverted>Attack</Button>
                  <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content active={this.props.activeIndex === 0} inverted>
                  <h3>
                    Your basic attack action. By default the opponent still absorbs damage based on they're defence stats.
                  </h3>
                  <p>
                    <h5>
                      Here's a simplified equation for how the basic attack damage is calculated: <br/>
                      ((Player's Damage * Player's Damage Type Multipier) + (Player's Damage Modifier * Player's Damage Modifier Type Multipier) + (A Number Between 1 And The Player's Damage Modifier)) - Opponent's Defence <br/><br/>
                      Here's a simplified equation for how damage is taken when not defending: <br/>
                      Opponent's Attack - ((Player's Damage) + (A Number Between 1 And The Player's Defence Modifier))
                    </h5>
                  </p>
                </Accordion.Content>
              </p>
              <p>
                <Accordion.Title active={this.props.activeIndex === 1} index={1} onClick={this.handleSetIndex} inverted>
                  <Button inverted>Defend</Button>
                  <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content active={this.props.activeIndex === 1} inverted>
                  <h3>
                    When defending you sacrifice your turn so that you absorb more damage durring your opponent's turn.
                  </h3>
                  <p>
                    <h5>
                      EFFECTS DO NOT STACK <br/><br/>
                      Here's a simplified equation for how damage is taken when defending: <br/>
                      ((Opponent's Attack/3) - 10) * 3 <br/><br/>
                      Even if this formula results in a number less then 3 you will still recive 3 points of damage as the bare minimum.
                    </h5>
                  </p>
                </Accordion.Content>
              </p>
              <p>
              <Accordion.Title active={this.props.activeIndex === 2} index={2} onClick={this.handleSetIndex} inverted>
                <Button inverted>Charge</Button>
                <Icon name='dropdown' />
              </Accordion.Title>
              <Accordion.Content active={this.props.activeIndex === 2} inverted>
                <h3>
                  Sacrifice your turn so that your attack action does more damage on your next turn.
                </h3>
                <p>
                  <h5>
                    EFFECTS DO NOT STACK <br/><br/>
                    Here's a simplified equation for how the charged attack damage is calculated: <br/>
                    ((10 * Player's Damage Type Multipier) - (Opponent's Defence/3)) +
                    ((10 * Player's Damage Modifier Type Multipier) - (Opponent's Defence/3)) +
                    ((10 * Player's Defence Modifier Type Multipier) - (Opponent's Defence/3))<br/><br/>
                    Even if this formula results in a number less then 3 you will still recive 3 points of damage as the bare minimum.
                  </h5>
                </p>
              </Accordion.Content>
            </p>
            </Accordion.Content>
            <Accordion.Title active={this.props.mainIndex === 1} index={1} onClick={this.handleActionsIndex} inverted>
              <h1>Type Multipiers<Icon name='dropdown' /></h1>
            </Accordion.Title>
            <Accordion.Content active={this.props.mainIndex === 1} inverted>
            <p>
              <h3>
                The type multipier helps determine how different elements inflict damage on eachother.
              </h3>
              <p>
                <h5>
                  Here's the table that determines what a given type multiplier is: <br/>
                </h5>
                <Grid columns='equal' textAlign='center' celled>
                  <Grid.Row color='black' >
                    <Grid.Column>X</Grid.Column>
                    <Grid.Column>Earth</Grid.Column>
                    <Grid.Column>Air</Grid.Column>
                    <Grid.Column>Fire</Grid.Column>
                    <Grid.Column>Water</Grid.Column>
                  </Grid.Row>
                  <Grid.Row color='black' >
                    <Grid.Column>Earth</Grid.Column>
                    <Grid.Column>0.5</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>1.5</Grid.Column>
                  </Grid.Row>
                  <Grid.Row color='black' >
                    <Grid.Column>Air</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>0.5</Grid.Column>
                    <Grid.Column>1.5</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                  </Grid.Row>
                  <Grid.Row color='black' >
                    <Grid.Column>Fire</Grid.Column>
                    <Grid.Column>1.5</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>0.5</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                  </Grid.Row>
                  <Grid.Row color='black' >
                    <Grid.Column>Water</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>1.5</Grid.Column>
                    <Grid.Column>1.0</Grid.Column>
                    <Grid.Column>0.5</Grid.Column>
                  </Grid.Row>
                </Grid>
              </p>
            </p>
          </Accordion.Content>
        </Accordion>
      </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    setIndex: (newIndex) => {
      dispatch({type: "NEW_INDEX", payload: newIndex})
    },
    setActionsIndex: (newActionsIndex) => {
      dispatch({type: "MAIN_INDEX", payload: newActionsIndex})
    },
    help: () => {
      dispatch({type: "HELP"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpComponent);
