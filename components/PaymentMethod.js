import Image from 'next/image';
import { useState } from "react";
import styles from '../styles/PaymentMethod.module.css';

const PaymentMethod = (props) => {

  const click = event => {
    props.setMethod(props.method);
  }

  return (
    <div onClick={click} className="cursor-pointer m-2 p-6 w-40 flex items-center space-x-4 bg-slate-300 hover:bg-slate-400">
      <Image src={props.svg} height={30} width={30}/>
      <p className="font-bold">{props.method}</p>
    </div>
  );
}

export default PaymentMethod;
