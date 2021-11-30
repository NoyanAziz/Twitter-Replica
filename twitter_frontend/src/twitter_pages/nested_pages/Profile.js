import { useState, useRef } from "react";

import { connect } from "react-redux";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material/";

import AddAPhotoFilledIcon from "@mui/icons-material/AddAPhoto";

import { updateProfile } from "../../redux/actions/authenticatedUsersAction";

const token = localStorage.getItem("access");
let chosenPicture = "";

const Profile = ({ authenticatedUser, updateProfile }) => {
  const inputFile = useRef(null);

  const [profilePicture, setProfilePicture] = useState(
    authenticatedUser.profile_picture
  );

  const [values, setValues] = useState({
    ...authenticatedUser,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedValues = {
      name: values.name,
      date_of_birth: values.date_of_birth,
      bio: values.bio,
    };

    try {
      updateProfile(updatedValues, token);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profile_picture", event.target.files[0]);
    try {
      updateProfile(formData, token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />

        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <input
                id="profile_picture_file"
                access="image/*"
                ref={inputFile}
                type="file"
                style={{ display: "none" }}
                onChange={onFileChange}
              />

              <IconButton
                onMouseEnter={() => {
                  chosenPicture = profilePicture;
                  setProfilePicture(null);
                }}
                onMouseLeave={() => {
                  setProfilePicture(chosenPicture);
                }}
                onClick={() => {
                  inputFile.current.click();
                }}
              >
                <Avatar
                  src={profilePicture}
                  alt="Avatar"
                  sx={{ height: 200, width: 200 }}
                >
                  {" "}
                  <AddAPhotoFilledIcon />
                </Avatar>
              </IconButton>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the name"
                label="Full Name"
                name="name"
                onChange={handleChange}
                value={values.name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Date of birth"
                name="date_of_birth"
                type="date"
                onChange={handleChange}
                required
                value={values.date_of_birth}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                onChange={handleChange}
                type="text"
                multiline
                rows={4}
                rowsmax={Infinity}
                helperText="Please enter your bio"
                value={values.bio}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser.authenticatedUser,
});
const mapDispatchToProps = {
  updateProfile: updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
