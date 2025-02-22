import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-16',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
