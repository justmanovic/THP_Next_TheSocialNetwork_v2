import MyProfileForm from "./MyProfileForm";
import classes from "./MyProfile.module.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const updateUserDetails = async (e) => {
    console.log(username);
    e.preventDefault();
    const dataAuth = {
      username: username,
      email: email,
      description: description,
      password: password,
    };
    const data = await fetch(`http://localhost:1337/users/me`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });
    const res = await data.json();
    console.log(res);
  };

  const fetchMyProfile = async () => {
    const data = await fetch("http://localhost:1337/users/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res);
    setUsername(res.username);
    setEmail(res.email);
    setDescription(res.description);
  };

  const descriptionUpdate = (e) => {
    setDescription(e.target.value);
  };

  const emailUpdate = (e) => {
    setEmail(e.target.value);
  };

  const usernameUpdate = (e) => {
    setUsername(e.target.value);
  };

  const passwordUpdate = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      {description && <p>{description}</p>}
      <form onSubmit={updateUserDetails}>
        <h2>Votre username :</h2>
        <input value={username} type="text" onChange={usernameUpdate} />
        <h2>Votre email :</h2>
        <input value={email} type="text" onChange={emailUpdate} />
        <h2>Votre description :</h2>
        <textarea value={description} onChange={descriptionUpdate} />
        <h2>Changer votre mot de passe</h2>
        <input value={password} type="password" onChange={passwordUpdate} />
        <button type="submit">Modifier !</button>
      </form>

      <MyProfileForm />
    </section>
  );
};

export default MyProfile;
