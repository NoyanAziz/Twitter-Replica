import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Link, Box, Grid, Typography } from "@mui/material/";

const SignupForm = ({ addNewUser }) => {
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let nameError;
    let passwordError;
    let confirmPasswordError;

    if (!values.name.match(/^[A-Za-z ]+$/)) {
      nameError = "Enter a valid name with only alphabets!!";
    }
    if (values.name.length < 2) {
      nameError = "Enter a valid name with at least two characters!!";
    }

    if (values.password.length < 8) {
      passwordError = "Password must be greater than 8 digit!!!";
    }
    if (values.password !== values.confirmPassword) {
      confirmPasswordError = "Password does not match!!!";
    }

    setErrors({
      ...errors,
      name: nameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (nameError || passwordError || confirmPasswordError) {
      console.log("Resolve error on input fields");
      return;
    }

    try {
      addNewUser(values);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            autoFocus
            id="name"
            name="name"
            label="Enter Full Name"
            type="firstName"
            value={values.name}
            helperText={errors.name}
            error={Boolean(errors.name)}
            onChange={handleChange}
            autoComplete="name"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={values.date_of_birth}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            helperText={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            onChange={handleChange}
            autoComplete="confirm-new-password"
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 6, mb: 2, p: 2 }}
      >
        Sign Up
      </Button>

      <Link href="/login" variant="body2">
        {"Already have an account? Login"}
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

export default SignupForm;
