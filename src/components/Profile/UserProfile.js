import classes from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  let { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const data = await fetch(`http://localhost:1337/users/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(dataAuth),
    });
    const res = await data.json();
    console.log(res);
    // setUsername(res.username);
    // setEmail(res.email);
    // setDescription(res.description);
  };

  return (
    <section className={classes.profile}>
      <h1>MachinProfile</h1>
      <h1>{id}</h1>
    </section>
  );
};

export default UserProfile;
