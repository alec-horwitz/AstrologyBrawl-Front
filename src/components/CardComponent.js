import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Feed, Container, Divider, Responsive, Button, Grid, Transition, Card, Image, Progress, Segment, Form } from 'semantic-ui-react';
import MusicPlayerComponent from '../components/MusicPlayerComponent';

const bottonGroupStyle = {textAlign: `center`};

class CardComponent extends Component {
  renderCard = (card, opponent) => {
    return(
      <Transition animation={card.animation} duration={500} visible={card.visible}>
        <Card color='red' className="myCard">
          <Responsive minWidth={740} >
            <Card.Content>
              <Progress percent={Math.floor(card.hp)} inverted color='red' progress label={card.name} />
              <Image src={card.avatar} />
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {card.main} {card.type1}</Grid.Column>
                  <Grid.Column>Defense: {card.main} {card.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {card.attack} {card.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {card.defence} {card.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>

            <Card.Content>
              {opponent ? <Segment inverted>{card.status}</Segment> : this.props.renderCardButtons(card)}
            </Card.Content>
          </Responsive>
          <Responsive maxWidth={739} >
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image={card.avatar} />
                  <Feed.Content>
                    <Card.Header>
                      <Progress percent={Math.floor(card.hp)} inverted color='red' progress size='tiny' label={card.name}/>
                    </Card.Header>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
              <Grid >
                <Grid.Row columns={2}>
                  <Grid.Column>Damage: {card.main} {card.type1}</Grid.Column>
                  <Grid.Column>Defense: {card.main} {card.type1}</Grid.Column>
                  <Grid.Column floated='left' >Dmg Mod: {card.attack} {card.type2}</Grid.Column>
                  <Grid.Column floated='right'>Def Mod: {card.defence} {card.type3}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content extra>
              {opponent ? <Segment inverted>{card.status}</Segment> : this.props.renderCardButtons(card)}
            </Card.Content>
          </Responsive>
        </Card>
      </Transition>
    )
  }

  render() {
    return (
      <div style={bottonGroupStyle}>
        {true ? <MusicPlayerComponent /> : null}
        <Divider hidden/>
        <Button.Group >
          <Form.Button Compact color='black' onClick={this.props.handleAudioToggle} content='Toggle Audio' />
          <Form.Button Compact color='black' onClick={this.props.help} content='Help' />
          <Form.Button Compact color='black' onClick={() => this.props.forfeit({
              ...this.props.user,
              hp: Number(this.props.user.hp),
              charged: (this.props.user.charged === "true"),
              defending: (this.props.user.defending === "true"),
              status: this.props.user.status,
              visible: (this.props.user.visible === "true"),
              animation: this.props.user.animation,
            })} content='Forfeit' />
          </Button.Group>
          <Divider hidden/>
          <Card.Group centered textAlign="center">
            {this.renderCard(this.props.opponent, 1)}
            <Divider hidden/>
            {this.renderCard(this.props.player, 0)}
          </Card.Group>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    forfeit: (player) => {
      dispatch({type: "FORFEIT", payload: player})
    },
    help: () => {
      dispatch({type: "HELP"})
    },
    handleAudioToggle: () => {
      dispatch({type: "TOGGLE_MUTE"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
