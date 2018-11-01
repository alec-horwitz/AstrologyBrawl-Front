import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {} from 'semantic-ui-react'

class TemplateComponent extends Component {

  render() {
    return (
      <div className="TemplateComponent">

      </div>
    );
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  return {
    notDefined: (notDefined) => {
      dispatch({type: "NOT_DEFINED", payload: notDefined})
    },
  }

export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
