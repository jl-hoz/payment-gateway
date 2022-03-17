import React, { useState, useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentMethod from "./PaymentMethod";
import CardDetails from "./CardDetails";
import SepaDetails from "./SepaDetails";

const PaymentGateway = () => {

  const [method, setMethod] = useState("");

  const paymentMethods = (
    <div className="flex flex-row flex-wrap space-x-1">
      <PaymentMethod svg={"/card.svg"} method={"Card"} setMethod={setMethod}/>
      <PaymentMethod svg={"/bank.svg"} method={"Bank debit"} setMethod={setMethod}/>
      <PaymentMethod svg={"/bitcoin.svg"} method={"Bitcoin"} setMethod={setMethod}/>
    </div>
  );

  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    fetch('api/keys', {
      method: 'GET',
      headers: {'ContentType': 'application/json'},
    })
      .then((res) => res.json())
      .then((data) => {
        setPublishableKey(data.publishableKey);
      })
  });

  if(!publishableKey){
    return 'Loading...';
  }

  const stripeKey = loadStripe(publishableKey);

  return (
    <div>
      {method === "" ? paymentMethods : null}
      {method === "Card" ? <Elements stripe={stripeKey}><CardDetails/></Elements> : null}
      {method === "Bank debit" ? <Elements stripe={stripeKey}><SepaDetails/></Elements> : null}
    </div>
  );

};

export default PaymentGateway;
