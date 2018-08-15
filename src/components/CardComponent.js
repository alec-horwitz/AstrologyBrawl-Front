import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Segment, Container } from 'semantic-ui-react'
import './Signing.css';

class CardComponent extends Component {
  render() {

    return (

    )
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    handleSignIn: user => {
      dispatch({type: "SIGN_USER_IN", payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);
