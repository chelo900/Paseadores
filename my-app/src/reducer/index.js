const initialState = {
    allPaseadores : []
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_PASEADORES':
            return {
                ...state,
                allPaseadores: action.payload
            }
        // case 'NEW_PASEADOR':
        //     return {
        //         ...state
        //     }

    default: return state
    }
    
}

export default rootReducer;