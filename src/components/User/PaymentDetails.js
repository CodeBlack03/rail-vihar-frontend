import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentDetails.css';
import baseURL from '../../URL'

import Message from '../Message'
const PaymentDetail = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const errorMsg=null;
  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/users/payments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayment(response.data);
      } catch (error) {
        errorMsg = `Error fetching payment detail: ${error}`
        console.error('Error fetching payment detail:', error);
        alert("Error fetching payments")
      }
    };

    fetchPaymentDetail();
  }, [id]);

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/api/users/payments/${id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const originalFileName=`${payment.category}_${new Date(payment.date).toLocaleDateString()}`
      const contentType = response.headers['content-type']; // Get content type from headers
    const fileExtension = contentType.split('/')[1]; // Extract file extension
    const fileName = `${originalFileName}.${fileExtension}`; // Combine with original file name

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading payment receipt:', error);
    }
  };

  if (!payment) return <p>Loading...</p>;

  return (
    <div className="payment-detail">
      <h2>Payment Detail</h2>
      <div className="detail-item">
        <span>Amount:</span> <p>{payment.amount}</p>
      </div>
      <div className="detail-item">
        <span>Description:</span> <p>{payment.description}</p>
      </div>
      <div className="detail-item">
        <span>Date:</span> <p>{new Date(payment.date).toLocaleDateString()}</p>
      </div>
      <div className="detail-item">
        <span>Category:</span> <p>{payment.category}</p>
      </div>
      <div className="detail-item">
        <span>Status:</span> <p>{payment.status}</p>
      </div>
      <button className="button" onClick={handleDownload}>Download Receipt</button>
      <button className="button" onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default PaymentDetail;
