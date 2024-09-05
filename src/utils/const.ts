export const documentsQuery = `
*[_type == $documentType && !(_id in path('drafts.**'))]{
    _id,
    language,
    "slug": slug.current,
    _type,
    _updatedAt,
    "title": coalesce(title,name)
  } | order(_updatedAt desc)
`;

export const I18N_NAMESPACE = 'syncContent';
