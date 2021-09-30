import axios from 'axios';

export function getAllPaseadores(){
    try {
        return async function(dispatch){
            return axios.get ('http://localhost:3001/allActiveWalkers?page=1')
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

export function getPaseadorForId(id){
    return (dispatch)=>{
        try{
            axios.get(`http://localhost:3001/walkers/${id}`)
            .then(response =>dispatch({
                type:'GET_PASEADOR_FOR_ID',
                payload:response.data
            }))
        }catch(error){
            console.log(error)
        
        }
    }

}

export function newPaseador (payload){
    try {
        return async function (dispatch){
            return axios.post ("http://localhost:3001/createuser", payload)
            .then(paseador=>{
                dispatch({
                    type: 'NEW_PASEADOR',
                    payload: paseador.data
                })
            })
        }
    } catch (error) {
        console.log (error)
    }
}

 export function putDetailsProfile (id, payload){
     try {
         return async function (dispatch){
             return axios.put ("http://localhost:3001/updateuserProfile/" + id, payload)
             .then(paseador=>{ 
                dispatch({
                     type: 'PUT_DETAILS_PROFILE',
                     payload: paseador.data
                 })
             })
         }
     } catch (error) {
         console.log (error)
     }
 }

 export function putDetailsUser(id, payload){
     try {
         return async function (dispatch){
             return axios.put ("http://localhost:3001/updateuser/" + id, payload)
             .then(paseador=>{ 
                dispatch({
                     type: 'PUT_DETAILS_USER',
                     payload: paseador.data
                 })
             })
         }
     } catch (error) {
         console.log (error)
     }
 }