import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMostPopularPosts,
  fetchNewPosts,
  fetchPosts,
  fetchTags,
} from "../redux/slices/posts";
import { Post } from "../components";

export const PostByTags = () => {
  //
  const { tag } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();

  React.useEffect(() => {
    axios
      .get(`/posts/tags/${tag}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting article");
      });
  }, []);

  console.log();
  //

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      {(isPostsLoading ? [...Array(5)] : data).map((obj, index) =>
        isPostsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <>
            <h1>{`#${tag}`}</h1>
            <Post
              key={obj._id}
              _id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
              }
              author={obj.author}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.author._id}
            />
          </>
        )
      )}
    </>
  );
};
