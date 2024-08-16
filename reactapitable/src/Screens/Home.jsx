import React, { useEffect, useState } from "react";
import Tables from "../components/Table";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5478/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5478/users/${id}`)
      .then(() => {
        setUserData(userData.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/editUser/${id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        onClick={() => navigate("/createUser")}
        sx={{
          marginBottom: 5,
          float: "right",
          marginTop: 3,
          minWidth: { xs: "100%", md: "auto" },
        }}
        variant="contained"
      >
        Create new User
      </Button>
      <Tables data={userData} onDelete={handleDelete} onEdit={handleEdit} />
    </Box>
  );
};

export default Home;
