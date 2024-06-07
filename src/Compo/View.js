import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
// import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const View = () => {
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchJsonData();
  }, [id]);

  const fetchJsonData = async () => {
    try {
      const respons = await axios.get(`http://localhost:3333/student/${id}`);
      setStudents(respons.data);
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#777777" }}>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students &&
              students?.map((student, id) => {
               
                return (
                  <TableRow key={id}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{student?.stuname}</TableCell>
                    <TableCell align="center">{student?.email}</TableCell>
                  </TableRow>
                );
              })}
            <Button onClick={navigate("/")}>Back</Button>
          </TableBody>
        </Table>
      </TableContainer>
      ;
    </>
  );
};

export default View;
