import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, TextField, Link, Box, Typography } from "@mui/material/";

const LoginForm = ({ authenticateUser }) => {
  const history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      authenticateUser(values);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
      <TextField
        required
        fullWidth
        autoFocus
        margin="normal"
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={handleChange}
        autoComplete="email"
      />

      <TextField
        required
        fullWidth
        margin="normal"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={handleChange}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 4, mb: 2, p: 2 }}
      >
        Sign In
      </Button>

      <Link href="/signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        {"Copyright © "}
        Twitter {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default LoginForm;
