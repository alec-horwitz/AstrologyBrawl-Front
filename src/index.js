import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import 'semantic-ui-css/semantic.min.css';
import './semantic/dist/semantic.min.css';
import './index.css';
import {createStore, compose} from 'redux'
import reducer from './reducers/reducer'
import {Provider} from 'react-redux'
import { loadState, saveState } from './localStorage'

const persistedState = loadState();
const store = createStore(reducer,persistedState, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

store.subscribe(() => {
  saveState({
    token: store.getState().token,
    user: store.getState().user,
    opponent: store.getState().opponent,
  })
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
