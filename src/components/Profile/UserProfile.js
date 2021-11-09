import classes from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SinglePost from "../PostsPage/SinglePost";

const UserProfile = () => {
  let { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [countPost, setCountPost] = useState(0);

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

    setUsername(res.username);
    setEmail(res.email);
    setDescription(res.description);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
      <h1>Profil de {username}</h1>
      <h3>Description : </h3>
      <p>{description}</p>
      {/* <small>{id}</small> */}
      <div className={classes.allPosts}>
        {allPosts.map((post) => (
          <SinglePost
            key={post.id}
            post={post}
            setCountPost={setCountPost}
            countPost={countPost}
            showLink={false}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
