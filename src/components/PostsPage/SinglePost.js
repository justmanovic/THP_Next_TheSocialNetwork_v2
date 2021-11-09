import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./SinglePost.module.css";
import { likeActions } from "../../store/like-slice";
import Button from "../Layout/Button";

const SinglePost = (props) => {
  const author = props.post.user.username;
  const authorId = props.post.user.id;
  const userId = useSelector((state) => state.auth.id);
  const postId = props.post.id;
  const [likeCount, setLikeCount] = useState(props.post.like);
  const token = useSelector((state) => state.auth.token);
  const logStatus = useSelector((state) => state.auth.isLoggedIn);
  const myLikes = useSelector((state) => state.like.likedPosts);
  const dispatch = useDispatch();

  const addLike = async (e) => {
    e.preventDefault();
    dispatch(likeActions.toggleLike(postId));

    const dataAuth = {
      like: myLikes.includes(postId) ? likeCount - 1 : likeCount + 1,
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
  const likeUnlikeBtn = myLikes.includes(postId) ? (
    <i class="fas fa-thumbs-up"></i>
  ) : (
    <i class="far fa-thumbs-up"></i>
  );

  return (
    <section className={classes.starting}>
      {props.showLink && <Link to={authorLink}>{author}</Link>}

      <div>
        <p>{props.post.text}</p>
        <div className={classes["like-group"]}>
          <p>{likeCount}</p>
          <div>
            {logStatus && (
              <Button className={classes["no-border"]} onClick={addLike}>
                {likeUnlikeBtn}
              </Button>
            )}
          </div>
          {props.post.user.id === userId && (
            <Button onClick={removePost} className={classes["no-border"]}>
              <i class="far fa-trash-alt"></i>
            </Button>
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
