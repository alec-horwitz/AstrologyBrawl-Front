const defaultState = {
  user: null,
  users: null,
  games: null,
  opponent: null
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "INIT_DATA":
      return {...state, users: action.payload.users, games: action.payload.games, user: action.payload.user, opponent: action.payload.opponent}

    case "SIGN_USER_IN":
      // console.log(action.payload);
      localStorage.setItem('userId', action.payload.id)
      return {...state, user: action.payload}

    case "SIGN_USER_OUT":
      localStorage.removeItem('userId')
      localStorage.removeItem('gameId')
      localStorage.removeItem('opponentId')
      return {...state, user: null, game: null, opponent: null}

    case "FORFIT":
      localStorage.removeItem('gameId')
      localStorage.removeItem('opponentId')
      return {...state, game: null, opponent: null}

    case "NEW_GAME":
      // console.log("Action", action.payload);
      localStorage.setItem('opponentId', action.payload.id)
      return {...state, opponent: action.payload}
    default:
      return state
  }
}

export default reducer
