import { useState } from "react";

import PaymentMethod from "./PaymentMethod";
import CardDetails from "./CardDetails";

const PaymentGateway = () => {

  const [method, setMethod] = useState("");

  const paymentMethods = (
    <div className="flex flex-row flex-wrap space-x-1">
      <PaymentMethod svg={"/card.svg"} method={"Card"} setMethod={setMethod}/>
      <PaymentMethod svg={"/bank.svg"} method={"Bank debit"} setMethod={setMethod}/>
      <PaymentMethod svg={"/bitcoin.svg"} method={"Bitcoin"} setMethod={setMethod}/>
    </div>
  );



  return (
    <div>
      {method === "" ? paymentMethods : null}
      {method === "Card" ? <CardDetails/> : null}
    </div>
  );

};

export default PaymentGateway;
