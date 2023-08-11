import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../context/OrderContext";

const CompletePage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      let response = await axios.post("http://localhost:4000/order", orderData);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const orderTable = orderHistory.map((item, key) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문 내역</h3>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>number</th>
              <th>price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <br />
        <button className="rainbow rainbow-i" onClick={() => setStep(0)}>
          첫 페이지로 이동
        </button>
      </div>
    );
  }
};

export default CompletePage;
