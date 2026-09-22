import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import {
  SOCIAL_CARDS,
  SOCIAL_CARD_SIZE,
  SocialCardKey,
  socialCardPath,
} from "@/lib/social-cards";

interface ArticleDetails {
  publishedTime: string;
  modifiedTime: string;
  authors?: string[];
}

interface SocialMetadataOptions {
  title: string;
  description: string;
  path: string;
  card: SocialCardKey;
  article?: ArticleDetails;
}

export function createSocialMetadata({
  title,
  description,
  path,
  card,
  article,
}: SocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const cardConfig = SOCIAL_CARDS[card];
  const image = {
    url: socialCardPath(card),
    width: SOCIAL_CARD_SIZE.width,
    height: SOCIAL_CARD_SIZE.height,
    alt: cardConfig.alt,
    type: "image/png",
  };
  const sharedOpenGraph = {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [image],
  };

  return {
    openGraph: article
      ? {
          ...sharedOpenGraph,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.authors ?? [SITE_URL],
        }
      : {
          ...sharedOpenGraph,
          type: "website",
        },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
