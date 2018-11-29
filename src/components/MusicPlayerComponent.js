import React, { Component } from 'react';
import {connect} from 'react-redux'
// import PlaySongComponent from './PlaySongComponent';

class MusicPlayerComponent extends Component {

  handleNextSong = () => {
    console.log("SUCCESS");
    if (this.props.songIndex < this.props.songs) {
      this.props.handleSongChange(this.props.songIndex + 1)
    } else {
      this.props.handleSongChange(0)
    }
  }

  render() {
    return (
      <iframe
        onEnded={this.handleNextSong}
        title="MusicPlayer"
        width="0"
        height="0"
        src={!this.props.mute ? this.props.songs[this.props.songIndex].url : null}
        frameBorder="0"
        allow="autoplay; encrypted-media"
      />
    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    handleSongChange: song => {
      dispatch({type: "CHANGE_SONG", payload: song})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerComponent);
