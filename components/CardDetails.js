import { useState } from "react";

const CardDetails = () => {

  const [fullname, setFullname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCVC] = useState("");

  const submit = () => {
    console.log(fullname);
    console.log(cardNumber);
    console.log(expiration);
    console.log(cvc);

    event.preventDefault();
  }

  return (
    <div className="container bg-slate-200">
      <form onSubmit={submit}>
        <div className="pt-6 mb-6">
          <label htmlFor="full-name" className="block mb-2 text-sm font-medium">Full name</label>
          <input type="text" id="full-name" onChange={(e) => setFullname(e.target.value)} className="border bg-slate-300 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
        </div>
        <div className="mb-6">
          <label htmlFor="card-number" className="block mb-2 text-sm font-medium">Card number</label>
          <input type="text" id="card-number" onChange={(e) => setCardNumber(e.target.value)} className="border bg-slate-300 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
        </div>
        <div className="flex flex-wrap space-x-4">
          <div className="mb-6">
            <label htmlFor="expiration" className="block mb-2 text-sm font-medium">Expiration</label>
            <input type="text" id="expiration" onChange={(e) => setExpiration(e.target.value)} className="border bg-slate-300 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
          <div className="mb-6">
            <label htmlFor="cvc" className="block mb-2 text-sm font-medium">CVC</label>
            <input type="text" id="cvc" onChange={(e) => setCVC(e.target.value)} className="border bg-slate-300 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );

}

export default CardDetails;
