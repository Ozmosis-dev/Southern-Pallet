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

  if (!apiKey && !notificationEmail && !fromEmail) {
    throw new LeadDeliveryNotConfiguredError();
  }

  if (!apiKey || !notificationEmail || !fromEmail) {
    throw new LeadDeliveryFailedError(
      "Resend lead delivery configuration is incomplete.",
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [notificationEmail],
    replyTo,
    subject,
    text: buildLeadEmailText(formType, payload),
  });

  if (error) {
    throw new LeadDeliveryFailedError(`Resend delivery failed: ${error.message}`);
  }

  return { channels: ["resend"] };
}
