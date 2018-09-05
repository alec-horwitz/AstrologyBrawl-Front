import React, { Component } from 'react';
import {Form, Container} from 'semantic-ui-react'
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

const Avatars = {
  Aquarius: 'https://onehdwallpaper.com/wp-content/uploads/2015/08/Aquarius-Horoscope-Desktop-Backgrounds.jpg',
  Gemini: 'https://www.englishclub.com/efl/wp-content/uploads/2011/07/03c-Gemini.png',
  Libra: 'https://1.bp.blogspot.com/-dVGP128g-ns/UbTyCKx2H9I/AAAAAAAAAl0/9DelDJUENCU/s1600/Libra.jpg',
  Taurus: 'https://2.bp.blogspot.com/_01YItv3gFfo/S8R4S2NwnMI/AAAAAAAAAJY/eqScVtI_Zb4/s1600/Taurus-Zodiac-Sign-1.jpeg',
  Virgo: 'https://1.bp.blogspot.com/-C3Wv_yKA4U8/TiRe7toN5lI/AAAAAAAACT4/HEm3QnRw1k4/s1600/virgo11.jpg',
  Capricorn: 'https://1.bp.blogspot.com/-vRML1Dg9ECg/UWg6fAv0EcI/AAAAAAAAFFo/3WaNG6V8j9s/s1600/zodiac1+capricorn.jpg',
  Pisces: 'https://4.bp.blogspot.com/-XAXArbVtBcY/UD9tPBPIfiI/AAAAAAAAIvY/ZVGw9jSoCoo/s1600/Pisces+Wallpapers.jpg',
  Cancer: 'https://4.bp.blogspot.com/-jF9rRjCTB-w/UI7svYw69uI/AAAAAAAATyM/X-2h4w_kQSg/s1600/4Cancer-Zodiac-Sign-1.jpeg',
  Scorpio: 'http://pixfeeds.com/images/18/463850/1200-614609158-scorpio-sign.jpg',
  Aries: 'https://2.bp.blogspot.com/_WeQf3HIdYws/S_YL1j9bncI/AAAAAAAAAAc/1M-mJkzfMng/s1600/aries.jpg',
  Leo: 'https://2.bp.blogspot.com/-1_2dylpfIqg/UV_hyTbRl_I/AAAAAAAAFAI/iZChMtwrNvo/s1600/Leo-Zodiac-Sign-1.jpeg',
  Sagittarius: 'https://2.bp.blogspot.com/-obkvSdEM3jY/UWaJwGUfL7I/AAAAAAAAFEc/fTgiP_0KJaE/s1600/Sagittarius.jpeg'
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
    passwordConfirmation: "",
    email: "",
    type1: "",
    type2: "",
    type3: "",
    avatar: "",
    notFound: null
  }
  hamdleSubmit = (e) => {
    let s = this.state
    e.preventDefault()
    if (s.name.length && s.password.length && s.type1.length && s.type2.length && s.type3.length && (s.passwordConfirmation === s.password)) {
      fetch(`https://astrology-brawl-back.herokuapp.com/api/v1/users`, {
        method: "post",
        headers: {'content-type': 'application/json',},
        body: JSON.stringify({
          name: s.name,
          password: s.password,
          avatar: Avatars[s.type1],
          main: "15",
          attack: "5",
          defence: "5",
          type1: types[s.type1],
          type2: types[s.type2],
          type3: types[s.type3]
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
