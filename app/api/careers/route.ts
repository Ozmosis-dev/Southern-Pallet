import { NextRequest, NextResponse } from "next/server";
import {
  deliverLead,
  LeadDeliveryFailedError,
  LeadDeliveryNotConfiguredError,
} from "../../../lib/lead-delivery";

export const runtime = "nodejs";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const requiredTextFields = [
  "positionInterest",
  "preferredLocation",
  "firstName",
  "lastName",
  "email",
  "phone",
  "streetAddress",
  "city",
  "state",
  "zipCode",
] as const;

function getText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function safeFilename(filename: string): string {
  return (
    filename.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120) || "resume"
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fields = Object.fromEntries(
      [
        ...requiredTextFields,
        "shiftAvailability",
        "startDate",
        "howHeard",
        "experience",
        "submissionId",
      ].map((field) => [field, getText(formData, field)]),
    );

    if (requiredTextFields.some((field) => !fields[field])) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required applicant fields.",
        },
        { status: 400 },
      );
    }

    if (
      getText(formData, "workAuthorized") !== "yes" ||
      getText(formData, "accuracyConfirmed") !== "yes"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required acknowledgements must be accepted.",
        },
        { status: 400 },
      );
    }

    if (getText(formData, "website")) {
      return NextResponse.json({
        success: true,
        message: "Application received successfully.",
      });
    }

    const resumeValue = formData.get("resume");
    const resume =
      resumeValue instanceof File && resumeValue.size > 0 ? resumeValue : null;

    if (resume && resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume files must be 5 MB or smaller.",
        },
        { status: 413 },
      );
    }

    if (resume && !ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume files must be PDF, DOC, or DOCX.",
        },
        { status: 415 },
      );
    }

    const careersNotificationEmail =
      process.env.CAREERS_NOTIFICATION_EMAIL?.trim();

    if (!careersNotificationEmail) {
      throw new LeadDeliveryNotConfiguredError();
    }

    const attachments = resume
      ? [
          {
            filename: safeFilename(resume.name),
            content: Buffer.from(await resume.arrayBuffer()).toString("base64"),
            contentType: resume.type,
          },
        ]
      : undefined;

    const delivery = await deliverLead({
      formType: "career_application",
      subject: `New employment application: ${fields.firstName} ${fields.lastName}`,
      replyTo: fields.email,
      notificationEmail: careersNotificationEmail,
      allowWebhook: false,
      attachments,
      payload: {
        ...fields,
        workAuthorized: "Confirmed",
        accuracyConfirmed: "Confirmed",
        resumeFileName: resume ? safeFilename(resume.name) : "Not provided",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application received successfully.",
      deliveryChannels: delivery.channels,
    });
  } catch (error) {
    console.error("Career application submission error:", error);

    if (error instanceof LeadDeliveryNotConfiguredError) {
      return NextResponse.json(
        {
          success: false,
          message: "Career application delivery is not configured.",
        },
        { status: 503 },
      );
    }

    if (error instanceof LeadDeliveryFailedError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to deliver employment application.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process employment application.",
      },
      { status: 500 },
    );
  }
}
