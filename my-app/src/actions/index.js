import axios from 'axios';

export function getAllPaseadores(){
    try {
        return async function(dispatch, page){
            return axios.get (`http://localhost:3001/allActiveWalkers?page=${page}`)
            .then (paseadores=>{
                dispatch({
                    type: 'GET_PASEADORES',
                    payload: paseadores.data
                })
            })
        }
    } catch (error) {
        console.log (error)
    }
}

// export function newPaseador (payload){
//     try {
//         return async function (dispatch){
//             return axios.post ("http://localhost:3001/createuser", payload)
//             .then(paseador=>{
//                 dispatch({
//                     type: 'NEW_PASEADOR',
//                     payload: paseador.data
//                 })
//             })
//         }
//     } catch (error) {
//         console.log (error)
//     }
// }