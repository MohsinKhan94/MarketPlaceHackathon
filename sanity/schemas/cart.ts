export default {
    name: "cart",
    type: "document",
    title: "Cart",
    fields: [
      {
        name: "user",
        type: "string",
        title: "User ID",
      },
      {
        name: "products",
        type: "array",
        title: "Cart Products",
        of: [{ type: "reference", to: [{ type: "product" }] }],
      },
      {
        name: "totalPrice",
        type: "number",
        title: "Total Price",
      },
    ],
  };
  