import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const token = useSelector((state) => state.auth.token);
  const logStatus = useSelector((state) => state.auth.isLoggedIn);

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
    e.preventDefault();
    const dataAuth = {
      username: username,
      email: email,
      password: password,
      description: "Je suis moi !",
    };

    const res = await fetch("http://localhost:1337/auth/local/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });

    const data = await res.json();
    dispatch(authActions.login({ token: data.jwt, id: data.user.id }));
  };

  return (
    <section className={classes.auth}>
      <h1>{token}</h1>
      <h1>{logStatus}</h1>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <h1>salut </h1>
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

export default SignUpForm;
