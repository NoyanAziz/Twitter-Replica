import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material/";

import { DRAWER_WIDTH, DRAWER_ITEMS } from "../../constants";
import Logo from "../Logo";

const HomeDrawer = ({
  removeAuthenticatedUser,
  removeNotifications,
  removeTweets,
}) => {
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = useState(
    localStorage.getItem("drawerIndex")
      ? parseInt(localStorage.getItem("drawerIndex"))
      : 0
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        marginLeft: 20,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          marginLeft: 20,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Logo />
        <Button
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("authenticatedUser");
            localStorage.removeItem("drawerIndex");
            removeAuthenticatedUser();
            removeNotifications();
            removeTweets();
            history.push("/login");
          }}
        >
          {" "}
          Logout
        </Button>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {DRAWER_ITEMS.map((item, index) => (
            <ListItem
              component={Link}
              to={"/" + item.title}
              sx={{ my: "10px" }}
              button
              key={item.title}
              onClick={() => {
                setSelectedIndex(index);
                localStorage.setItem("drawerIndex", index);
              }}
            >
              <ListItemIcon
                style={selectedIndex === index ? { color: "#1DA1F2" } : {}}
              >
                {selectedIndex === index ? item.selectedIcon : item.icon}
              </ListItemIcon>

              <ListItemText
                style={selectedIndex === index ? { color: "#1DA1F2" } : {}}
                primary={item.title}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default HomeDrawer;
