export default {
    name: "checkout",
    type: "document",
    title: "Checkout",
    fields: [
      {
        name: "user",
        type: "string",
        title: "User ID",
      },
      {
        name: "products",
        type: "array",
        title: "Purchased Products",
        of: [{ type: "reference", to: [{ type: "product" }] }],
      },
      {
        name: "totalAmount",
        type: "number",
        title: "Total Amount",
      },
      {
        name: "status",
        type: "string",
        title: "Order Status",
        options: {
          list: ["Pending", "Shipped", "Delivered"],
        },
      },
    ],
  };
  