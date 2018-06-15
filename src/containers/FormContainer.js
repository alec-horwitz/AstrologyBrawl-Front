import React, { Component } from 'react';
import SigningComponent from '../components/SigningComponent';
import NewUserComponent from '../components/NewUserComponent';
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'

class FormContainer extends Component {
  render() {
    // console.log(this.props);
    // <NewUserComponent />
    return (
      <div className="FormContainer">
        {this.props.user ? <Form.Button inverted onClick={this.props.handleSignOut} content='Sign Out' /> : <SigningComponent />}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    handleSignOut: () => {
      dispatch({type: "SIGN_USER_OUT"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
