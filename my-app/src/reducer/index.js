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
  NEW_PASSWORD
} from "../actions/index";

const initialState = {
  allPaseadores: [],
  paseador: [],
  detailWalker: [],
  newId: [],
  user: {},
  ubication: [],
  mensaje:""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        detailWalker: action.payload,
        newId: [],
      };
    case ORDER:
      return {
        ...state,
        allPaseadores: action.payload,
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
      const { token, validate, id } = action.payload;
      return {
        ...state,
        user: {
          token,
          validate,
          id,
        },
      };
    case NEW_PASEADOR:
      return {
        ...state,
        newId: action.payload.id,
      };
    case UBICATION_MATCH:
      return { 
        ...state, ubication: action.payload 
      };
    case RECOVER_PASSWORD:
      return { 
        ...state, mensaje: action.payload 
      };
    case NEW_PASSWORD:
      return { 
        ...state, mensaje: action.payload 
      };
    default:
      return state;
  }
}

export default rootReducer;
