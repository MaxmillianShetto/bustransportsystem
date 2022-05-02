import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ViewPassengersPage.css";
import Navbar from "../Navbar";
import { dateTime } from "../../helpers/dateConversion";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewPassengersPage = (props) => {
  const [passengers, setPassengers] = useState([]);
  const [error, setError] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#54A0EE",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const access_token = localStorage.getItem("token");
    axios
      .get("/api/user/passenger", {
        headers: { "auth-token": `${access_token}` },
      })
      .then((res) => {
        console.log(res.data);
        setPassengers(res.data);
      })
      .catch((err) => {
        setError("Process failed.");

        console.log(err);
      });

    localStorage.removeItem("state");
  }, []);

  return (
    <div className="ViewPassengersPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">List of passengers</div>
        {passengers !== null ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell align="right">Time</StyledTableCell>
                  <StyledTableCell align="right">Pickup</StyledTableCell>
                  <StyledTableCell align="right">Destination</StyledTableCell>
                  <StyledTableCell align="right">Seats</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passengers.map((passenger, index) => (
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {passenger.passenger.firstname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{passenger.pickupTime}</StyledTableCell>
                  <StyledTableCell align="right">{passenger.departureLocation}</StyledTableCell>
                  <StyledTableCell align="right">{passenger.destinationLocation}</StyledTableCell>
                  <StyledTableCell align="right">{passenger.numberOfSits}</StyledTableCell>
                </StyledTableRow>
                // <div className="passenger" key={index}>
                //   <div className="Username">
                //     {this.state.passenger.passenger.firstname +
                //       " " +
                //       this.state.passenger.passenger.lastname}
                //   </div>
                //   <div className="Time">{dateTime(this.state.passenger.pickupTime)}</div>
                //   <div className="Departure">{this.state.passenger.departureLocation}</div>
                //   <div className="Dest">{this.state.passenger.destinationLocation}</div>
                // </div>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
        {error && <div className="Error">{error}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ passengers: state.passengers });

export default connect(mapStateToProps)(withRouter(ViewPassengersPage));
