import { useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../Layout/Button";
import classes from "./NewPost.module.css";

const NewPost = (props) => {
  const postContent = useRef();
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);

  const PostNewPost = async (e) => {
    e.preventDefault();

    const dataAuth = {
      user: id,
      text: postContent.current.value,
    };

    const data = await fetch(`http://localhost:1337/posts`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });
    const res = await data.json();
    props.setLastPost(postContent.current.value);
  };

  return (
    <section className={classes.starting}>
      <h2>Nouveau post</h2>
      <form onSubmit={PostNewPost}>
        {/* <label htmlFor="postContent">Text du post</label> */}
        <textarea
          id="postContent"
          ref={postContent}
          placeholder="Votre super nouveau post"
        />
        <div>
          <Button type="submit">Poster !</Button>
        </div>
      </form>
    </section>
  );
};

export default NewPost;
