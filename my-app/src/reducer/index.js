import {
  GET_PASEADORES,
  GET_PASEADOR_FOR_ID,
  PUT_DETAILS_PROFILE,
  PUT_DETAILS_USER,
  GET_BY_EMAIL,
  NEW_PASEADOR,
  UBICATION_MATCH,
  ORDER,
  FILTER_PRICE,
  FILTER_UBICATION,
  FILTER_SERVICE,
  RECOVER_PASSWORD,
  NEW_PASSWORD,
  GET_CLIENTE_FOR_ID,
  PUT_DETAILS_CLIENT,
  PUT_DETAILS_PROFILE_CLIENTE,
  CLEAR_USER,
  GET_WALKERS,
  GET_CLIENTS,
  ALERT_ADMIN
} from "../actions/index";

const initialState = {
  allPaseadores: {},
  // filtersAndSort: { filters: [], sortData: {} },
  paseador: [],
  detailWalker: [],
  detailCliente: [],
  newIdCliente: [],
  cliente: {},
  newId: [],
  user: {},
  ubication: [],
<<<<<<< HEAD
  mensaje: "",
=======
  mensaje:"",
  favorites:[]
>>>>>>> 9e03a7c (Favoritos)
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_FAVORITES":
            return {
                ...state,
                favorites: action.payload
            }
            case "ADD_FAVORITES":
              return {
                  ...state,
                  favorites: action.payload
              }
    case GET_PASEADORES:
      console.log("reducer getpaseadores payload", action.payload.content);
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
      return {
        ...state,
        detailWalker: action.payload,
        newId: [],
      };

    case FILTER_PRICE:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case FILTER_SERVICE:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case FILTER_UBICATION:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case GET_BY_EMAIL:
      const { token, validate, id, walker, admin} = action.payload;
      
      return {
        ...state,
        user: {
          token,
          validate,
          id,
          walker,
          admin
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
    default:
      return state;
  }
}

export default rootReducer;
