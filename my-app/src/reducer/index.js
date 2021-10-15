import {
  GET_PASEADORES,
  GET_PASEADOR_FOR_ID,
  PUT_DETAILS_PROFILE,
  PUT_DETAILS_USER,
  LOGIN,
  NEW_PASEADOR,
  UBICATION_MATCH,
  RECOVER_PASSWORD,
  NEW_PASSWORD,
  GET_CLIENTE_FOR_ID,
  PUT_DETAILS_CLIENT,
  PUT_DETAILS_PROFILE_CLIENTE,
  CLEAR_USER,
  GET_WALKERS,
  GET_CLIENTS,
  ALERT_ADMIN,
  GET_USER_FAVORITES,
  ADD_FAVORITES,
  GET_FOR_LIST_FAV,
  PASEADORES_PREMIUM,
  GET_ASSESSMENT,
} from "../actions/index";

const initialState = {
  allPaseadores: {},
  paseador: [],
  detailWalker: [],
  detailCliente: [],
  newIdCliente: [],
  cliente: {},
  newId: [],
  user: {},
  ubication: [],
  mensaje: "",
  ordensPaseador: [],
  ordensCliente: [],
  idOrden: [],
  favorites: [],
  dataFavorites: [],
  premium: [],
  preferencias: [],
  comment: [],
  score: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case GET_ASSESSMENT:
      const { score, comment } = action.payload;
      return {
        ...state,
        score: score,
        comment: comment,
      };
    case GET_FOR_LIST_FAV:
      return {
        ...state,
        dataFavorites: action.payload,
      };
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case GET_PASEADORES:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case PUT_DETAILS_PROFILE:
      return {
        ...state,
        detailWalker: action.payload,
      };
    case PUT_DETAILS_USER:
      return {
        ...state,
        detailWalker: action.payload,
      };
    case GET_PASEADOR_FOR_ID:
      console.log("reducer payload: ", action.payload);
      return {
        ...state,
        detailWalker: action.payload,
        newId: [],
      };
    case LOGIN:
      const { token, validate, id, walker, admin } = action.payload;
      return {
        ...state,
        user: {
          token,
          validate,
          id,
          walker,
          admin,
        },
      };
    case NEW_PASEADOR:
      return {
        ...state,
        newId: action.payload.id,
      };
    case UBICATION_MATCH:
      return {
        ...state,
        ubication: action.payload,
      };
    case RECOVER_PASSWORD:
      return {
        ...state,
        mensaje: action.payload,
      };
    case NEW_PASSWORD:
      return {
        ...state,
        mensaje: action.payload,
      };

    case "GET_PREFERENCE":
      return {
        ...state,
        preferencias: action.payload,
      };
    case PASEADORES_PREMIUM:
      return {
        ...state,
        premium: action.payload,
      };
    // CLIENTE :
    case GET_CLIENTE_FOR_ID:
      return {
        ...state,
        detailCliente: action.payload,
        newIdCliente: [],
      };
    case PUT_DETAILS_PROFILE_CLIENTE:
      return {
        ...state,
        detailCliente: action.payload,
      };
    case PUT_DETAILS_CLIENT:
      return {
        ...state,
        detailCliente: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_WALKERS:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case GET_CLIENTS:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case ALERT_ADMIN:
      alert(action.payload);
      break;

    // case GET_BY_EMAIL_CLIENTE:
    //   const { token, validate, id, cliente} = action.payload;
    //    return {
    //     ...state,
    //     cliente : {
    //       token,
    //       validate,
    //       id,
    //       cliente
    //     },
    // };
    case "NEW_ORDEN":
      return {
        ...state,
        idOrden: action.payload.id,
      };
    case "GET_ORDENSUSER_PASEADOR":
      return {
        ...state,
        ordensPaseador: action.payload,
      };
    case "GET_ORDENSUSER_CLIENTE":
      return {
        ...state,
        ordensCliente: action.payload,
      };
    case "NEW_CLIENT":
      return {
        ...state,
        newId: action.payload.id,
      };

    default:
      return state;
  }
}

export default rootReducer;
