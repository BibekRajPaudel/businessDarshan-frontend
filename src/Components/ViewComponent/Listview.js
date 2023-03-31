import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Listview = ({ rowsPerPage, page }) => {
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);

  const toogleStatus = (index) => {
    if (index === status) {
      setStatus(false);
      return;
    }
    setStatus(index);
  };

  const fetchPost = async () => {
    try {
      let res = await axios.get(
        "https://nomad-backend-nfw4.onrender.com/api/trip"
      );
      setData(res.data.trips);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_URL}/trip/${id}`);
    window.location.reload();
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
              <TableCell
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                S.N
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                Tour Name
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                Duration
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                Country
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  position: "relative",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <div className="flex items-center gap-5">{index + 1}</div>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <div className="flex items-center gap-5 hover:text-primary-blue cursor-pointer">
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full"
                      src={item.images[0]}
                      alt=""
                    />{" "}
                    {item.title}
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <p className="">USD {item.price}</p>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  {item.duration}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  {item.country}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                    position: "relative",
                  }}
                >
                  <p className="flex gap-5">
                    <span
                      onClick={() => toogleStatus(item._id)}
                      className="w-fit text-lg cursor-pointer hover:text-primary-blue"
                    >
                      <FiEdit2 />
                    </span>
                    <span className="w-fit text-lg cursor-pointer hover:text-red-500">
                      <AiOutlineDelete onClick={() => handleDelete(item._id)} />
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Listview;
