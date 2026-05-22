const invoiceTemplate = (order) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body{
        font-family: Arial, sans-serif;
        padding: 40px;
      }

      .header{
        text-align:center;
      }

      table{
        width:100%;
        border-collapse: collapse;
        margin-top:20px;
      }

      table,th,td{
        border:1px solid #ddd;
      }

      th,td{
        padding:12px;
        text-align:left;
      }

      .total{
        text-align:right;
        margin-top:20px;
        font-size:20px;
        font-weight:bold;
      }
    </style>
  </head>

  <body>

    <div class="header">
      <h1>Water Factory Invoice</h1>
      <p>Invoice ID: ${order._id}</p> //order id
    </div>

    <h3>Customer Details</h3>
    <p>Name: ${order.customerId?.name}</p>
    <p>Email: ${order.customerId?.email}</p>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        ${
          order.items?.map(item => `
            <tr>
              <td>${item.productName}</td>
              <td>${item.quantity}</td>
              <td>₹${item.price}</td>
            </tr>
          `).join("")
        }
      </tbody>
    </table>

    <div class="total">
      Total Amount: ₹${order.totalAmount}
    </div>

  </body>
  </html>
  `;
};

export default invoiceTemplate;