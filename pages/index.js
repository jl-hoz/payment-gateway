import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentGateway from '../components/PaymentGateway';



export default function Home() {
  return (
    <div>
      <PaymentGateway/>
    </div>
  )
}
