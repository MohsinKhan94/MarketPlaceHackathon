export default {
    name: "navigation",
    type: "document",
    title: "Navigation",
    fields: [
      {
        name: "links",
        type: "array",
        title: "Navigation Links",
        of: [
          {
            type: "object",
            fields: [
              { name: "title", type: "string", title: "Title" },
              { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
            ],
          },
        ],
      },
    ],
  };
  