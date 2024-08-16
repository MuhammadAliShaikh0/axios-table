import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5478/users/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5478/users/${id}`, userData)
      .then(() => {
        alert("User updated successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={24}
        sx={{ margin: 2, padding: 3, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Edit User
        </Typography>
        <TextField
          name="name"
          label="Full Name"
          value={userData.name}
          required
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          name="username"
          label="Username"
          required
          value={userData.username}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          name="email"
          label="Email"
          required
          value={userData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          name="phone"
          label="Phone"
          required
          value={userData.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="contained" type="submit" sx={{ width: "100%" }}>
          Update User
        </Button>
      </Paper>
    </form>
  );
};

export default EditUser;
