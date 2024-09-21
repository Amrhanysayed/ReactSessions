import { useEffect, useState } from "react";
import "./posts.css";
import Navbar from "../components/navbar";

const Posts = () => {
  // TODO : create posts state using useState hook and name them posts, setPosts
  // TODO : create error state using useState hook and name them error, setError
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        // TODO : get posts from https://jsonplaceholder.typicode.com/posts and set them using setPosts
        const respsone = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!respsone.ok) throw new Error("fetching posts");
        const data = await respsone.json();
        setPosts(data);
      } catch (error) {
        // TODO : set error using setError
        setError(error);

        console.log(error);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      // TODO : delete post with given id from https://jsonplaceholder.typicode.com/posts
      // and set posts using setPosts and filter method to filter out deleted post(Hint : post => post.id !== id)

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      // TODO : set error using setError
      console.log(error);
    }
  };

  if (error) return <div>failed to load</div>; // when there is an error in fetching data from api, it will show failed to load
  if (!posts) return <div>loading...</div>; // when data is being fetched from api, it will show loading...
  return (
    <div>
      <Navbar posts={posts} setPosts={setPosts} />{" "}
      {/* TODO : pass posts and setPosts as props to Navbar component */}
      <div className="grid-container">
        {posts.map((post) => (
          <div className="grid-item" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div>
              <button
                className="delete-button"
                onClick={() => deletePost(post.id)}
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
