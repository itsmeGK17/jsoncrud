import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Box, Button, Modal } from "@mui/material";
import { green } from "@mui/material/colors";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { uuid } from "uuid";
const Edit = () => {
  const [formData, setFormData] = useState({
    stuname: "",
    email: "",
  });
  // const [open, setOpen] = useState(false);
  const Swal = require("sweetalert2");
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    fetchJsonData();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchJsonData = async () => {
    try {
      const respons = await axios.get(`http://localhost:3333/student/${id}`);
      setFormData(respons.data);
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // alert("Data update SuccessFully");
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:3333/student/${id}`, formData);
        Swal.fire("Saved!", "", "success");
        navigate("/");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved");
        navigate("/");
      }
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      {/* <Modal open={open} onClose={handleClose}> */}
      <Grid
        container
        m={-8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%",
          backgroundColor: "transparent",
          boxShadow: 24,
          p: 4,
          borderRadius: "15px",
        }}
      >
        <Grid item sm={6} xs={12}>
          <Box
            sx={{ backgroundColor: green[400] }}
            textAlign="center"
            color={"white"}
            mx={3}
            mb={3}
            mt={5}
          >
            <Typography variant="h4">Update Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  placeholder="id"
                  name="id"
                  value={formData.id}
                  disabled
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  placeholder=" Enter Name"
                  name="stuname"
                  value={formData.stuname}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12} mx={15}>
                <TextField
                  variant="outlined"
                  placeholder=" Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item ms={6} xs={12}>
              <Box m={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Box>
            </Grid>
            <Box m={3} mx={19}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={backToHome}
              >
                Back To Home
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      {/* </Modal> */}
    </>
  );
};

export default Edit;

// import React, { useEffect, useState } from "react";
// import { Grid, TextField, Typography, Box, Button, Modal } from "@mui/material";
// import { green } from "@mui/material/colors";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { uuid } from "uuid";

// const Edit = () => {
//   const [formData, setFormData] = useState({
//     stuname: "",
//     email: "",
//   });
//   const [open, setOpen] = useState(false);
//   const Swal = require("sweetalert2");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJsonData();
//   }, [id]);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const fetchJsonData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3333/student/${id}`);
//       setFormData(response.data);
//     } catch (error) {
//       throw new Error("Something is Wrong");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await Swal.fire({
//         title: "Do you want to save the changes?",
//         showDenyButton: true,
//         showCancelButton: true,
//         confirmButtonText: "Save",
//         denyButtonText: `Don't save`,
//       });

//       if (result.isConfirmed) {
//         await axios.put(`http://localhost:3333/student/${id}`, formData);
//         Swal.fire("Saved!", "", "success");
//         navigate("/");
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved");
//         navigate("/");
//       }
//     } catch (error) {
//       throw new Error("Something is Wrong");
//     }
//   };

//   const handleOpen = () => {
//     setOpen(true);

//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const backToHome = () => {

//   };

//   return (
//     <>
//       <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
//         <Grid item sm={6} xs={12}>
//           <Box sx={{ backgroundColor: green[400] }} textAlign="center" color={"white"} mx={3} mb={3} mt={5}>
//             <Typography variant="h4">Update Student</Typography>
//           </Box>
//           <Button onClick={handleOpen}>Edit</Button>
//         </Grid>
//       </Grid>

//       <Modal open={open} onClose={handleClose}>
//         <Grid container justifyContent="center" alignItems="center" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '50%' }}>
//           <Grid item sm={6} xs={12}>
//             <Typography variant="h4">Update Student</Typography>
//             <form onSubmit={handleUpdate}>
//               <Grid container spacing={2}>
//                 <Grid item md={6} xs={12} >
//                   <TextField variant="outlined" placeholder="id" name="id" value={formData.id} dis fullWidth />
//                 </Grid>
//                 <Grid item md={6} xs={12} >
//                   <TextField variant="outlined" placeholder=" Enter Name" name="stuname" value={formData.stuname} onChange={handleInput} fullWidth />
//                 </Grid>
//                 <Grid item md={6} xs={12} >
//                   <TextField variant="outlined" placeholder=" Enter Email" name="email" value={formData.email} onChange={handleInput} fullWidth />
//                 </Grid>
//               </Grid>
//               <Grid item ms={6} xs={12} >
//                 <Box m={3}>
//                   <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
//                 </Box>
//               </Grid>
//               <Box m={3}>
//                 <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
//               </Box>
//             </form>
//           </Grid>
//         </Grid>
//       </Modal>
//     </>
//   );
// };

// export default Edit;
