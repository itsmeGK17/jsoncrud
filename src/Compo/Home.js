import React, { useState } from "react";
import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import List from "./List";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    stuname: "",
    email: "",
    isActive: false,
  });

  const [status, setStatus] = useState(false);
  const [error, setError] = useState({
    stuname: "",
    email: "",
  });
  
  const Swal = require("sweetalert2");
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.match(regex)) {
      setError({ email: "plz enter valid email" });
      return;
    } else {
      setError({
        ...error,
        [formData.email]: "",
      });
      setError("");
    }
    if (formData.stuname !== "" && formData.email !== "") {
      try {
        await axios.post(`http://localhost:3333/student`, formData);
        setStatus(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Add SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        throw new Error("Somthing is Wrong ");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Name And Email!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  if (status) {
    return <Home />;
  }

  return (
    <>
      <Box textAlign="center" color={deepPurple[400]} p={2}>
        <Typography variant="h2">React-Crud</Typography>
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Grid item sm={6} xs={12}>
          <Box
            sx={{ backgroundColor: green[400] }}
            textAlign="center"
            color={"white"}
            mx={3}
            mb={3}
          >
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} mx={35}>
                <TextField
                  variant="outlined"
                  placeholder=" Enter Name"
                  name="stuname"
                  value={formData.stuname}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12} mx={35}>
                <TextField
                  variant="outlined"
                  placeholder=" Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  fullWidth
                  error={error.email}
                  helperText={error.email}
                  onMouseDown={(e) => setError(!error)}
                />
              </Grid>
              <Box mx={38}>
                <input
                  type="checkbox"
                  name="isActive"
                  value={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                <span>Is Active</span>
              </Box>
            </Grid>
            <Box m={3} mx={35}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
