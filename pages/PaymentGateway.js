import { useState } from "react";
import PaymentMethod from "../components/PaymentMethod";

const PaymentGateway = () => {

  const [method, setMethod] = useState("");

  const print = event => {
    event.preventDefault();
    console.log("hola");
  }

  if(method === ""){
    console.log("default")
  }

  return (
    <div onClick={print} className="flex flex-row flex-wrap space-x-1">
      <PaymentMethod svg={"/card.svg"} method={"Card"} setMethod={setMethod}/>
      <PaymentMethod svg={"/bank.svg"} method={"Bank debit"}/>
      <PaymentMethod svg={"/bitcoin.svg"} method={"Bitcoin"}/>
    </div>
  );

};

export default PaymentGateway;
