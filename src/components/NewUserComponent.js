import React, { Component } from 'react';
import {Form} from 'semantic-ui-react'
import {connect} from 'react-redux'

const types = {
  Aquarius: 'air',
  Gemini: 'air',
  Libra: 'air',
  Taurus: 'earth',
  Virgo: 'earth',
  Capricorn: 'earth',
  Pisces: 'water',
  Cancer: 'water',
  Scorpio: 'water',
  Aries: 'fire',
  Leo: 'fire',
  Sagittarius: 'fire'
}

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
    email: "",
    type1: "",
    type2: "",
    type3: "",
    notFound: null
  }
  hamdleSubmit = (e) => {
    e.preventDefault()
    // console.log(this.state);
    let user = this.props.users.filter(user => (user.name === this.state.name) && (user.email === this.state.email));
    if (!user.length) {
      // console.log("msg recived");
    } else {
      this.setState({
        notFound: true
      })
    }
  }

  handleChange = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSelection = (e, v) => {
    // console.log(v.name);
    this.setState({
      [v.name]: v.value
    })
  }
  render() {
    const style={color:"red"}
    return (
      <div className="NewUserComponent">
          <h1> {`${"Sign Up"}`} </h1>
          {this.state.notFound ? <p style={style}>{`${"ERROR: Username or Email already in use"}`}</p> : null}
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
              placeholder="Email Address"
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
            />
            <Form.Select
              options={options}
              name="type1"
              onChange={this.handleSelection}
              placeholder='Your Sun Sign' error
            />
            <Form.Select
              options={options}
              name="type2"
              onChange={this.handleSelection}
              placeholder='Your Rising Sign' error
            />
            <Form.Select
              options={options}
              name="type3"
              onChange={this.handleSelection}
              placeholder='Your Moon Sign' error
            />
            <Form.Button content='Submit' />
          </Form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    signUpSubmitted: (user, users) => {
      // e.preventDefault()
      dispatch({type: "SIGN_USER_IN", payload: {user: user, users: users}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);
