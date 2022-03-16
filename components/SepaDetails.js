import React, {useState} from 'react';
import {IbanElement, useStripe, useElements} from '@stripe/react-stripe-js';

import styles from './SepaDetails.module.css';

const SepaDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [readedTerms, setReadedTerms] = useState(false);

  const toggleTerms = () => {
    setReadedTerms(!readedTerms);
  }

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      addMessage('Stripe.js has not yet loaded.');
      return;
    }

    const {error: backendError, clientSecret} = await fetch(
      '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'sepa_debit',
          currency: 'eur',
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);
      return;
    }

    addMessage('Client secret returned');

    const {
      error: stripeError,
      paymentIntent,
    } = await stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: elements.getElement(IbanElement),
        billing_details: {
          name,
          email,
        },
      },
    });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }

    // Initially the test PaymentIntent will be in the `processing` state.
    // We'll refetch the payment intent client-side after 5 seconds to show
    // that it successfully transitions to the `succeeded` state.
    //
    // In practice, you should use webhook notifications for fulfillment.
    if(paymentIntent.status === 'processing') {
      addMessage(
        `Payment processing: ${paymentIntent.id} check webhook events for fulfillment.`
      );
      addMessage('Refetching payment intent in 5s.');
      setTimeout(async () => {
        const {paymentIntent: pi} = await stripe.retrievePaymentIntent(clientSecret);
        addMessage(`Payment (${pi.id}): ${pi.status}`);
      }, 5000)
    } else {
      addMessage(`Payment (${paymentIntent.id}): ${paymentIntent.status}`);
    }

  };

  return (
    <div className={styles.card}>
      <h1>SEPA Direct Debit</h1>

      <form className={styles.paymentform} id="payment-form" onSubmit={handleSubmit}>

        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              placeholder="Joe Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              placeholder="joedoe@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="container flex flex-col">
            <label htmlFor="iban-element">Bank Account</label>
            <IbanElement
              id="iban-element"
              options={{supportedCountries: ['SEPA']}}
            /></div>
        </div>
        <div id="error-message" role="alert"></div>

        <br/>
        <small id="mandate-acceptance">
          By providing your payment information and confirming this payment, you authorise
          (A) this website and Stripe,
          our payment service provider and/or PPRO, its local service provider, to send
          instructions to your bank to debit your account and (B) your bank to debit your
          account in accordance with those instructions. As part of your rights, you are
          entitled to a refund from your bank under the terms and conditions of your agreement
          with your bank. A refund must be claimed within 8 weeks starting from the date on
          which your account was debited. Your rights are explained in a statement that you
          can obtain from your bank. You agree to receive notifications for future debits up
          to 2 days before they occur.
        </small>

        <div className="mt-5 mb-5">
          <input type="checkbox" checked={readedTerms} onChange={toggleTerms}/>
          <span> <small>I agree to the terms of service</small></span>
        </div>

        <button type="submit" disabled={!stripe || !readedTerms}>Pay</button>
      </form>

    </div>
  );
};

export default SepaDetails;
