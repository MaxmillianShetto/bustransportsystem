import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { dateTime } from '../../helpers/dateConversion';
import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import './MyRides.css';

const MyRidesPage = (props) => {
  const [rides, setrides] = useState([]);

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const id = localStorage.getItem('id');
    const access_token = localStorage.getItem('token');
    axios.get(`/api/rides/${id}`, {headers: {'auth-token': `${access_token}`}})
    .then((res) =>{
      console.log(res.data)
      setrides(res.data)
    })
    .catch(err => {
      console.log(err)
    })


  }, []);

  return (
    <div className="MyRidesPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">My Rides</div>
        {rides !== null ? rides
                .slice(0)
								.reverse()
                .map((ride, index) => (
          <div className="Ride" key={index}>
            <div className="Date">{dateTime(ride.pickupTime)}</div>
            <div className="Departure">{ride.departureLocation}</div>
            <div className="Dest">{ride.destinationLocation}</div>
          </div>
          
        )): ""}    
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

export default connect(
  mapStateToProps
)(withRouter(MyRidesPage));
