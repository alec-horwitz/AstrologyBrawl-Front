import {defaultBackground} from './base64Images.js'
import {menuSongs, shuffleSongList} from './songURLs.js'

const defaultState = {
  backend: `http://localhost:3000`,
  token: null,
  user: null,
  game: null,
  player: null,
  opponent: null,
  singing: false,
  showHelp: false,
  activeIndex: 0,
  mainIndex: 0,
  scorePage: 0,
  maxScorePage: 0,
  scoreColumn: null,
  scoreData: [],
  scoreDirection: null,
  defaultBackground: defaultBackground,
  arena: defaultBackground,
  songs: shuffleSongList(menuSongs),
  songIndex: 0,
  mute: false,
}


export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return defaultState;
    }
    return {...defaultState, ...JSON.parse(serializedState)}
  } catch (e) {
    return undefined
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e);
  }
}
