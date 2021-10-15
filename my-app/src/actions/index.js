import axios from "axios";
const queryString = require("query-string");

export const GET_PASEADORES = "GET_PASEADORES";
export const GET_PASEADOR_FOR_ID = "GET_PASEADOR_FOR_ID";
export const PUT_DETAILS_PROFILE = "PUT_DETAILS_PROFILE";
export const PUT_DETAILS_USER = "PUT_DETAILS_USER";
export const NEW_PASEADOR = "NEW_PASEADOR";
export const LOGIN = "LOGIN";
export const UBICATION_MATCH = "UBICATION_MATCH";
export const RECOVER_PASSWORD = "RECOVER_PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";
export const GET_CLIENTE_FOR_ID = "GET_CLIENTE_FOR_ID";
export const PUT_DETAILS_CLIENT = "PUT_DETAILS_CLIENT";
export const PUT_DETAILS_PROFILE_CLIENTE = "PUT_DETAILS_PROFILE_CLIENTE";
export const CLEAR_USER = "CLEAR_USER";
export const GET_WALKERS = "GET_WALKERS";
export const GET_CLIENTS = "GET_CLIENTS";
export const ALERT_ADMIN = "ALERT_ADMIN";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const DELETE_USER_ACCOUNT = "DELETE_USER_ACCOUNT";
export const FIRST_ADMIN = "FIRST_ADMIN";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const GET_USER_FAVORITES = "GET_USER_FAVORITES";
export const DELETE_USER_FAVORITE = "DELETE_USER_FAVORITE";
export const GET_FOR_LIST_FAV = "GET_FOR_LIST_FAV";
export const PASEADORES_PREMIUM = "PASEADORES_PREMIUM";

// export const GET_BY_EMAIL_CLIENTE = "GET_BY_EMAIL_CLIENTE"
export const EDIT_FAVORITES = "EDIT_FAVORITES";

const token = localStorage.getItem("userToken");
const header = {
  Authorization: `Bearer ${token}`,
};

export function login(payload) {
  return async function (dispatch) {
    try {
      return axios
        .post("/login", payload)
        .then((res) => dispatch({ type: LOGIN, payload: res.data }));
    } catch (error) {
      console.error("Action login: ", error);
    }
  };
}
export function clearUser(payload) {
  return { type: "CLEAR_USER", payload: payload };
}

export function getAllPaseadores({
  page,
  pageSize,
  inputFilters,
  selectFilters,
  sortData,
}) {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `/allActiveWalkers?page=${page}&pageSize=${pageSize}`,
        {
          params: {
            inputFilters: queryString.stringify(inputFilters),
            selectFilters: queryString.stringify(selectFilters),
            sortData: queryString.stringify(sortData),
          },
          headers: header,
        }
      );
      return dispatch({
        type: "GET_PASEADORES",
        payload: result.data,
      });
    } catch (error) {
      console.error("Action get_paseadores: ", error);
    }
  };
}

export function getPaseadorForId(id) {
  return (dispatch) => {
    try {
      axios
        .get(`/walkers/${id}`, {
          headers: header,
        })
        .then((response) =>
          dispatch({
            type: "GET_PASEADOR_FOR_ID",
            payload: response.data,
          })
        );
    } catch (error) {
      console.error("Action getPaseadorForId: ", error);
    }
  };
}

export function newPaseador(payload) {
  return async function (dispatch) {
    return axios.post("/createUser", payload).then((paseador) => {
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
      .put("/updateuserProfile/" + id, payload, { headers: header })
      .then((paseador) => {
        dispatch({
          type: "PUT_DETAILS_PROFILE",
          payload: paseador.data,
        });
      });
  };
}

export function putDetailsUser(payload, id) {
  return async function (dispatch) {
    return axios
      .put(`/updateuser/${id}`, payload, {
        headers: header,
      })
      .then((paseador) => {
        dispatch({
          type: "PUT_DETAILS_USER",
          payload: paseador.data,
        });
      });
  };
}

export function ubicationMatch(ubication) {
  return async function (dispatch) {
    let json;
    try {
      json = await axios.get(`/ubication?ubication=${ubication}`);

      return dispatch({ type: UBICATION_MATCH, payload: json.data });
    } catch (error) {
      return dispatch({ type: UBICATION_MATCH, payload: error });
    }
  };
}

export function addImage(payload) {
  return async function (dispatch) {
    return axios
      .post("/postimages/:id", payload, {
        headers: header,
      })
      .then((image) => {
        dispatch({
          type: "ADD_IMAGE",
          payload: image.data,
        });
      });
  };
}

export function recoverPassword(payload) {
  return async function (dispatch) {
    return axios.put("/forgotPassword", payload).then((paseador) => {
      dispatch({
        type: "RECOVER_PASSWORD",
        payload: paseador.data,
      });
    });
  };
}

export function newPassword(token, payload) {
  return async function (dispatch) {
    return axios.put(`/newPassword/${token}`, payload).then((paseador) => {
      dispatch({
        type: "NEW_PASSWORD",
        payload: paseador.data,
      });
    });
  };
}

export function sendPreferencias(payload){
  return async function (dispatch){
    return axios.post(`/sendPreferencias`, payload).then((preferencias)=>{
      dispatch({
        type: "PREFERENCIAS",
        payload: preferencias.data
      })
    })
  }
}

export function getPreferences(userId){
  return (dispatch) =>{
    try {
      axios.get(`/getpreferences/${userId}`).then((preferences)=>
      dispatch({
        type: "GET_PREFERENCE",
        payload: preferences.data
      }))
    } catch(error){
      console.log(error)
    }
  }
}

export function putPreferencias( userId, payload) {
  console.log(userId)
  return async function (dispatch) {
    return axios.put("/sendPreferencias/updatePreferencias/"+userId , payload).then((preferencias) => {
      dispatch({
        type: "PUT_PREFERENCIAS",
        payload: preferencias.data,
      });
    });
  };
}


export function getPaseadorPremuim() {
  return async function (dispatch) {
    return axios
      .get(`/getPremium`, {
        headers: header,
      })
      .then((paseador) => {
        dispatch({
          type: "PASEADORES_PREMIUM",
          payload: paseador.data,
        });
      });
  };
}

//    CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE ----- CLIENTE

export function newClient(payload) {
  return async function (dispatch) {
    return axios.post("/createClient", payload).then((client) => {
      dispatch({
        type: "NEW_CLIENT",
        payload: client.data,
      });
    });
  };
}

export function getClienteForId(id) {
  return (dispatch) => {
    axios
      .get(`/Cliente/${id}`, {
        headers: header,
      })
      .then((cliente) =>
        dispatch({
          type: "GET_CLIENTE_FOR_ID",
          payload: cliente.data,
        })
      );
  };
}

export function putDetailsProfileCliente(id, payload) {
  return async function (dispatch) {
    return axios
      .put("/updateClientProfile/" + id, payload, {
        headers: header,
      })
      .then((cliente) => {
        dispatch({
          type: "PUT_DETAILS_PROFILE_CLIENTE",
          payload: cliente.data,
        });
      });
  };
}

export function putDetailsCliente(payload, client) {
  return async function (dispatch) {
    return axios
      .put(`/updateCliente/${client.id}`, payload, {
        headers: header,
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

export function clientSendOrden(payload) {
  return async function (dispatch) {
    return axios
      .post("/sendOrden", payload, {
        headers: header,
      })
      .then((orden) => {
        dispatch({
          type: "NEW_ORDEN",
          payload: orden.data,
        });
      });
  };
}

// export function getOrdenPaseador(userId){
//   console.log('geeetorden')
//   return (dispatch) => {
//     axios.get(`/getOrden/paseador/${userId}`)
//     .then((orden)=>
//     dispatch({
//       type: "GET_ORDENSUSER_PASEADOR",
//       payload: orden.data
//     }))
//   }
// }

export function getOrdenCliente(userId) {
  console.log("geeetordenCliente", userId);
  return (dispatch) => {
    axios
      .get(`/getOrden/${userId}`, {
        headers: header,
      })
      .then((orden) =>
        dispatch({
          type: "GET_ORDENSUSER_CLIENTE",
          payload: orden.data,
        })
      );
  };
}

export function ordenAnswer(payload) {
  return async function (dispatch) {
    return axios
      .put("/ordenAnswer", payload, {
        headers: header,
      })
      .then((answer) => {
        dispatch({
          type: "ORDEN_ANSWER",
          payload: answer.data,
        });
      });
  };
}

export function getWalkers(email) {
  return async function (dispatch) {
    var result;
    try {
      if (!email) {
        result = await axios.get(`/getWalkers`, {
          headers: header,
        });
      } else {
        result = await axios.get(`/getWalkers?email=${email}`, {
          headers: header,
        });
      }
      return dispatch({
        type: "GET_WALKERS",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getClients(email) {
  return async function (dispatch) {
    var result;
    try {
      if (!email) {
        result = await axios.get(`/getClients`, {
          headers: header,
        });
      } else {
        result = await axios.get(`/getClients?email=${email}`, {
          headers: header,
        });
      }
      return dispatch({
        type: "GET_CLIENTS",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function makeAdmin(id) {
  return async function (dispatch) {
    try {
      let result = await axios.post(`/makeAdmin`, id, {
        headers: header,
      });
      return dispatch({
        type: "ALERT_ADMIN",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetPassword(id) {
  return async function (dispatch) {
    try {
      let result = await axios.post(`/resetPassword`, id, {
        headers: header,
      });
      return dispatch({
        type: "ALERT_ADMIN",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteUserAccount(id) {
  return async function (dispatch) {
    try {
      let result = await axios.post(`/deleteUserAccount`, id, {
        headers: header,
      });
      return dispatch({
        type: "ALERT_ADMIN",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function firstAdmin(payload) {
  return async function (dispatch) {
    try {
      let result = await axios.post(`/firstAdmin`, payload);
      return dispatch({
        type: "FIRST_ADMIN",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getUserFavorites(idclient) {
  return async function (dispatch) {
    var favs = await axios.get("/getFavorite/" + idclient, {
      headers: header,
    });
    return dispatch({
      type: "GET_USER_FAVORITES",
      payload: favs.data,
    });
  };
}
export function getForListFav(id) {
  return async function (dispatch) {
    var favs = await axios.get("/getForListFav/" + id, {
      headers: header,
    });
    return dispatch({
      type: "GET_FOR_LIST_FAV",
      payload: favs.data,
    });
  };
}

export function postUserFavorite(payload) {
  return async function (dispatch) {
    try {
      let result = await axios.post(`/addFav`, payload, {
        headers: header,
      });
      return dispatch({
        type: "ADD_FAVORITES",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteUserFavorite(payload) {
  return async function (dispatch) {
    try {
      var result = await axios.put("/quitFav/", payload, {
        headers: header,
      });
      return dispatch({
        type: "DELETE_USER_FAVORITE",
        payload: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
