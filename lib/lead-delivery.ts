import { Resend } from "resend";

export class LeadDeliveryNotConfiguredError extends Error {
  constructor() {
    super("Lead delivery is not configured.");
    this.name = "LeadDeliveryNotConfiguredError";
  }
}

export class LeadDeliveryFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadDeliveryFailedError";
  }
}

interface DeliverLeadOptions {
  formType: string;
  subject: string;
  replyTo: string;
  payload: Record<string, unknown>;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function formatFieldName(field: string): string {
  return field
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function buildLeadEmailText(
  formType: string,
  payload: Record<string, unknown>,
): string {
  const fields = Object.entries(payload)
    .map(([field, value]) => `${formatFieldName(field)}:\n${formatValue(value)}`)
    .join("\n\n");

  return `New Southern Pallet website lead\n\nForm Type:\n${formType}\n\n${fields}`;
}

export async function deliverLead({
  formType,
  subject,
  replyTo,
  payload,
}: DeliverLeadOptions): Promise<{ channels: string[] }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL?.trim();
  const fromEmail = process.env.LEAD_FROM_EMAIL?.trim();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  const hasResendConfiguration = Boolean(
    apiKey || notificationEmail || fromEmail,
  );
  const channels: string[] = [];
  const failures: string[] = [];

  if (!hasResendConfiguration && !webhookUrl) {
    throw new LeadDeliveryNotConfiguredError();
  }

  if (hasResendConfiguration) {
    if (!apiKey || !notificationEmail || !fromEmail) {
      failures.push("Resend lead delivery configuration is incomplete.");
    } else {
      try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
          from: fromEmail,
          to: [notificationEmail],
          replyTo,
          subject,
          text: buildLeadEmailText(formType, payload),
        });

        if (error) {
          failures.push(`Resend delivery failed: ${error.message}`);
        } else {
          channels.push("resend");
        }
      } catch (error) {
        failures.push(
          `Resend delivery failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      }
    }
  }

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType }),
      });

      if (!response.ok) {
        failures.push(`Webhook delivery failed with status ${response.status}.`);
      } else {
        channels.push("webhook");
      }
    } catch (error) {
      failures.push(
        `Webhook delivery failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  if (channels.length === 0) {
    throw new LeadDeliveryFailedError(failures.join(" "));
  }

  if (failures.length > 0) {
    console.error("Lead delivery partially failed:", failures);
  }

  return { channels };
}
