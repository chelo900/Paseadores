const initialState = {
    allPaseadores : [],
    paseador: [],
    detailWalker:[]

}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_PASEADORES':
             return {
                 ...state,
                 allPaseadores: action.payload
            }
        case 'PUT_DETAILS_PROFILE':
             return {
                 ...state,
                 paseador: action.payload
            }
        case 'PUT_DETAILS_USER':
            console.log(action.payload)
             return {
                 ...state,
                 paseador: action.payload
             }
        case 'GET_PASEADOR_FOR_ID':
            return{
                ...state,
                detailWalker:action.payload
            }
        // case 'NEW_PASEADOR':
        //     return {
        //         ...state
        //     }

    default: return state
    }
    
}

export default rootReducer;