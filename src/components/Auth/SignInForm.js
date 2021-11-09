import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

import classes from "./SignInForm.module.css";

const SignInForm = () => {
  const token = useSelector((state) => state.auth.token);
  const logStatus = useSelector((state) => state.auth.isLoggedIn);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const updateLoginHandler = (e) => {
    setLogin(e.target.value);
  };
  const updatePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    console.log("login demandé");
    e.preventDefault();
    const dataSignIn = {
      identifier: login,
      password: password,
    };

    const res = await fetch("http://localhost:1337/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSignIn),
    });

    const data = await res.json();
    console.log(data);

    dispatch(authActions.login({ token: data.jwt, id: data.user.id }));
  };

  return (
    <section className={classes.auth}>
      <h1>Sign in</h1>
      <h1>{token}</h1>
      <h1>{logStatus.toString()}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="login">Your Username / Email</label>
          <input type="text" id="login" onChange={updateLoginHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            onChange={updatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
