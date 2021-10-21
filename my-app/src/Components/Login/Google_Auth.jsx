import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Log = () => {
  // States for the component:
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    validate: false,
    id: "",
    email: "",
    token: "",
    confetti: false,
    profile_loaded: false,
  });

  // On Failur of google login we get the reason for failur in an alert:
  const onFailure = (error) => {
    alert(error);
  };

  // If successfull return of data from google we run this function:
  const googleResponse = async (response) => {
    // Check if a token was recieved and send it to our API:
    if (response.tokenId) {
      const body = await JSON.stringify({
        tokenId: response.tokenId,
      });

      const googleResponse = await axios.post("/google", body, {
        headers: {
          "content-type": "application/json",
        },
      });
      // console.log("googleResponse", googleResponse)

      //   // Check if we have some result:
      // if (Object.keys(googleResponse.data.payload).length !== 0) {
      //     /*
      //       Get the following user details from our API and set them in the state:
      //       User Account Name
      //       User Email
      //       User Profile Picture for Google
      //     */
      const { validate, id, email, token, walker, admin } = googleResponse.data;

      await setState({
        ...state,
        validate: validate,
        id: id,
        email: email,
        token: token,
        walker: walker,
        admin: admin,
      });

      console.log(state);

      const entra = async () => {
        const validation = await state.validate;

        if (validation === true) {
          await Swal.fire({
            icon: "success",
            title: "Welcome!",
            showConfirmButton: false,
            timer: 1500,
          });
          // history.push(`/walker/perfil/${state.id}`)
          localStorage.clear();
          localStorage.setItem("userValidate", state.validate);
          localStorage.setItem("userToken", state.token);
          localStorage.setItem("userId", state.id);
          localStorage.setItem("userWalker", state.walker);
          localStorage.setItem("userAdmin", state.admin);
          if (state.walker) {
            history.push(`/walker/perfil/${state.id}`);
          } else {
            history.push(`/cardsUsers`);
          }
        } else if (state.validate === false) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Chequea tus crecenciales",
            button: "Ok",
          });
          //window.location.reload();
        }
        //      // eslint-disable-next-line react-hooks/exhaustive-deps
      };
      entra();

      // const log = async () => {
      //   const validation = await state.validate

      //        if (validation === true) {
      //           await Swal.fire({
      //                icon: 'success',
      //                title: 'Welcome!',
      //                showConfirmButton: false,
      //                timer: 1500
      //              })
      //       history.push(`/walker/perfil/${state.id}`)
      // //        localStorage.clear();
      // //        localStorage.setItem("userValidate", state.validate);
      // //        localStorage.setItem("userToken", state.token);
      // //        localStorage.setItem("userId", state.id);
      // //        localStorage.setItem("userWalker", state.walker);
      // //        localStorage.setItem("userAdmin", state.admin);
      // //        if (state.walker) {
      // //        history.push(`/walker/perfil/${state.id}`);
      // //        } else {
      // //          history.push(`/cardsUsers`);
      // //        }
      //      } else if (state.validate === false) {
      //       await Swal.fire({
      //          icon: 'error',
      //          title: 'Oops...',
      //          text: 'Chequea tus crecenciales',
      //          button:"Ok"
      //        })
      //        window.location.reload();
      //      }
      // //      // eslint-disable-next-line react-hooks/exhaustive-deps
      //    }
      //    entra()
    }
  };

  //   useEffect(async () => {

  //    if (state.validate === true) {
  //     await Swal.fire({
  //        icon: 'success',
  //        title: 'Welcome!',
  //        showConfirmButton: false,
  //        timer: 1500
  //      })
  //      localStorage.clear();
  //      localStorage.setItem("userValidate", state.validate);
  //      localStorage.setItem("userToken", state.token);
  //      localStorage.setItem("userId", state.id);
  //      localStorage.setItem("userWalker", state.walker);
  //      localStorage.setItem("userAdmin", state.admin);
  //      history.push(`/walker/perfil/${state.id}`);
  //      if (state.walker) {
  //      } else {
  //        history.push(`/cardsUsers`);
  //      }
  //    } else if (state.validate === false) {
  //     await Swal.fire({
  //        icon: 'error',
  //        title: 'Oops...',
  //        text: 'Chequea tus crecenciales',
  //        button:"Ok"
  //      })
  //      window.location.reload();
  //    }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  }, []);

  // This will turn off the confetti raining down on the screen after 5 seconds of successfull login:
  // useEffect(() => {
  //   setTimeout(() => {
  //     setState({
  //       ...state,
  //       confetti: false,
  //     });
  //   }, 5000);
  // }, [state.profile_loaded]);

  return (
    ///////////////////////////////////////////
    <div>
      <div>
        <GoogleLogin
          clientId="1003857961946-27cq7cl8j2867vtb0q9oikn26l2bnk65.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
    ///////////////////////////////////////////
  );
};

export default Log;
