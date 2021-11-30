import { useEffect } from "react";
import { connect } from "react-redux";

import { Box, List, ListItem, ListItemText } from "@mui/material/";

import { fetchNotifications } from "../../redux/actions/notificationsAction";
import { timeSince } from "../../utils";

const token = localStorage.getItem("access");

const Notifications = ({ notifications, fetchNotifications }) => {
  useEffect(() => {
    fetchNotifications(token);
  }, [fetchNotifications]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}>
        {notifications.map((notification) => (
          <ListItem
            divider={true}
            sx={{ my: "20px" }}
            button
            key={notification.id}
          >
            <ListItemText
              primary={notification.verb}
              secondary={timeSince(new Date(notification.timestamp).getTime())}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});
const mapDispatchToProps = {
  fetchNotifications: fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
