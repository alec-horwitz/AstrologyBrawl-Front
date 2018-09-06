import React, { Component } from 'react';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import HelpComponent from './components/HelpComponent';
import {connect} from 'react-redux'
import GameContainer from './containers/GameContainer';
import FormContainer from './containers/FormContainer';
import {Responsive, Form, Container, Button, Divider} from 'semantic-ui-react'
import './App.css';

const bottonGroupStyle = {
  textAlign: `center`
};

const typeArena = {
  water: {water:"https://cdn1.theinertia.com/wp-content/gallery/socal-texture/mg_4906.jpg", air:"https://upload.wikimedia.org/wikipedia/commons/2/2b/Hurricane_Paul_23_oct_2006_1500Z.jpg", fire:"https://farm6.staticflickr.com/5221/5671145784_08e1e44dd4_b.jpg", earth:"https://www.travelblissnow.com/wp-content/uploads/2017/05/flood-trees-1020x682.jpg"},
  air: {water:"https://upload.wikimedia.org/wikipedia/commons/2/2b/Hurricane_Paul_23_oct_2006_1500Z.jpg", air:"https://tau0.files.wordpress.com/2017/07/windpower-12.jpg", fire:"https://images.pexels.com/photos/959334/storm-clouds-clouds-sky-thunderstorm-959334.jpeg", earth:"https://2.bp.blogspot.com/-qlpBja9gLkU/T8Qjxx0ixNI/AAAAAAAALzM/2GdybjSQZ7Y/s1600/10818370-lg.jpg"},
  fire: {water:"https://farm6.staticflickr.com/5221/5671145784_08e1e44dd4_b.jpg", air:"https://images.pexels.com/photos/959334/storm-clouds-clouds-sky-thunderstorm-959334.jpeg", fire:"https://extraordinarymindspace.files.wordpress.com/2012/03/fire.jpg", earth:"https://images.pexels.com/photos/799467/pexels-photo-799467.jpeg"},
  earth: {water:"https://www.travelblissnow.com/wp-content/uploads/2017/05/flood-trees-1020x682.jpg", air:"https://2.bp.blogspot.com/-qlpBja9gLkU/T8Qjxx0ixNI/AAAAAAAALzM/2GdybjSQZ7Y/s1600/10818370-lg.jpg", fire:"https://images.pexels.com/photos/799467/pexels-photo-799467.jpeg", earth:"https://www.maxpixel.net/static/photo/1x/Woods-Dark-Trail-Spooky-Forest-Light-Path-Night-690415.jpg"},
}

class App extends Component {

  handleStartGame = () => {
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users/random/${this.props.user.id}`, {
      headers: {
        'content-type': 'application/json',
        "Authorization": this.props.token
      }
    }).then(res => res.json()).then(opponent => {
        this.props.newGame({
          opponent: {
            ...opponent,
            hp: Number(opponent.hp),
            charged: (opponent.charged === "true"),
            defending: (opponent.defending === "true"),
            status: opponent.status,
            visible: (opponent.visible === "true"),
            animation: opponent.animation,
          },
          player: {
            ...this.props.user,
            hp: Number(this.props.user.hp),
            charged: (this.props.user.charged === "true"),
            defending: (this.props.user.defending === "true"),
            status: this.props.user.status,
            visible: this.props.user.visible,
            animation: this.props.user.animation,
          },
          arena: typeArena[this.props.user.type1][opponent.type1]
        })
    })
  }

  getArena = () => {


    return "https://il6.picdn.net/shutterstock/videos/711148/thumb/1.jpg"
  }

  optionRender = () => {
    if (this.props.token) {
      if (this.props.opponent) {
        return (
          <div style={bottonGroupStyle}>
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
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
            <GameContainer />
          </div>
        )
      } else {
        console.log(this.props);
        return (
          <Container textAlign="center">
            <Responsive as={Divider} minWidth={700} hidden/>
            <Button.Group >
              <Form.Button color='black' onClick={this.handleStartGame} content='New Game' />
              <Form.Button color='black' onClick={this.props.handleSignOut} content='Sign Out' />
            </Button.Group>
            <Responsive as={Divider} minWidth={700} hidden/>
            <h1> {this.props.game ? this.props.game.mod0 : null} </h1>
            <Responsive as={Divider} minWidth={700} hidden/>
            <h1>Score Board</h1>
            <ScoreBoardComponent />
            <Responsive as={Divider} minWidth={700} hidden/>
          </Container>
        )
      }
    } else {
      return (
        <FormContainer />
      )
    }
  }

  render() {
    // let inlineStyle = {
    //   backgroundImage: 'url("' + `https://wallpaper-house.com/data/out/10/wallpaper2you_419584.jpg` + '")',
    //   backgroundRepeat: `no-repeat`,
    //   backgroundPosition: `center center`,
    //   backgroundAttachment: `fixed`
    // };
    console.log(this.props);
    document.body.style.backgroundImage = 'url("' + this.props.arena + '")'

    return (
      <div className="App">
        {this.props.showHelp ? <HelpComponent /> : null}
        {this.optionRender()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    dataInit: (initData) => {
      dispatch({type: "INIT_DATA", payload: initData})
    },
    newGame: (newGameResult) => {
      dispatch({type: "NEW_GAME", payload: newGameResult})
    },
    handleSignOut: () => {
      dispatch({type: "SIGN_USER_OUT"})
    },
    forfeit: (player) => {
      dispatch({type: "FORFEIT", payload: player})
    },
    help: () => {
      dispatch({type: "HELP"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
