import classes from "./MyProfileForm.module.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MyProfileForm = () => {
  const newPasswordInputRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA0TBRZ8Rf7lz3aIICr6KoWgBlf5EcPDsw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };

  return <>{/* <small>{token}</small> */}</>;
};

export default MyProfileForm;
