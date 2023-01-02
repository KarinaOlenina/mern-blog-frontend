import React from "react";
import { useDispatch } from "react-redux";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import { Avatar, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { fetchComment } from "../../redux/slices/comments";

export const Index = (image) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      content: "Hi",
    },
    mode: "onChange", //реагировать только на изменения
  });

  const onSubmit = async (values) => {
    values.postId = id;
    const data = await dispatch(fetchComment(values));

    if (!data["payload"]) {
      return alert("Failed to create comment, sorry (×﹏×)");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={image.image} />
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
