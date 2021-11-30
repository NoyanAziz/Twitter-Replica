import React from "react";
import { CssBaseline, Paper, Box, Grid, Typography } from "@mui/material/";

import LoginSignupBanner from "./LoginSignupBanner";

const LoginSignupView = ({ Form }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <LoginSignupBanner />

      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={5}
        rowSpacing={16}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            m: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography component="h1" variant="h3" textAlign="left">
            Happening now
          </Typography>

          <Typography
            component="h1"
            variant="h5"
            textAlign="left"
            sx={{ mt: 2 }}
          >
            Login to Twitter
          </Typography>
          {Form}
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginSignupView;
