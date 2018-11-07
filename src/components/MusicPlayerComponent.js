import React, { Component } from 'react';
import {connect} from 'react-redux'

//!!!THIS CODE IS SUPER UNDER CONSTRUCTION!!!
class MusicPlayerComponent extends Component {
  mounted = 0
  myTimeout
  song = 0

  willUnmount = () => {
    clearTimeout(this.myTimeout);
  }

  componentDidMount = () => {
    // this.soundTrack(this.props.songs) // Not working yet
    this.mounted++
    console.log(this.props.songs); // logs playlist
  }

  soundTrack = (songs) => {
    //The Danger Zone!!! (i.e. The part that is the most under construction)
    let differences = [...songs.keys()].filter((index) => {
      return !(songs[index].name === this.props.songs[index].name)
    })
    // if (differences.length < 1) {
    // } else {
    //   clearTimeout(myTimeout);
    // }

    if ((this.props.songIndex < this.props.songs.length) && (this.props.songIndex === this.song) && (differences.length < 1)) {
      let duration = this.props.songs[this.song].duration
      this.myTimeout = setTimeout(() => {
        if ((this.props.songIndex < this.props.songs.length) && (this.props.songIndex === this.song) && (differences.length < 1)) {
          this.song++
          this.props.handleSongChange(this.song)
          this.soundTrack(songs, this.song)
        } else {
          clearTimeout(this.myTimeout);
        }
      }, duration)
    } else {
      clearTimeout(this.myTimeout);
    }

    // else {
    //   this.props.handleSongChange(current),
    //   this.soundTrack(songs, current)
    // }
  }

  iframeRender = () => {
    return (<iframe
      title="MusicPlayer"
      width="0"
      height="0"
      src={this.props.songs[this.song].url}
      frameBorder="0"
      allow="autoplay; encrypted-media"
    />)
  }


  render() {
    // Without the soundTrack() function working will only play the first song on the playlist once unless you switch between the battle and main menu screen
    return (
      <iframe
        title="MusicPlayer"
        width="0"
        height="0"
        src={!this.props.mute ? this.props.songs[this.song].url : null}
        frameBorder="0"
        allow="autoplay; encrypted-media"
      />
    )
    // <div>
    //   {!this.props.mute ? this.iframeRender() : null}
    // </div>
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
