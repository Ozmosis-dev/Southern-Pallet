import { createElement } from "react";
import { ImageResponse } from "next/og";
import SocialCardImage from "@/components/seo/social-card-image";
import {
  isSocialCardKey,
  SOCIAL_CARDS,
  SOCIAL_CARD_SIZE,
  SOCIAL_CARD_VERSION,
} from "@/lib/social-cards";

export const runtime = "nodejs";
export const revalidate = 31536000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ version: string; card: string }> },
) {
  const { version, card } = await params;
  if (version !== SOCIAL_CARD_VERSION || !isSocialCardKey(card)) {
    return new Response("Social card not found", { status: 404 });
  }

  const imageUrl = new URL(SOCIAL_CARDS[card].image, request.url).toString();

  return new ImageResponse(createElement(SocialCardImage, { card, imageUrl }), {
    ...SOCIAL_CARD_SIZE,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
