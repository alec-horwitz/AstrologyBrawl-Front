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
  water: {water:"https://cdn.pixabay.com/photo/2017/09/01/19/04/water-2705171_960_720.jpg", air:"https://c.pxhere.com/photos/2d/50/black_and_white_rain_raindrops_water_drops-983292.jpg", fire:"https://farm6.staticflickr.com/5221/5671145784_08e1e44dd4_b.jpg", earth:"https://cdn.pixabay.com/photo/2016/11/18/21/07/swamp-1836868_960_720.jpg"},
  air: {water:"https://c.pxhere.com/photos/2d/50/black_and_white_rain_raindrops_water_drops-983292.jpg", air:"https://www.publicdomainpictures.net/pictures/120000/velka/wind-mill-14274002206Yr.jpg", fire:"https://www.maxpixel.net/static/photo/1x/Himmel-Silhouette-No-Person-Body-Of-Water-Outdoor-3168851.jpg", earth:"https://cdn.pixabay.com/photo/2017/08/07/08/41/mountain-2601527_960_720.jpg"},
  fire: {water:"https://farm6.staticflickr.com/5221/5671145784_08e1e44dd4_b.jpg", air:"https://www.maxpixel.net/static/photo/1x/Himmel-Silhouette-No-Person-Body-Of-Water-Outdoor-3168851.jpg", fire:"https://images.pexels.com/photos/813042/pexels-photo-813042.jpeg", earth:"https://upload.wikimedia.org/wikipedia/commons/e/eb/The_photo_shows_burning_of_tractor_piled_slash_in_progress_somewhere_atop_Omak_Lake_Ridge._As_can_be_observed_the..._-_NARA_-_298675.jpg"},
  earth: {water:"https://cdn.pixabay.com/photo/2016/11/18/21/07/swamp-1836868_960_720.jpg", air:"https://cdn.pixabay.com/photo/2017/08/07/08/41/mountain-2601527_960_720.jpg", fire:"https://upload.wikimedia.org/wikipedia/commons/e/eb/The_photo_shows_burning_of_tractor_piled_slash_in_progress_somewhere_atop_Omak_Lake_Ridge._As_can_be_observed_the..._-_NARA_-_298675.jpg", earth:"https://c.pxhere.com/photos/e7/37/woods_path_forest_dark_night_light_spooky_trail-744882.jpg"},
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
