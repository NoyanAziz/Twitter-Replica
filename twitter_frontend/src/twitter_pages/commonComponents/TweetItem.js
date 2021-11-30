import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Divider,
  ListItem,
  Avatar,
  Typography,
  CardMedia,
  IconButton,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Collapse,
  List,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  likeTweet,
  unlikeTweet,
} from "../../redux/actions/tweetsActions/likeTweetAction";
import { timeSince, ExpandMore } from "../../utils";

export const TweetItem = ({
  key,
  tweet,
  authenticatedUser,
  token,
  likeTweet,
  unlikeTweet,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikes = (liked, tweetId) => {
    if (liked) {
      try {
        unlikeTweet(tweetId, token);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        likeTweet(tweetId, token);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ListItem xs={3}>
      <Card raised key={key} sx={{ width: 1, borderRadius: 3 }}>
        <CardHeader
          avatar={<Avatar src={tweet.author.profile_picture} />}
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
          <IconButton
            sx={{ pl: 2, width: 10 }}
            onClick={() =>
              handleLikes(
                tweet.likes.some((like) => like === authenticatedUser.email),
                tweet.id
              )
            }
          >
            {tweet.likes.some((like) => like === authenticatedUser.email) ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <List spacing={4}>
              {tweet.comments.length === 0 ? (
                <ListItem key={key}>
                  <ListItemText elevation={1} key={key} alignItems="center">
                    <Typography variant="body2">No comments to show</Typography>
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
    </ListItem>
  );
};

const mapDispatchToProps = {
  likeTweet: likeTweet,
  unlikeTweet: unlikeTweet,
};

export default connect(null, mapDispatchToProps)(TweetItem);
