const defaultState = {
  user: null,
  users: null,
  game: null,
  games: null,
  opponent: null
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "INIT_DATA":
      return {...state, users: action.payload.users, games: action.payload.games, user: action.payload.user, game: action.payload.game, opponent: action.payload.opponent}

    case "SIGN_USER_IN":
      // console.log(action.payload);
      localStorage.setItem('userId', action.payload.id)
      return {...state, user: action.payload}

    case "SIGN_USER_OUT":
      localStorage.removeItem('userId')
      localStorage.removeItem('gameId')
      localStorage.removeItem('opponentId')
      return {...state, user: null, game: null}

    case "NEW_GAME":
      // console.log("Action", action.payload);
      localStorage.setItem('opponentId', action.payload.opponent.id)
      localStorage.setItem('gameId', action.payload.game.id)
      return {...state, game: action.payload, opponent: action.payload.opponent}
    default:
      return state
  }
}

export default reducer
