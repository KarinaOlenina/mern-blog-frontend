import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { CommentsBlock, Post, TagsBlock } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMostPopularPosts,
  fetchNewPosts,
  fetchPosts,
  fetchTags,
} from "../redux/slices/posts";
import { logout } from "../redux/slices/auth";

//
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  console.log(posts);

  const [isNew, setIsNew] = React.useState(true);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setIsNew(!isNew);
  };

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    if (isNew) {
      dispatch(fetchNewPosts());
      dispatch(fetchTags());
    } else {
      dispatch(fetchMostPopularPosts());
      dispatch(fetchTags());
    }
  }, [isNew]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            onChange={handleChange}
            style={{ marginBottom: 15 }}
            value={value}
            aria-label="basic tabs example"
          >
            <Tab onClick={handleClick} label="New" {...a11yProps(0)} />
            <Tab onClick={handleClick} label="Popular" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading ? [...Array(5)] : posts.items).map(
                (obj, index) =>
                  isPostsLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      _id={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `http://localhost:4444${obj.imageUrl}`
                          : ""
                      }
                      author={obj.author}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={3}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.author._id}
                    />
                  )
              )}
            </Grid>
            <Grid xs={4} item>
              <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: "Olivia Adamson",
                      avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
                    },
                    text: "This is a test comment.",
                  },
                  {
                    user: {
                      fullName: "Amelia Evans",
                      avatarUrl: "https://mui.com/static/images/avatar/4.jpg",
                    },
                    text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading ? [...Array(5)] : posts.items).map(
                (obj, index) =>
                  isPostsLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      _id={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `http://localhost:4444${obj.imageUrl}`
                          : ""
                      }
                      author={obj.author}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={3}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.author._id}
                    />
                  )
              )}
            </Grid>
            <Grid xs={4} item>
              <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              <CommentsBlock
                items={[
                  {
                    user: {
                      fullName: "Olivia Adamson",
                      avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
                    },
                    text: "This is a test comment.",
                  },
                  {
                    user: {
                      fullName: "Amelia Evans",
                      avatarUrl: "https://mui.com/static/images/avatar/4.jpg",
                    },
                    text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};
