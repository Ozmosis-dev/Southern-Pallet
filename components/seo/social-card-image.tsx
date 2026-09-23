import { SOCIAL_CARD_SIZE, type SocialCardKey, SOCIAL_CARDS } from "@/lib/social-cards";

interface SocialCardImageProps {
  card: SocialCardKey;
  imageUrl: string;
}

export default function SocialCardImage({ card, imageUrl }: SocialCardImageProps) {
  const config = SOCIAL_CARDS[card];
  const titleSize = config.title.length > 42 ? 48 : 56;

  return (
    <div
      style={{
        width: SOCIAL_CARD_SIZE.width,
        height: SOCIAL_CARD_SIZE.height,
        display: "flex",
        backgroundColor: "#102c1b",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "54%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px 54px",
          backgroundImage:
            "linear-gradient(135deg, rgba(34,197,94,0.08), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #22c55e",
              color: "#22c55e",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            SP
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 18,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Southern Pallet Recycling
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#43d875",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            {config.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 520,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            {config.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.62)",
            fontSize: 17,
            letterSpacing: "0.04em",
          }}
        >
          southernpallet.co
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "46%",
          height: "100%",
          display: "flex",
          backgroundImage: `linear-gradient(90deg, rgba(16,44,27,0.22), transparent 35%), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 18,
            height: "100%",
            display: "flex",
            backgroundColor: "#22c55e",
          }}
        />
      </div>
    </div>
  );
}
