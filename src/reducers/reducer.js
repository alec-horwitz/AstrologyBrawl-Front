const defaultState = {
  token: null,
  user: null,
  games: "null",
  game: null,
  opponent: null,
  uStatus: true,
  oStatus: "Your Turn",
  uAnimation: "pulse",
  oAnimation: "pulse",
  uVisible: true,
  oVisible: true,
  ohp: 100,
  uhp: 100,
  oA: "Attacking",
  oCharged: false,
  oDefending: false,
  uDefending: false,
  uCharged: false,
  singing: false,
  showHelp: false,
  activeIndex: 0,
  mainIndex: 0,
  scorePage: 0,
  maxScorePage: 0,
  scoreColumn: null,
  scoreData: [],
  scoreDirection: null,
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "INIT_DATA":
      return {...state, games: action.payload}

    case "SIGN_USER_IN":
      return {...state, user: action.payload.user, token: action.payload.token}

    case "PLAYER_DEFENSE":
      return {
        ...state,
        uStatus: false,
        uAnimation: "jiggle",
        uDefending: true,
        uCharged: false,
        uVisible: !state.uVisible
      }

    case "PLAYER_CHARGE":
      return {
        ...state,
        uStatus: false,
        uAnimation: "glow",
        uDefending: false,
        uCharged: true,
        uVisible: !state.uVisible
      }

    case "PLAYER_ATTACK":
      return {
        ...state,
        uAnimation: "tada",
        oVisible: !state.oVisible,
        uVisible: !state.uVisible,
        oAnimation: "flash",
        uStatus: false,
        oDefending: false,
        uCharged: false,
        ohp: action.payload
      }

    case "OPPONENT_DEFENSE":
      return {
        ...state,
        oStatus: "Defending",
        oAnimation: "jiggle",
        oVisible: !state.oVisible,
        uStatus: true,
        oA: "Defending",
        oCharged: false,
        oDefending: true
      }

    case "OPPONENT_CHARGE":
      return {
        ...state,
        oStatus: "Charging",
        oAnimation: "glow",
        oVisible: !state.oVisible,
        uStatus: true,
        oCharged: true,
        oA: "Charging",
        oDefending: false
      }

    case "OPPONENT_ATTACK":
      return {
        ...state,
        oVisible: !state.oVisible,
        uVisible: !state.uVisible,
        oAnimation: "tada",
        uAnimation: "flash",
        uhp: action.payload,
        oA: "Attacking"
      }

    case "OPPONENT_PRE_ATTACK":
      return {
        ...state,
        oStatus: "Attacking"
      }

    case "OPPONENT_POST_ATTACK":
      return {
        ...state,
        oCharged: false,
        uDefending: false,
        oStatus: "Attacked",
        uStatus: true
      }

    case "SIGN_USER_OUT":
      return {...state, user: null, game: null, opponent: null}

    case "FORFEIT":
    // console.log("hi");
      return {...state,
        opponent: null,
        game: null,
        ohp: 100,
        uhp: 100,
        oA: "Attacking",
        oCharged: false,
        oDefending: false,
        uDefending: false,
        uCharged: false,
        uStatus: true,
        oStatus: "Your Turn",
        uVisible: true,
        oVisible: true,
        uAnimation: "pulse",
        oAnimation: "pulse",
      }

    case "END_GAME":
      // console.log("Action", action.payload)
      console.log(state.games);
      console.log(action.payload.games);
      return {...state,
        opponent: null,
        games: action.payload.games,
        game: action.payload.game,
        ohp: 100,
        uhp: 100,
        oA: "Attacking",
        oCharged: false,
        oDefending: false,
        uDefending: false,
        uCharged: false,
        uStatus: true,
        oStatus: "Your Turn",
        uVisible: true,
        oVisible: true,
        uAnimation: "pulse",
        oAnimation: "pulse",
      }

    case "NEW_GAME":
      // console.log("Action", action.payload);
      return {...state,
        opponent: action.payload,
        ohp: 100,
        uhp: 100,
        oA: "Attacking",
        oCharged: false,
        oDefending: false,
        uCharged: false,
        uDefending: false,
        uStatus: true,
        oStatus: "Your Turn",
        uVisible: true,
        oVisible: true,
        uAnimation: "pulse",
        oAnimation: "pulse",
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
