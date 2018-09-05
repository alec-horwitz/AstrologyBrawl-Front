import React, { Component } from 'react';
import {Form, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'
import './Signing.css';

class SigningComponent extends Component {
  state = {
    name: "",
    password: "",
    notFound: null
  }
  hamdleSubmit = (e) => {
    e.preventDefault()
    let name
    let password
    e.target.password.value ? password = e.target.password.value : password = null
    e.target.name.value ? name = e.target.name.value : name = null
    fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/sessions`, {
      method: "post",
      headers: {'content-type': 'application/json',},
      body: JSON.stringify({
        name: name,
        password: password,
      })
    }).then(res => res.json()).then(login => {
      if (login.token) {
        this.props.handleSignIn({user: {
          ...login.user,
          hp: Number(login.user.hp),
          charged: (login.user.charged === "true"),
          defending: (login.user.defending === "true"),
          status: true,
          visible: (login.user.visible === "true"),
          animation: "pulse",
        }, token: login.token})
      } else {
        this.setState({
          notFound: true
        })
      }
    })

  }

  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const style={color:"red"}
    return (
      <Container className="SigningComponent">
          <h1> Sign In</h1>
          {this.state.notFound ? <p style={style}>{`${"ERROR: Incorrect Username or Password"}`}</p> : null}
          <Form onSubmit = {this.hamdleSubmit}>
            <Form.Input
              placeholder="Username"
              onChange={this.handleTextChange}
              name="name"
              value={this.state.name}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              onChange={this.handleTextChange}
              name="password"
              value={this.state.password}
            />
            <Form.Button color='black' content='Submit' />
          </Form>
      </Container>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(SigningComponent);
