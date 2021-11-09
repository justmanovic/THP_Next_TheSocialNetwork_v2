import MyProfileForm from "./MyProfileForm";
import classes from "./MyProfile.module.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import SinglePost from "../PostsPage/SinglePost";

const MyProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const id = useSelector((state) => state.auth.id);
  const [countPost, setCountPost] = useState(0);

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const updateUserDetails = async (e) => {
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

  useEffect(() => {
    getAllPosts();
  }, [allPosts]);

  const getAllPosts = async (e) => {
    const data = await fetch(`http://localhost:1337/posts?user=${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setAllPosts(res);
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
        <div className={classes.allPosts}>
          {allPosts.map((post) => (
            <SinglePost
              key={post.id}
              post={post}
              setCountPost={setCountPost}
              countPost={countPost}
            />
          ))}
        </div>
      </form>

      <MyProfileForm />
    </section>
  );
};

export default MyProfile;
