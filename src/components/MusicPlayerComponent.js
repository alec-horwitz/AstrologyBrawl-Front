import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Signing.css';

class MusicPlayerComponent extends Component {

  soundTrack = (delay) => {
    //The Danger Zone!!!
    // setTimeout(() => {
    //   this.props.handleSongChange(this.props.songIndex < (this.props.songs.length - 1) ? this.props.songIndex+1 : 0)
    //   this.soundTrack(this.props.songIndex, Number(this.props.songs[this.props.songIndex].duration))
    // }, delay)
  }

  iframeRender = () => {
    console.log(this.props.songs[this.props.songIndex].name);
    return (
      <iframe
        title="MusicPlayer"
        width="15%"
        height="20"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={this.props.songs[this.props.songIndex].url}
      />
    )
  }


  render() {
    this.soundTrack(0)
    return (
      <div className="MusicPlayer">
        {this.iframeRender()}
      </div>
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
