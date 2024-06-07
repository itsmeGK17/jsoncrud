import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  TableContainer,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import axios from "axios";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [students, setStudents] = useState([]);
  const [sort, setSort] = useState("Asc");

  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  // console.log("student", students);

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async (e) => {
    e?.preventDefault();
    try {
      const respons = await axios.get("http://localhost:3333/student");
      // console.log("first",respons.data)
      setStudents(respons.data);
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3333/student/${id}`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };
  const handleSort = () => {
    if (sort === "Asc") {
      const sortedStudent = students.sort((a, b) =>
        a.stuname > b.stuname ? 1 : -1
      );
      setSort("Dsc");
      setStudents(sortedStudent);
    } else if (sort === "Dsc") {
      const sortedStudent2 = students.sort((a, b) =>
        a.stuname < b.stuname ? 1 : -1
      );
      setSort("Asc");
      setStudents(sortedStudent2);
    }
  };
  return (
    <>
      <Grid item sm={6} xs={12}>
        <Box
          sx={{ backgroundColor: orange[400] }}
          textAlign="center"
          color={"white"}
        >
          <Typography variant="h4">Student List</Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#777777" }}>
                <TableCell align="center">No.</TableCell>
                <TableCell
                  align="center"
                  onClick={() => handleSort("Name")}
                  sx={{ cursor: "pointer" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() => handleSort("Name")}
                  sx={{ cursor: "pointer" }}
                >
                  Email
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students &&
                students?.map((student, id) => {
                  // console.log("123456", student);
                  return (
                    <TableRow key={id}>
                      <TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{student?.stuname}</TableCell>
                      <TableCell align="center">{student?.email}</TableCell>
                      <TableCell align="center">
                        <Tooltip placement="top" arrow title="Read">
                          <Button className="edit_btn">
                            <VisibilityIcon
                              onClick={() => navigate(`/view/${student.id}`)}
                            />
                          </Button>
                        </Tooltip>
                        <Tooltip placement="top" arrow title="Edit">
                          <Button>
                            <EditIcon
                              onClick={() => navigate(`/edit/${student.id}`)}
                            />
                          </Button>
                        </Tooltip>
                        <Tooltip placement="top" arrow title="Delete">
                          <Button onClick={() => handleDelete(student.id)}>
                            <DeleteForeverIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default List;
