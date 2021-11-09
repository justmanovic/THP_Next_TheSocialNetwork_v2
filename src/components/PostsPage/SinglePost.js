import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./SinglePost.module.css";

const SinglePost = (props) => {
  console.log(props.post);
  const author = props.post.user.username;
  const authorId = props.post.user.id;
  const userId = useSelector((state) => state.auth.id);
  const postId = props.post.id;
  const [likeCount, setLikeCount] = useState(props.post.like);
  const token = useSelector((state) => state.auth.token);
  const logStatus = useSelector((state) => state.auth.isLoggedIn);

  const addLike = async (e) => {
    console.log(likeCount);

    e.preventDefault();

    const dataAuth = {
      like: likeCount + 1,
    };

    const data = await fetch(`http://localhost:1337/posts/${postId}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });
    const res = await data.json();
    console.log(res);
    setLikeCount(res.like);
  };

  const handleDelete = async () => {
    const res = await fetch(` http://localhost:1337/posts/${postId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    props.setCountPost(props.countPost + 1);
  };

  const removePost = () => {
    if (authorId === userId) {
      handleDelete();
    }
  };

  const authorLink = authorId === userId ? "/profile" : `/users/${authorId}`;

  return (
    <section className={classes.starting}>
      <h3>Un post</h3>
      <p>{props.post.text}</p>
      <p>{likeCount}</p>
      {logStatus && <button onClick={addLike}>Like</button>}

      <Link to={authorLink}>{author}</Link>
      {props.post.user.id === userId && (
        <button onClick={removePost}>Supprimer</button>
      )}
    </section>
  );
};

export default SinglePost;
