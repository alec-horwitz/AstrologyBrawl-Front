import React, { Component } from 'react';
import {Form, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'

const options = [
  { key: 'aqu', text: 'Aquarius', value: 'Aquarius' },
  { key: 'gem', text: 'Gemini', value: 'Gemini' },
  { key: 'lib', text: 'Libra', value: 'Libra' },
  { key: 'tau', text: 'Taurus', value: 'Taurus' },
  { key: 'vir', text: 'Virgo', value: 'Virgo' },
  { key: 'cap', text: 'Capricorn', value: 'Capricorn' },
  { key: 'pis', text: 'Pisces', value: 'Pisces' },
  { key: 'can', text: 'Cancer', value: 'Cancer' },
  { key: 'sco', text: 'Scorpio', value: 'Scorpio' },
  { key: 'ari', text: 'Aries', value: 'Aries' },
  { key: 'leo', text: 'Leo', value: 'Leo' },
  { key: 'sag', text: 'Sagittarius', value: 'Sagittarius' }
]

class NewUserComponent extends Component {
  state = {
    name: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    sign1: "",
    sign2: "",
    sign3: "",
    notFound: null
  }
  hamdleSubmit = (e) => {
    let s = this.state
    e.preventDefault()
    if (s.name.length && s.password.length && s.sign1.length && s.sign2.length && s.sign3.length && (s.passwordConfirmation === s.password)) {
      fetch(`http://localhost:3000/api/v1/users`, {
        method: "post",
        headers: {'content-type': 'application/json',},
        body: JSON.stringify({
          name: s.name,
          password: s.password,
          email: s.email,
          sign1: s.sign1,
          sign2: s.sign2,
          sign3: s.sign3
        })
      }).then(res => res.json()).then(userData => {
        if (userData.token) {
          this.props.handleSignIn({user: {
            ...userData.user,
            hp: Number(userData.user.hp),
            charged: (userData.user.charged === "true"),
            defending: (userData.user.defending === "true"),
            status: true,
            visible: (userData.user.visible === "true"),
            animation: "pulse",
          }, token: userData.token})
        } else {
          this.setState({
            notFound: true
          })
        }
      })
    } else {
      this.setState({
        notFound: true
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSelection = (e, v) => {
    this.setState({
      [v.name]: v.value
    })
  }
  render() {
    const style={color:"red"}
    return (
      <Container className="NewUserComponent">
          <h1> {`${"Sign Up"}`} </h1>
          {this.state.notFound ? <p style={style}>{`${"ERROR: Username or Email already in use, fields left blank, or Passwords don't match."}`}</p> : null}
          <Form onSubmit = {this.hamdleSubmit}>
            <Form.Input
              placeholder="Username"
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
            />
            <Form.Input
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
            />
            <Form.Input
              type="password"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
            />
            <Form.Input
              placeholder="Email Address"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
            />
            <Form.Select
              options={options}
              name="sign1"
              onChange={this.handleSelection}
              placeholder='Your Sun Sign' error
            />
            <Form.Select
              options={options}
              name="sign2"
              onChange={this.handleSelection}
              placeholder='Your Rising Sign' error
            />
            <Form.Select
              options={options}
              name="sign3"
              onChange={this.handleSelection}
              placeholder='Your Moon Sign' error
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);
