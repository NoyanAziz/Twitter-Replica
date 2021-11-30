import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Divider,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { timeSince, ExpandMore } from "../../utils";
import { TWEET_EDIT_OPTIONS, ITEM_HEIGHT } from "../../constants";
import {
  deleteTweet,
  updateTweet,
} from "../../redux/actions/tweetsActions/editTweetAction";

export const MyTweetsList = ({ myTweets, token, updateTweet, deleteTweet }) => {
  const [expanded, setExpanded] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [tweetClicked, setTweetClicked] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOptionsClick = (event, tweetId) => {
    setTweetClicked(tweetId);
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setTweetClicked(null);
    setAnchorEl(null);
  };

  const handleOptionSelect = (optionName) => {
    setAnchorEl(null);

    if (optionName === "Delete") {
      try {
        deleteTweet(tweetClicked, token);
      } catch (error) {
        console.log(error);
      }
    } else if (optionName === "Edit") {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTweetChange = () => {
    setDialogOpen(false);

    try {
      updateTweet(tweetClicked, editPost, token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Tweet</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter the body of your tweet in the following field
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="tweetBody"
            label="Tweet Body"
            type="text"
            fullWidth
            onChange={(event) => {
              setEditPost(event.target.value);
            }}
            value={editPost}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "initial" }} onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleTweetChange}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Box>
        <List>
          {myTweets.map((tweet) => (
            <ListItem key={tweet.id} xs={3}>
              <Card raised key={tweet.id} sx={{ width: 1, borderRadius: 3 }}>
                <CardHeader
                  avatar={<Avatar src={tweet.author.profile_picture} />}
                  action={
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls="long-menu"
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleOptionsClick(event, tweet.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={tweet.author.name}
                  subheader={timeSince(new Date(tweet.created_on))}
                />
                {tweet.image ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={tweet.image}
                    alt="Attached Image"
                  />
                ) : null}
                <CardContent>
                  <Typography color="text.primary">{tweet.body}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore expand={expanded} onClick={handleExpandClick}>
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Divider />
                  <CardContent>
                    <List spacing={4}>
                      {tweet.comments.length === 0 ? (
                        <ListItem key={tweet.id}>
                          <ListItemText elevation={1} alignItems="center">
                            <Typography variant="body2">
                              No comments to show
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ) : (
                        tweet.comments.map((comment, index) => (
                          <ListItem>
                            <Card
                              elevation={1}
                              key={index}
                              sx={{
                                borderRadius: 3,
                                p: 1,
                              }}
                            >
                              <Typography variant="body2">{comment}</Typography>
                            </Card>
                          </ListItem>
                        ))
                      )}
                    </List>
                  </CardContent>
                </Collapse>
              </Card>
              <Menu
                id="long-menu"
                elevation={1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleOptionsClose}
                PaperProps={{
                  style: {
                    backgroundColor: "whitesmoke",

                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {TWEET_EDIT_OPTIONS.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleOptionSelect(option.name)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText
                      style={
                        option.name === "Delete"
                          ? { color: "red" }
                          : { color: "initial" }
                      }
                    >
                      {option.name}
                    </ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
const mapDispatchToProps = {
  updateTweet: updateTweet,
  deleteTweet: deleteTweet,
};

export default connect(null, mapDispatchToProps)(MyTweetsList);
