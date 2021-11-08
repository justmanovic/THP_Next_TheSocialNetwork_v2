import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUsernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const updateEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const updatePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    console.log("inscription demandée");
    e.preventDefault();
    const dataAuth = {
      username: username,
      email: email,
      password: password,
    };

    const res = await fetch("http://localhost:1337/auth/local/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" onChange={updateUsernameHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" onChange={updateEmailHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" onChange={updatePasswordHandler} />
        </div>
        <div className={classes.actions}>
          <button type="submit">Create new account</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
