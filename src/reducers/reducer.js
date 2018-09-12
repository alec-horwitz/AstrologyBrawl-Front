const defaultState = {
  token: null,
  user: null,
  games: "null",
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
  defultBackground: `https://wallpaper-house.com/data/out/10/wallpaper2you_419584.jpg`,
  arena: `https://wallpaper-house.com/data/out/10/wallpaper2you_419584.jpg`,
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    // case "INIT_DATA":
    //   return {...state, games: action.payload}

    case "SIGN_USER_IN":
      return {...state, user: action.payload.user, token: action.payload.token}

    case "PLAYER_DEFENSE":
      return {
        ...state,
        player: action.payload,
      }

    case "PLAYER_CHARGE":
      return {
        ...state,
        player: action.payload,
      }

    case "PLAYER_ATTACK":
      return {
        ...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
      }

    case "OPPONENT_DEFENSE":
      return {
        ...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
      }

    case "OPPONENT_CHARGE":
      return {
        ...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
      }

    case "OPPONENT_ATTACK":
      return {
        ...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
      }

    case "OPPONENT_PRE_ATTACK":
      return {
        ...state,
        opponent: action.payload,
      }

    case "OPPONENT_POST_ATTACK":
      return {
        ...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
      }

    case "SIGN_USER_OUT":
      return {...state, user: null, token: null, player: null, game: null, opponent: null}

    case "FORFEIT":
      return {...state,
        player: action.payload,
        opponent: null,
        game: null,
        arena: state.defultBackground,
      }

    case "END_GAME":
      return {...state,
        player: action.payload.player,
        opponent: null,
        game: action.payload.game,
        arena: state.defultBackground,
      }

    case "NEW_GAME":
      return {...state,
        player: action.payload.player,
        opponent: action.payload.opponent,
        arena: action.payload.arena,
      }

    case "SWITCH_SIGNING":
      return {...state, singing: !state.singing}

    case "HELP":
      return {...state, showHelp: !state.showHelp}

    case "NEW_INDEX":
      return {...state, activeIndex: action.payload}

    case "MAIN_INDEX":
      return {...state, mainIndex: action.payload}

      case "SCOREBOARD_MOD":
        return {...state,
        scorePage: action.payload.scorePage,
        maxScorePage: action.payload.maxScorePage,
        scoreColumn: action.payload.scoreColumn,
        scoreData: action.payload.scoreData,
        scoreDirection: action.payload.scoreDirection}

    default:
      return state
  }
}

export default reducer
