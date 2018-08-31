import React, { Component } from 'react';
import SigningComponent from '../components/SigningComponent';
import NewUserComponent from '../components/NewUserComponent';
import {connect} from 'react-redux'
import {Form, Container} from 'semantic-ui-react'

class FormContainer extends Component {
  render() {
    return (
      <div className="FormContainer">
        <Container textAlign="right">
          <Form.Button color='black' onClick={this.props.handleClick} content={this.props.singing ? 'Sign In' : 'Sign Up'} />
        </Container>
        {this.props.singing ? <NewUserComponent /> : <SigningComponent />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    handleClick: () => {
      dispatch({type: "SWITCH_SIGNING"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
