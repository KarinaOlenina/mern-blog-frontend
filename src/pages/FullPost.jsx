import React from "react";
import { useParams } from "react-router-dom";

import { CommentsBlock, Post } from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import comments from "../redux/store";

export const FullPost = () => {
  const comment = useSelector((state) => state.comments.data);
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting article");
      });
  }, [comment]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        author={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock
        items={
          data["comments"] &&
          data["comments"].map((comment) => ({
            user: {
              fullName: comment["author"].fullName,
              avatarUrl: comment["author"].avatarUrl || "",
            },
            text: comment.content,
          }))
        }
        isLoading={false}
      ></CommentsBlock>
    </>
  );
};
