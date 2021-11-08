import MyProfileForm from "./MyProfileForm";
import classes from "./MyProfile.module.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const usernameInput = useRef();

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const updateUsername = async (e) => {
    console.log(usernameInput.current.value);
    e.preventDefault();
    const dataAuth = {
      username: usernameInput.current.value,
    };
    const data = await fetch(`http://localhost:1337/users/${id}`, {
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
    setId(res.id);
    setUsername(res.username);
    setEmail(res.email);
    setDescription(res.description);
  };

  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      <h2>Votre username :</h2>
      <p>{username}</p>
      <h2>Votre email :</h2>
      <p>{email}</p>
      <h2>Votre description :</h2>
      {description && <p>{description}</p>}
      <form onSubmit={updateUsername}>
        <input placeholder="Nouvel username" type="text" ref={usernameInput} />
        <button type="submit">Modifier !</button>
      </form>

      <MyProfileForm />
    </section>
  );
};

export default MyProfile;
