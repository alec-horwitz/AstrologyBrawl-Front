import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import 'semantic-ui-css/semantic.min.css';
import './semantic/dist/semantic.min.css';
import {createStore} from 'redux'
import reducer from './reducers/reducer'
import {Provider} from 'react-redux'
import './index.css';

const store = createStore(reducer)
// console.log(store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
