import {
GET_PASEADORES,
GET_PASEADOR_FOR_ID,
PUT_DETAILS_PROFILE,
PUT_DETAILS_USER,
ORDER,
FILTER_PRICE,
FILTER_SCHEDULE,
FILTER_UBICATION,
GET_EMAIL
} from "../actions/index"

const initialState = {
    allPaseadores : [],
    paseador: [],
    detailWalker:[],
    user: {}

}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_PASEADORES:
            return {
                ...state,
                allPaseadores: action.payload
            }
        case PUT_DETAILS_PROFILE:
             return {
                 ...state,
                 paseador: action.payload
            }
        case PUT_DETAILS_USER:
            console.log(action.payload)
             return {
                 ...state,
                 paseador: action.payload
             }
        case GET_PASEADOR_FOR_ID:
            return{
                ...state,
                detailWalker:action.payload
            }
        case ORDER:
            return{
                ...state,
                paseador:action.payload
            }
        case FILTER_PRICE:
            return{
                ...state,
                paseador:action.payload
            }
        case FILTER_SCHEDULE:
            return{
                ...state,
                paseador:action.payload
            }
        case FILTER_UBICATION:
            return{
                ...state,
                paseador:action.payload
            }
            case 'GET_EMAIL':
                    return {
                        ...state,
                        user: action.payload,
                        
                    };
        // case NEW_PASEADOR:
        //     return {
        //         ...state,
        //         paseador: action.payload
        //     }

    default: return state
    }
    
}

export default rootReducer;