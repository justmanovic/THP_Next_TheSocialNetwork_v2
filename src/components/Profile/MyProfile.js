import MyProfileForm from "./MyProfileForm";
import classes from "./MyProfile.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    const data = await fetch("http://localhost:1337/users/me", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(dataAuth),
    });
    const res = await data.json();
    console.log(res);
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

      <MyProfileForm />
    </section>
  );
};

export default MyProfile;
