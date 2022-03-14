import Image from 'next/image';
import { useState } from "react";
import styles from '../styles/PaymentMethod.module.css';

const PaymentMethod = (props) => {

  const click = (event) {
    prevent.Default();
    props.setMethod(props.method);
  }

  return (
    <div className="cursor-pointer m-2 p-6 max-w-sm flex items-center space-x-4 bg-grey hover:bg-slate-300">
      <Image src={props.svg} height={30} width={30}/>
      <p className="font-bold">{props.method}</p>
    </div>
  );
}

export default PaymentMethod;
