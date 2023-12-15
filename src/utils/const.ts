import { groq } from 'next-sanity';

export const pagesQuery = groq`
  *[_type == $documentType && !(_id in path('drafts.**'))]{
    _id,_type,_updatedAt,"title": coalesce(title,name)
  } | order(_updatedAt desc)
`;
