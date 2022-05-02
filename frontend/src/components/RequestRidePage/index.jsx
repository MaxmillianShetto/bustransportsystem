import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import { isValidEmail, isValidUsername, trimmed } from '../../helpers';
import Button from '../Button';
import InputTextField from '../InputText';
import Navbar from '../Navbar';
import Select from 'react-select'

const RequestRidePage = (props) => {
  const [details, setDetails] = useState({
    departureLocation: '',
    destinationLocation: '',
    numberOfSits: '',
    disabledPeople: '',
  });

  const [error, setError] = useState('');
  const [departureList, setdepartureList] = useState([]);
  const [destinationList, setdestinationList] = useState([]);

  const [showSuggestedDep, setShowSuggestedDep] = useState(false);
  const [showSuggestedDest, setShowSuggestedDest] = useState(false);

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const id = localStorage.getItem('id');
    axios.get(`/api/rides/${id}`)
      .then((res) => {
        const templist1 = [];
        const templist2 = [];
        console.log(res.data);
        res.data.forEach(ride => {
          templist1.push({ value: ride.departureLocation, label: ride.departureLocation });
          templist2.push({ value: ride.destinationLocation, label: ride.destinationLocation });
          setdepartureList(templist1);
          setdestinationList(templist2);
        });
      })
      .catch(err => {
        console.log(err)
      })


  }, []);

  const [pickupTime, onDateTimeChange] = useState(new Date());
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'black',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  const handleSelectChange1 = (e) => {
    setShowSuggestedDep(false);
    setDetails({
      ...details,
      ["departureLocation"]: e.value
    });
  }
  const handleSelectChange2 = (e) => {
    setShowSuggestedDest(false);
    setDetails({
      ...details,
      ["destinationLocation"]: e.value
    });
  }
  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name == "departureLocation") {
      setShowSuggestedDep(true);
      setShowSuggestedDest(false);
    } else if (name == "destinationLocation") {
      setShowSuggestedDest(true);
      setShowSuggestedDep(false);
    } else{
      setShowSuggestedDep(false);
      setShowSuggestedDest(false);
    }

    if (error) {
      setError('');
    }

    setDetails({
      ...details,
      [name]: value
    });
  };

  const handleRequestRide = () => {
    const {
      departureLocation,
      destinationLocation,
      numberOfSits,
      disabledPeople } = details;

    //* Trim user details

    if (!pickupTime || !departureLocation || !destinationLocation || !numberOfSits ||
      !disabledPeople) {
      setError('All fields are required');
      return;
    }

    const rideDetails = { ...details, pickupTime, passenger: localStorage.getItem('id') };

    console.log(rideDetails)

    axios.post('/api/rides/request', rideDetails)
      .then(res => {
        console.log(res.data);

        // props.saveUser(res.data);
        alert('Your ride has been requested')
        window.location.href = "/passenger/my-rides";
      })
      .catch((err) => {
        setError('Process failed, Confirm you are logged-in.');

        console.log(err);
      });
  };

  const handleClear = () => {
    setDetails({
      departureLocation: '',
      destinationLocation: '',
      numberOfSits: '',
      disabledPeople: '',
    });
  }

  const handleCancel = () => {
    setError('Request cancelled');
    setTimeout(() => setError(''), 2000);
  }

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    localStorage.removeItem('state');
  }, []);

  return (
    <div className="RequestRidePage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">Request ride</div>

        <DateTimePicker
          onChange={onDateTimeChange}
          value={pickupTime}
        />

        <InputTextField
          id="departureInput"
          required
          type="text"
          name="departureLocation"
          value={details.departureLocation}
          placeholder="Departure Location"
          onChange={handleChange}
        />
        {/* A div containing top n departure location as sugestion, 
    invicible until dep filled is focusedy, http://localhost:3000/passenger/request-ride
    when clicked will auto populate*/}
        {showSuggestedDep &&
          <Select
            onChange={handleSelectChange1}
            placeholder="Suggestions"
            styles={customStyles}
            options={departureList} />}

        <InputTextField
          required
          type="text"
          name="destinationLocation"
          value={details.destinationLocation}
          placeholder="Destination Location"
          onChange={handleChange}
        />
        {showSuggestedDest &&
          <Select onChange={handleSelectChange2}
            placeholder="Suggestions"
            styles={customStyles}
            options={destinationList} />}

        <InputTextField
          required
          type="number"
          name="numberOfSits"
          value={details.numberOfSits}
          placeholder="Number of seats"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="number"
          name="disabledPeople"
          value={details.disabledPeople}
          placeholder="Disabled people"
          onChange={handleChange}
        />

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        <Button
          label="request ride"
          onClick={handleRequestRide}
        />

        <Button
          label="Clear"
          className="CancelBtn"
          onClick={handleClear}
        />

        <Button
          label="cancel"
          className="CancelBtn"
          onClick={handleCancel}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  saveUser
};

RequestRidePage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RequestRidePage));
