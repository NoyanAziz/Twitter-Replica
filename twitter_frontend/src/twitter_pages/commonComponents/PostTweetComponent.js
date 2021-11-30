import React, { useRef, useState } from "react";

import { connect } from "react-redux";

import { TextField, Box, IconButton, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { postTweet } from "../../redux/actions/tweetsActions/postTweetAction";

export const PostTweetComponent = ({ token, postTweet }) => {
  const attachFile = useRef(null);

  const [post, setPost] = useState("");

  const onAttachedFileChange = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    formData.append("body", post);

    if (post === "") {
      alert("Body must not be empty");
      return;
    }
    try {
      postTweet(formData, token);
    } catch (error) {
      console.log(error);
    }

    setPost("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("body", post);

    try {
      postTweet(formData, token);
    } catch (error) {
      console.log(error);
    }

    setPost("");
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        name="newPost"
        placeholder="What's happening?"
        onChange={(event) => {
          setPost(event.target.value);
        }}
        required
        value={post}
        variant="outlined"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <input
          id="profile_picture_file"
          access="image/*"
          ref={attachFile}
          type="file"
          style={{ display: "none" }}
          onChange={onAttachedFileChange}
        />

        <IconButton
          sx={{ mx: 2 }}
          onClick={() => {
            attachFile.current.click();
          }}
        >
          <AttachFileIcon />
        </IconButton>
        <Button color="primary" variant="contained" type="submit">
          Post
        </Button>
      </Box>
    </Box>
  );
};
const mapDispatchToProps = {
  postTweet: postTweet,
};

export default connect(null, mapDispatchToProps)(PostTweetComponent);
