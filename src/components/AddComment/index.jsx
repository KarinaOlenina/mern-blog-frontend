import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import { Avatar, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { fetchComment } from "../../redux/slices/comments";
import { fetchPosts } from "../../redux/slices/posts";

export const Index = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting article");
      });
  }, []);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      content: "Hi",
    },
    mode: "onChange", //реагировать только на изменения
  });

  const onSubmit = async (values) => {
    values.postId = id;
    const data = await dispatch(fetchComment(values));
    console.log("=>", data);

    if (!data["payload"]) {
      return alert("Failed to create comment, sorry (×﹏×)");
    }

    // if ("token" in data["payload"]) {
    //   window.localStorage.setItem("token", data["payload"].token);
    // } /*else { todo check this code block
    //   alert("Failed to create comment (×﹏×)");
    // }*/
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data && (data.author.avatarUrl || "")}
        />
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name={"content"}
              type={"text"}
              {...register("content")}
              label="Write a comment"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
            />
            <Button type={"submit"} variant="contained">
              Publish
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
