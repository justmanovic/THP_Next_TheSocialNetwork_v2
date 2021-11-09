import { useState, useEffect } from "react";
import NewPost from "./NewPost";
import SinglePost from "./SinglePost";
import classes from "./PostsPage.module.css";
import { useSelector } from "react-redux";

const PostsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [lastPost, setLastPost] = useState("");
  const [countPost, setCountPost] = useState(0);
  const logStatus = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    getAllPosts();
  }, [lastPost, countPost]);

  const getAllPosts = async (e) => {
    const data = await fetch(`http://localhost:1337/posts`, {
      method: "get",
    });
    const res = await data.json();
    setAllPosts(res);
  };

  return (
    <section className={classes.starting}>
      <h1>Les derniers posts...</h1>
      <div className={classes.allPosts}>
        {allPosts.map((post) => (
          <SinglePost
            key={post.id}
            post={post}
            setCountPost={setCountPost}
            countPost={countPost}
            showLink={true}
          />
        ))}
      </div>
      {logStatus && <NewPost setLastPost={setLastPost} />}
    </section>
  );
};

export default PostsPage;
