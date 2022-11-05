import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      {props.step1 ? (
        <div className="active"><CheckCircleIcon htmlColor="#00B761" /> Signin</div>
      ) : (
        <div>1. Signin</div>
      )}
      {props.step2 ? (
        <div className="active"><CheckCircleIcon htmlColor="#00B761" /> Shipping</div>
      ) : (
        <div>2. Shipping</div>
      )}
      {props.step3 ? (
        <div className="active"><CheckCircleIcon htmlColor="#00B761" /> Payment</div>
      ) : (
        <div>3. Payment</div>
      )}
      {props.step4 ? (
        <div className="active"><CheckCircleIcon htmlColor="#00B761" /> Order</div>
      ) : (
        <div>4. Order</div>
      )}
    </div>
  );
}
