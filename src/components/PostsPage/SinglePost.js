import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./SinglePost.module.css";

const SinglePost = (props) => {
  console.log(props.post);
  const author = props.post.user.username;
  const authorId = props.post.user.id;
  // mettre id dans Redux
  const userId = 1
  const postId = props.post.id
  const [likeCount, setLikeCount] = useState(props.post.like);
  const token = useSelector((state) => state.auth.token);

  const addLike = async (e) => {
    console.log(likeCount);

    e.preventDefault();

    const dataAuth = {
      user: userId,
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
    setLikeCount(res.like)
  };

  return (
    <section className={classes.starting}>
      <h3>Un post</h3>
      <p>{props.post.text}</p>
      <p>{likeCount}</p>
      <button onClick={addLike}>Like</button>
      <Link to={`/users/${authorId}`}>{author}</Link>
    </section>
  );
};

export default SinglePost;
