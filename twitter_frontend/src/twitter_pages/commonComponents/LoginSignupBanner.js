import React from "react";
import { Grid } from "@mui/material";
import { BANNER_URL } from "../../constants";

const LoginSignupBanner = () => {
  return (
    <Grid
      container
      item
      xs={7}
      sx={{
        backgroundImage: `url(${BANNER_URL})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default LoginSignupBanner;
