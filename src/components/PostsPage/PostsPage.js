import { useState, useEffect } from "react";
import NewPost from "./NewPost";
import SinglePost from "./SinglePost";
import classes from "./PostsPage.module.css";

const PostsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [lastPost, setLastPost] = useState("");

  useEffect(() => {
    getAllPosts();
  }, [lastPost]);

  const getAllPosts = async (e) => {
    const data = await fetch(`http://localhost:1337/posts`, {
      method: "get",
    });
    const res = await data.json();
    setAllPosts(res);
  };

  return (
    <section className={classes.starting}>
      <h1>Liste des posts</h1>
      <div className={classes.allPosts}>
        {allPosts.map((post) => (
          <SinglePost post={post} />
        ))}
      </div>
      <NewPost setLastPost={setLastPost} />
    </section>
  );
};

export default PostsPage;
