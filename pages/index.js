import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import PaymentGateway from '../components/PaymentGateway';

export default function Home() {
  return (
    <div>
      <PaymentGateway />
    </div>
  )
}
