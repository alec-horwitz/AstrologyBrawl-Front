import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Responsive, Button, Form, Divider } from 'semantic-ui-react';
import CardComponent from '../components/CardComponent';
import MusicPlayerComponent from '../components/MusicPlayerComponent';
import './Game.css';

const bottonGroupStyle = {
  textAlign: `center`
};

class GameContainer extends Component {

  render() {
    return (
      <div className="GameContainer" style={bottonGroupStyle}>
        {true ? <MusicPlayerComponent /> : null}
        <Responsive as={Divider} minWidth={700} hidden/>
        <Button.Group >
          <Form.Button color='black' onClick={this.props.handleAudioToggle} content='Toggle Audio' />
          <Form.Button color='black' onClick={this.props.help} content='Help' />
          <Form.Button color='black' onClick={() => this.props.forfeit({
              ...this.props.user,
              hp: Number(this.props.user.hp),
              charged: (this.props.user.charged === "true"),
              defending: (this.props.user.defending === "true"),
              status: this.props.user.status,
              visible: (this.props.user.visible === "true"),
              animation: this.props.user.animation,
            })} content='Forfeit' />
          </Button.Group>
          <Responsive as={Divider} minWidth={700} hidden/>
          {this.props.opponent ? <CardComponent /> : <Form.Button onClick={this.handleStartGame} content='Start Game' inverted />}
      </div>
    );
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
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
