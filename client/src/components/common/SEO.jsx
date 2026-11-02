import React from 'react';
import { Helmet } from 'react-helmet-async';
import { fallbackData } from '../../data/fallbackData.js';

const SEO = ({
  title = fallbackData.profile.seo?.title || `${fallbackData.profile.name} | Full Stack Developer`,
  description = fallbackData.profile.seo?.description || fallbackData.profile.tagline,
  canonical = fallbackData.profile.socials?.find(s => s.platform.toLowerCase() === 'portfolio')?.url || "https://arjun.dev",
  ogImage = fallbackData.profile.seo?.ogImage || fallbackData.profile.photoUrl
}) => {
  const name = fallbackData.profile.name;
  const primaryEdu = fallbackData.profile.education?.[0]?.institution || "University";
  const socials = fallbackData.profile.socials?.map(s => s.url) || [];

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": canonical,
    "image": ogImage,
    "jobTitle": fallbackData.profile.headline,
    "alumniOf": primaryEdu,
    "sameAs": socials
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

export default SEO;
