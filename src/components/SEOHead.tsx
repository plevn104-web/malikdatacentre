import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    category?: string;
    author?: string;
  };
  schema?: object | object[];
  noindex?: boolean;
}

const BASE_URL = "https://malikdatacentre.lovable.app";
const SITE_NAME = "Malik Data Centre";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/ELdLrlF51Neu7z6l8ImuURHqqG43/social-images/social-1766583032214-Futuristic metallic M logo design.png";

export const SEOHead = ({
  title,
  description,
  canonical,
  type = "website",
  article,
  schema,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.length > 50 ? title : `${title} | ${SITE_NAME}`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: DEFAULT_IMAGE,
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@malikdatacentre.store",
      contactType: "customer service",
    },
    sameAs: [],
  };

  const breadcrumbSchema = canonical
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          ...(canonical !== "/"
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: title.split("|")[0].trim(),
                  item: url,
                },
              ]
            : []),
        ],
      }
    : null;

  const schemas = [
    orgSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
  ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {canonical && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* Article specific */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.category && (
        <meta property="article:section" content={article.category} />
      )}

      {/* JSON-LD Schema */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
