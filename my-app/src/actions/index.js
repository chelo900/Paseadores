import axios from 'axios';

export const GET_PASEADORES = "GET_PASEADORES"
export const GET_PASEADOR_FOR_ID = "GET_PASEADOR_FOR_ID"
// export const NEW_PASEADOR = "NEW_PASEADOR"
export const PUT_DETAILS_PROFILE = "PUT_DETAILS_PROFILE"
export const PUT_DETAILS_USER = "PUT_DETAILS_USER"
export const ORDER = "ORDER"
export const FILTER_PRICE = "FILTER_PRICE"
export const FILTER_SCHEDULE = "FILTER_SCHEDULE"
export const FILTER_UBICATION = "FILTER_UBICATION"
export const NEW_PASEADOR = 'NEW_PASEADOR'
export const GET_BY_EMAIL = "GET_BY_EMAIL"

export function getByEmail(payload){
  return async function(dispatch){
  try{
      return axios.put("http://localhost:3001/email", payload)
      .then(res => dispatch({type: GET_BY_EMAIL, payload: res.data}))
  }catch(e) {
      console.log(e)
  }
}
}


export function getAllPaseadores(){
        return async function(dispatch, page){
            return axios.get (`http://localhost:3001/allActiveWalkers?page=${page}`)
            .then (paseadores=>{
                dispatch({
                    type: 'GET_PASEADORES',
                    payload: paseadores.data
                })
            })
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
        return async function (dispatch){
            return axios.post ("http://localhost:3001/createuser", payload)
            .then(paseador=>{
                dispatch({
                    type: 'NEW_PASEADOR',
                    payload: paseador.data
                })
            })
        }
}

 export function putDetailsProfile (id, payload){
         return async function (dispatch){
             return axios.put ("http://localhost:3001/updateuserProfile/" + id, payload)
             .then(paseador=>{ 
                dispatch({
                     type: 'PUT_DETAILS_PROFILE',
                     payload: paseador.data
                 })
             })
         }
 }

 export function putDetailsUser(id, payload){
         return async function (dispatch){
             return axios.put ("http://localhost:3001/updateuser/" + id, payload)
             .then(paseador=>{ 
                dispatch({
                     type: 'PUT_DETAILS_USER',
                     payload: paseador.data
                 })
             })
         }
 }

//  export function Order(order, attribute) {
//     return async function (dispatch) {
//       return axios .get(`http://localhost:3001/allActiveWalkers/${attribute}/${order}`)
//         .then((paseador) => {
//           dispatch({
//             type: "ORDER",
//             payload: paseador.data,
//           });
//         });
//     };
//   }
  
//   export function FilterPrice ( price ) {
//     return async function (dispatch) {
//       return axios .get(`http://localhost:3001/allActiveWalkers/filter/${price}`)
//         .then((paseador) => {
//           dispatch({
//             type: "FILTER_PRICE",
//             payload: paseador.data,
//           });
//         });
//     };
//   }

//   export function FilterSchedule ( schedule ) {
//     return async function (dispatch) {
//       return axios .get(`http://localhost:3001/allActiveWalkers/filter/${schedule}`)
//         .then((paseador) => {
//           dispatch({
//             type: "FILTER_SCHEDULE",
//             payload: paseador.data,
//           });
//         });
//     };
//   }

//   export function FilterUbication( ubication ) {
//     return async function (dispatch) {
//       return axios .get(`http://localhost:3001/allActiveWalkers/filter/${ubication}`)
//         .then((paseador) => {
//           dispatch({
//             type: "FILTER_UBICATION",
//             payload: paseador.data,
//           });
//         });
//     };
//   }
export function Order(payload) {
  return {
    type: "ORDER",
    payload
  }
}

export function FilterPrice ( payload ) {
  return {
    type: "FILTER_PRICE",
    payload
  }
}

export function FilterSchedule ( payload ) {
  return {
    type: "FILTER_SCHEDULE",
    payload
  }
}

export function FilterUbication( payload ) {
  return {
    type: "FILTER_UBICATION",
    payload
  }
}

export function addImage( payload ) {
  return async function (dispatch){
    return axios.post ("http://localhost:3001/postimages/:id", payload)
    .then(image=>{
      dispatch({
        type: "ADD_IMAGE",
        payload: image.data 
      })
      console.log(payload)
    })
  }
}



