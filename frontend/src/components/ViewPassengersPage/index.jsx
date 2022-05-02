import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ViewPassengersPage.css';
import Navbar from '../Navbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ViewPassengersPage = (props) => {
  const [passengers, setPassengers ] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const access_token = localStorage.getItem('token');
    axios.get('/api/user/passenger',
    {headers: {'auth-token': `${access_token}`}})
      .then(res => {
        console.log(res.data);
        // setPassengers(res.data);
      })
      .catch((err) => {
        setError('Process failed.');
        
        console.log(err);
      });
    
    localStorage.removeItem('state');
  }, []);

  return (
    <div className="ViewPassengersPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">List of passengers</div>

        {error && (
          <div className="Error">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { passengers: state.passengers }
);

export default connect(
  mapStateToProps
)(withRouter(ViewPassengersPage));
