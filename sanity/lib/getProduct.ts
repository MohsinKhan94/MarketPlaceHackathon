import { client } from "@/sanity/lib/client";

export async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const product = await client.fetch(query, { slug });

  return product || null;
}
