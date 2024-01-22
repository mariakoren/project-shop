import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const AllInvoices = () => {
  const { data: invoices, reFetch } = useFetch('http://localhost:8800/api/buy');
  const handleDelete = async (invoiceId) => {
    console.log(invoiceId)
    await axios.delete(`http://localhost:8800/api/buy/${invoiceId}`,  { withCredentials: true })
    .then(response => {
        reFetch()
        console.log(response.data);
    })
    .catch(error => {
        console.error(error.response.data);
    });
  }



  return (
    <div>
      {invoices.map((invoice) => (
        <ul key={invoice._id}>
          <li>
            {invoice.userId} {invoice.itemDetails.itemId} {invoice.itemDetails.quantity}
            <button onClick={()=>handleDelete(invoice._id)}>usuń</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default AllInvoices;