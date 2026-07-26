import { createHash } from "node:crypto";
import { Resend } from "resend";

const DEFAULT_DELIVERY_TIMEOUT_MS = 8_000;

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

function getDeliveryTimeoutMs(): number {
  const configuredTimeout = Number(process.env.LEAD_DELIVERY_TIMEOUT_MS);

  if (Number.isFinite(configuredTimeout) && configuredTimeout > 0) {
    return configuredTimeout;
  }

  return DEFAULT_DELIVERY_TIMEOUT_MS;
}

function buildIdempotencyKey(
  formType: string,
  replyTo: string,
  payload: Record<string, unknown>,
): string {
  const submissionId =
    typeof payload.submissionId === "string" && payload.submissionId.trim()
      ? payload.submissionId.trim()
      : null;
  const digest = createHash("sha256")
    .update(
      JSON.stringify(
        submissionId
          ? { formType, replyTo, submissionId }
          : { formType, replyTo, payload },
      ),
    )
    .digest("hex");

  return `southern-pallet-${digest}`;
}

async function runWithTimeout<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timeout);
  }
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
  const timeoutMs = getDeliveryTimeoutMs();
  const channels: string[] = [];
  const failures: string[] = [];
  const deliveryTasks: Array<{
    channel: string;
    deliver: () => Promise<void>;
  }> = [];

  if (!hasResendConfiguration && !webhookUrl) {
    throw new LeadDeliveryNotConfiguredError();
  }

  if (hasResendConfiguration) {
    if (!apiKey || !notificationEmail || !fromEmail) {
      failures.push("Resend lead delivery configuration is incomplete.");
    } else {
      deliveryTasks.push({
        channel: "resend",
        deliver: async () => {
          const resend = new Resend(apiKey);
          const idempotencyKey = buildIdempotencyKey(
            formType,
            replyTo,
            payload,
          );
          const { error } = await runWithTimeout(
            (signal) =>
              resend.emails.send(
                {
                  from: fromEmail,
                  to: [notificationEmail],
                  replyTo,
                  subject,
                  text: buildLeadEmailText(formType, payload),
                },
                {
                  idempotencyKey,
                  signal,
                } as Parameters<typeof resend.emails.send>[1],
              ),
            timeoutMs,
          );

          if (error) {
            throw new Error(error.message);
          }
        },
      });
    }
  }

  if (webhookUrl) {
    deliveryTasks.push({
      channel: "webhook",
      deliver: async () => {
        const response = await runWithTimeout(
          (signal) =>
            fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, formType }),
              signal,
            }),
          timeoutMs,
        );

        if (!response.ok) {
          throw new Error(`failed with status ${response.status}`);
        }
      },
    });
  }

  const results = await Promise.all(
    deliveryTasks.map(async ({ channel, deliver }) => {
      try {
        await deliver();
        return { channel, error: null };
      } catch (error) {
        return {
          channel,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
  );

  for (const result of results) {
    if (result.error) {
      failures.push(`${result.channel} delivery failed: ${result.error}`);
    } else {
      channels.push(result.channel);
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
