import { useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./NewPost.module.css";

const NewPost = (props) => {
  const postContent = useRef()
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  

  const PostNewPost = async (e) => {
    console.log(postContent.current.value);
    console.log(token)
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
    console.log(res);

    props.setLastPost(postContent.current.value)
  }
  
  return (
    <section className={classes.starting}>
      <h2>Nouveau post</h2>
      <form onSubmit={PostNewPost}>
        <label htmlFor="postContent">Text du post</label>
        <textarea id="postContent" ref={postContent} />
        <button type="submit">Poster !</button>
      </form>
    </section>
  );
};

export default NewPost;
