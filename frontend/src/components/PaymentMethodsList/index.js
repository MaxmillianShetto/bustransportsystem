import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import './PaymentMethodList.css';
import {saveState} from "../../helpers/localStorage";
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import {ReactComponent as TaxiImg} from "../../assets/images/taxi.svg";
import Button from "../Button";

const PaymentMethodList = (props) => {
    const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
        axios.get('/api/payments')
            .then(res => {
                setPaymentMethods(res.data.message);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
      },[])

  return (
    <div className="LoginPage Page">
      <div className="Form">
        <div className="FormTitle">Select Payment Method</div>

          <div>
              {paymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.name} >
                      <img src={'http://localhost:5000/images/'+paymentMethod.imageUrl} width={100} height={100} />
                      <h3>{paymentMethod.name}</h3>
                      <Button label="Pay"/>
                      <br/>
                  </div>
              ))}
          </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  {}
);

export default connect(
  mapStateToProps,
)(withRouter(PaymentMethodList));
