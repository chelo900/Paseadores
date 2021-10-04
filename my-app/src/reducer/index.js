import {
  GET_PASEADORES,
  GET_PASEADOR_FOR_ID,
  PUT_DETAILS_PROFILE,
  PUT_DETAILS_USER,
  ORDER,
  FILTER_PRICE,
  FILTER_UBICATION,
  GET_BY_EMAIL,
  NEW_PASEADOR,
  UBICATION_MATCH,
} from "../actions/index";

const initialState = {
  allPaseadores: [],
  paseador: [],
  detailWalker: [],
  newId: [],
  id: {},
  validate: {},
  ubication: []
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
      console.log("entro al reducer");
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
    case FILTER_UBICATION:
      return {
        ...state,
        allPaseadores: action.payload,
      };
    case GET_BY_EMAIL:
      console.log("reducer", action.payload);
      return {
        ...state,
        validate: action.payload.validate,
        id: action.payload.id
      };
    case NEW_PASEADOR:
      return {
        ...state,
        newId: action.payload.id,
      };
    case UBICATION_MATCH:
      return {...state, ubication : action.payload}

    default:
      return state;
  }
}

export default rootReducer;
