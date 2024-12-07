import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";

const PostPage = () => {
    const {posts,handleDelete}=useContext(DataContext)
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <div className="postActions">
              <Link to={`/post/edit/${post.id}`}>
                <button className="editPostButton">Edit Post</button>
              </Link>
              <button
                className="deletePostButton"
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>We couldn't find the post you're looking for.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};



export default PostPage;

