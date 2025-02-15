export default {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "title", type: "string", title: "Product Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title", maxLength: 96 } },
    { name: "image", type: "image", title: "Product Image", options: { hotspot: true } },
    { name: "brand", type: "string", title: "Brand" },  // ✅ Ensure it's a string
    { name: "storage", type: "string", title: "Storage" }, // ✅ Ensure it's a string
    { name: "ram", type: "string", title: "Ram" }, // ✅ Ensure it's a string
    { name: "price", type: "number", title: "Price" },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: { list: ["Electronics", "Clothing", "Accessories", "Home Decor"] },
    },
  ],
};
