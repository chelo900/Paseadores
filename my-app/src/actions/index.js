import axios from "axios";

export const GET_PASEADORES = "GET_PASEADORES";
export const GET_PASEADOR_FOR_ID = "GET_PASEADOR_FOR_ID";
// export const NEW_PASEADOR = "NEW_PASEADOR"
export const PUT_DETAILS_PROFILE = "PUT_DETAILS_PROFILE";
export const PUT_DETAILS_USER = "PUT_DETAILS_USER";
export const NEW_PASEADOR = "NEW_PASEADOR";
export const GET_BY_EMAIL = "GET_BY_EMAIL";
export const UBICATION_MATCH = "UBICATION_MATCH";
export const FILTER_SERVICE = "FILTER_SERVICE"
export const ORDER = "ORDER";
export const FILTER_PRICE = "FILTER_PRICE";
export const FILTER_UBICATION = "FILTER_UBICATION";
export const RECOVER_PASSWORD = "RECOVER_PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";
export const GET_CLIENTE_FOR_ID = "GET_CLIENTE_FOR_ID";
export const PUT_DETAILS_CLIENT = "PUT_DETAILS_CLIENT";
export const PUT_DETAILS_PROFILE_CLIENTE = "PUT_DETAILS_PROFILE_CLIENTE";
export const CLEAR_USER = "CLEAR_USER";
// export const GET_BY_EMAIL_CLIENTE = "GET_BY_EMAIL_CLIENTE"

export function getByEmail(payload) {
  return async function (dispatch) {
    try {
      return axios
        .post("/login", payload)
        .then((res) => dispatch({ type: "GET_BY_EMAIL", payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
}
export function clearUser(payload) {
  return { type: "CLEAR_USER", payload: payload }

}


export function getAllPaseadores(page, limit){
        return async function(dispatch){
            try{
              let result = await axios.get(`/allActiveWalkers?page=${page}&limit=${limit}`)
              return dispatch({
                type: 'GET_PASEADORES',
                payload: result.data
              })
            } catch(err){
              console.log(err)
            }
        }
}

export function getPaseadorForId(id) {
  return (dispatch) => {
    try {
      axios.get(`/walkers/${id}`)
      .then((response) =>
        dispatch({
          type: "GET_PASEADOR_FOR_ID",
          payload: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function newPaseador(payload) {
  return async function (dispatch) {
    return axios
      .post("/createUser", payload)
      .then((paseador) => {
        dispatch({
          type: "NEW_PASEADOR",
          payload: paseador.data,
        });
      });
  };
}

export function putDetailsProfile(id, payload) {
  return async function (dispatch) {
    return axios
      .put("/updateuserProfile/" + id, payload)
      .then((paseador) => {
        dispatch({
          type: "PUT_DETAILS_PROFILE",
          payload: paseador.data,
        });
      });
  };
}

export function putDetailsUser(payload, user) {
  console.log("token: ", user.token);
  return async function (dispatch) {
    return axios
      .put(`/updateuser/${user.id}`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((paseador) => {
        dispatch({
          type: "PUT_DETAILS_USER",
          payload: paseador.data,
        });
      });
  };
}

export function Order( attribute, order,) {
    return async function (dispatch) {
      return axios.get(`/order/${attribute}/${order}`)
        .then((paseador) => {
          dispatch({
            type: "ORDER",
            payload: paseador.data,
            
          });
        });  
    };
  }

  export function FilterPrice (input) {
    return async function (dispatch) {
      return axios.get(`/filter/price`, input)
        .then((paseador) => {
          dispatch({
            type: "FILTER_PRICE",
            payload: paseador.data,
          });
        });
    };
  }

  // export function FilterUbication( ubication ) {
  //   return async function (dispatch) {
  //     return axios .get(`/allActiveWalkers/filter/${ubication}`)
  //       .then((paseador) => {
  //         dispatch({
  //           type: "FILTER_UBICATION",
  //           payload: paseador.data,
  //         });
  //       });
  //   };
  // }

  export function FilterServicio( service ) {
    return async function (dispatch) {
      return axios.get(`/filter/${service}`)
        .then((paseador) => {
          dispatch({
            type: "FILTER_SERVICE",
            payload: paseador.data,
          });
        });
    };
  }

export function ubicationMatch(ubication) {
  return async function (dispatch) {
    let json;

    try {
      json = await axios.get(
        `/ubication?ubication=${ubication}`
      );

      return dispatch({ type: UBICATION_MATCH, payload: json.data });
    } catch (error) {
      return dispatch({ type: UBICATION_MATCH, payload: error });
    }
  };
}

export function addImage(payload) {
  return async function (dispatch) {
    console.log(payload)
    return axios
      .post("/postimages/:id", payload)
      .then((image) => {
        dispatch({
          type: "ADD_IMAGE",
          payload: image.data,
        });
        console.log(payload);
      });
  };
}

export function recoverPassword(payload) {
  return async function (dispatch) {
    return axios
      .put("/forgotPassword" , payload)
      .then((paseador) => {
        dispatch({
          type: "RECOVER_PASSWORD",
          payload: paseador.data,
        });
      });
  };
}
export function newPassword(token ,payload) {
  return async function (dispatch) {
    return axios
      .put(`/newPassword/${token}` , payload)
      .then((paseador) => {
        dispatch({
          type: "NEW_PASSWORD",
          payload: paseador.data,
        });
      });
  };
}

//    CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE 

export function newClient(payload){
  return async function (dispatch){
    return axios
      .post("/createClient", payload)
      .then((client)=>{
        dispatch({
          type: "NEW_CLIENT",
          payload: client.data,
        })
      })
  }
}

export function getClienteForId(id) {
  return (dispatch) => {
      axios.get(`/Cliente/${id}`)
      .then((cliente) =>
        dispatch({
          type: "GET_CLIENTE_FOR_ID",
          payload: cliente.data,
        })
      );
  };
}

export function putDetailsProfileCliente (id, payload) {
  return async function (dispatch) {
    return axios
      .put("/updateClientProfile/" + id, payload)
      .then((cliente) => {
        dispatch({
          type: "PUT_DETAILS_PROFILE_CLIENTE",
          payload: cliente.data,
        });
      });
  };
}

export function putDetailsCliente(payload, client) {
  console.log("token: ", client.token);
  return async function (dispatch) {
    return axios.put(`/updateCliente/${client.id}`, payload, {
        headers: {
          Authorization: `Bearer ${client.token}`,
        },
      })
      .then((cliente) => {
        dispatch({
          type: "PUT_DETAILS_CLIENT",
          payload: cliente.data,
        });
      });
  };
}

// export function getByEmailCliente (payload) {
//   return async function (dispatch) {
//       return axios.post("/login", payload)
//       .then((reclientes) => 
//         dispatch({ 
//           type: "GET_BY_EMAIL_CLIENTE", 
//           payload: cliente.data 
//         }));
//   };
// }

