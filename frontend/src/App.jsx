import axios from "axios";
import { useState } from "react";

const CreateOrder = () => {
  const [order, setOrder] = useState(null);

  const handleOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/order/create",
        {
          customerId: "6a0edfb4bf0994e202c1ad52",
          totalAmount: 100,
          productName: "6a0ed1aeffef921a7ebb19f6",
          Qty: 2,
          price: 50,
        }
      );

      setOrder(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleOrder}>
        Create Order
      </button>

      {order?.qrCode && (
        <img
          src={order.qrCode}
          alt="QR Code"
          width={250}
        />
      )}
    </div>
  );
};

export default CreateOrder;