import HomeFilledIcon from "@mui/icons-material/Home";
import ExploreFilledIcon from "@mui/icons-material/Explore";
import NotificationsFilledIcon from "@mui/icons-material/Notifications";
import PersonFilledIcon from "@mui/icons-material/Person";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DRAWER_WIDTH = 260;
export const ITEM_HEIGHT = 48;
export const BANNER_URL =
  "https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png";

export const DRAWER_ITEMS = [
  {
    title: "Home",
    icon: <HomeOutlinedIcon />,
    selectedIcon: <HomeFilledIcon />,
  },
  {
    title: "Explore",
    icon: <ExploreOutlinedIcon />,
    selectedIcon: <ExploreFilledIcon />,
  },
  {
    title: "Notifications",
    icon: <NotificationsOutlinedIcon />,
    selectedIcon: <NotificationsFilledIcon />,
  },
  {
    title: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    selectedIcon: <PersonFilledIcon />,
  },
  {
    title: "My Tweets",
    icon: <PersonOutlineOutlinedIcon />,
    selectedIcon: <PersonFilledIcon />,
  },
];

export const TWEET_EDIT_OPTIONS = [
  {
    name: "Edit",
    icon: <EditIcon fontSize="small" style={{ color: "text.secondary" }} />,
  },
  {
    name: "Delete",
    icon: <DeleteIcon fontSize="small" style={{ color: "text.secondary" }} />,
  },
];
