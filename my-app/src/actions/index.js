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

export function getByEmail(payload) {
  return async function (dispatch) {
    try {
      return axios
        .post("http://localhost:3001/login", payload)
        .then((res) => dispatch({ type: GET_BY_EMAIL, payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
}


export function getAllPaseadores(page, limit){
        return async function(dispatch){
            try{
              let result = await axios.get(`http://localhost:3001/allActiveWalkers?page=${page}&limit=${limit}`)
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
      axios.get(`http://localhost:3001/walkers/${id}`).then((response) =>
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
      .post("http://localhost:3001/createUser", payload)
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
      .put("http://localhost:3001/updateuserProfile/" + id, payload)
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
      .put(`http://localhost:3001/updateuser/${user.id}`, payload, {
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
      return axios.get(`http://localhost:3001/order/${attribute}/${order}`)
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
      return axios.get(`http://localhost:3001/filter/price`, input)
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
  //     return axios .get(`http://localhost:3001/allActiveWalkers/filter/${ubication}`)
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
      return axios.get(`http://localhost:3001/filter/${service}`)
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
        `http://localhost:3001/ubication?ubication=${ubication}`
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
      .post("http://localhost:3001/postimages/:id", payload)
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
      .put("http://localhost:3001/forgotPassword" , payload)
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
      .put(`http://localhost:3001/newPassword/${token}` , payload)
      .then((paseador) => {
        dispatch({
          type: "NEW_PASSWORD",
          payload: paseador.data,
        });
      });
  };
}