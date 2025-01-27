import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  // Handle undefined or null `post`
  if (!post) {
    return <div>No post data available</div>;
  }

  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
      </Link>
      <p className="postBody">
        {post.body.length <= 25
          ? post.body
          : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
