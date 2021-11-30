import { formatDistance } from "date-fns";
import { styled, IconButton } from "@mui/material";

export const getRequestHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const timeSince = (date) => {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
};

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
