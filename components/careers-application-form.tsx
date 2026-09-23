"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const fieldClassName =
  "h-12 rounded-none border-[var(--sp-rule)] bg-white px-4 text-[var(--sp-ink)] shadow-none focus-visible:border-[var(--sp-forest)] focus-visible:ring-[var(--sp-forest)]/15";
const selectClassName =
  "h-12 w-full rounded-none border border-[var(--sp-rule)] bg-white px-4 text-sm text-[var(--sp-ink)] outline-none transition focus:border-[var(--sp-forest)] focus:ring-3 focus:ring-[var(--sp-forest)]/15";

function FieldLabel({
  children,
  htmlFor,
  required = false,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[var(--sp-forest)]/82"
    >
      {children}
      {required && <span className="ml-1 text-[var(--sp-green-dark)]">*</span>}
    </label>
  );
}

export default function CareersApplicationForm() {
  const submissionIdRef = useRef<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [resumeName, setResumeName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const resume = formData.get("resume");

    setSubmissionError("");
    setSubmissionSuccess(false);

    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_RESUME_SIZE) {
        setSubmissionError("Your resume must be 5 MB or smaller.");
        return;
      }

      if (!ALLOWED_RESUME_TYPES.has(resume.type)) {
        setSubmissionError("Please upload your resume as a PDF, DOC, or DOCX.");
        return;
      }
    }

    setIsSubmitting(true);
    const submissionId =
      submissionIdRef.current ?? window.crypto.randomUUID();
    submissionIdRef.current = submissionId;
    formData.set("submissionId", submissionId);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Application delivery failed.");
      }

      form.reset();
      submissionIdRef.current = null;
      setResumeName("");
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Career application submission error:", error);
      setSubmissionError(
        error instanceof Error && error.message
          ? error.message
          : "We couldn’t submit your application. Please try again or call (601) 746-5012.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="application"
      className="sp-grid relative bg-[var(--sp-cream)] px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 border-b border-[var(--sp-rule)] pb-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="sp-eyebrow mb-3 text-[var(--sp-green-dark)]">
              General application
            </p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.025em] text-[var(--sp-forest)] sm:text-4xl">
              Tell us where you can make an impact.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--sp-ink)]/68">
            Complete the application below. If your background aligns with a
            current or future opportunity, a member of the Southern Pallet Recycling team
            will contact you.
          </p>
        </div>

        {submissionSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="mb-8 flex items-start gap-4 border border-[var(--sp-green-dark)]/45 bg-[var(--sp-green)]/10 p-5 text-[var(--sp-forest)]"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <p className="font-bold">Application received.</p>
              <p className="mt-1 text-sm leading-6">
                Thank you for your interest in Southern Pallet Recycling. We’ll review
                your information and contact you if there is a match.
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="sp-paper-shadow border-t-4 border-[var(--sp-green)] bg-white"
        >
          <div
            className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="careers-website">Website</label>
            <Input
              id="careers-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="border-b border-[var(--sp-rule)]/60 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[var(--sp-forest)] text-sm font-bold text-white">
                01
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[var(--sp-forest)]">
                  Opportunity preferences
                </h3>
                <p className="mt-1 text-sm text-[var(--sp-sage)]">
                  Tell us what kind of work and location interest you.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <FieldLabel htmlFor="positionInterest" required>
                  Position or type of work
                </FieldLabel>
                <Input
                  id="positionInterest"
                  name="positionInterest"
                  className={fieldClassName}
                  placeholder="Production, maintenance, logistics..."
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="preferredLocation" required>
                  Preferred location
                </FieldLabel>
                <select
                  id="preferredLocation"
                  name="preferredLocation"
                  className={selectClassName}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  <option value="Poplarville, MS">Poplarville, Mississippi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-b border-[var(--sp-rule)]/60 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[var(--sp-forest)] text-sm font-bold text-white">
                02
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[var(--sp-forest)]">
                  Applicant information
                </h3>
                <p className="mt-1 text-sm text-[var(--sp-sage)]">
                  Fields marked with an asterisk are required.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <FieldLabel htmlFor="firstName" required>
                  First name
                </FieldLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  className={fieldClassName}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="lastName" required>
                  Last name
                </FieldLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  className={fieldClassName}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="email" required>
                  Email address
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClassName}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="phone" required>
                  Phone number
                </FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClassName}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel htmlFor="streetAddress" required>
                  Street address
                </FieldLabel>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  autoComplete="street-address"
                  className={fieldClassName}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="city" required>
                  City
                </FieldLabel>
                <Input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="grid grid-cols-[1fr_1.1fr] gap-4">
                <div>
                  <FieldLabel htmlFor="state" required>
                    State
                  </FieldLabel>
                  <Input
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    className={fieldClassName}
                    placeholder="AL"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="zipCode" required>
                    ZIP code
                  </FieldLabel>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[var(--sp-forest)] text-sm font-bold text-white">
                03
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[var(--sp-forest)]">
                  Availability and experience
                </h3>
                <p className="mt-1 text-sm text-[var(--sp-sage)]">
                  Add any details that help us understand your background.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <FieldLabel htmlFor="shiftAvailability">
                  Shift availability
                </FieldLabel>
                <select
                  id="shiftAvailability"
                  name="shiftAvailability"
                  className={selectClassName}
                  defaultValue=""
                >
                  <option value="">Select availability</option>
                  <option value="Day shift">Day shift</option>
                  <option value="Night shift">Night shift</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Any shift">Any shift</option>
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="startDate">
                  Earliest available start date
                </FieldLabel>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className={fieldClassName}
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel htmlFor="howHeard">
                  How did you hear about us?
                </FieldLabel>
                <Input
                  id="howHeard"
                  name="howHeard"
                  className={fieldClassName}
                  placeholder="Referral, search engine, social media..."
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel htmlFor="experience">
                  Relevant experience or qualifications
                </FieldLabel>
                <Textarea
                  id="experience"
                  name="experience"
                  rows={5}
                  className="min-h-32 rounded-none border-[var(--sp-rule)] bg-white px-4 py-3 text-[var(--sp-ink)] shadow-none focus-visible:border-[var(--sp-forest)] focus-visible:ring-[var(--sp-forest)]/15"
                  placeholder="Share work history, equipment experience, certifications, or other relevant qualifications."
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel htmlFor="resume">Resume (optional)</FieldLabel>
                <label
                  htmlFor="resume"
                  className="flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-[var(--sp-sage)]/65 bg-[var(--sp-cream)]/55 px-5 py-6 text-center transition hover:border-[var(--sp-green-dark)] hover:bg-[var(--sp-cream)]"
                >
                  <FileText className="mb-2 h-6 w-6 text-[var(--sp-green-dark)]" />
                  <span className="text-sm font-bold text-[var(--sp-forest)]">
                    {resumeName || "Choose a resume file"}
                  </span>
                  <span className="mt-1 text-xs text-[var(--sp-sage)]">
                    PDF, DOC, or DOCX · 5 MB maximum
                  </span>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="sr-only"
                    onChange={(event) =>
                      setResumeName(event.target.files?.[0]?.name || "")
                    }
                  />
                </label>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-[var(--sp-rule)]/60 pt-7">
              <label className="flex items-start gap-3 text-sm leading-6 text-[var(--sp-ink)]/78">
                <input
                  type="checkbox"
                  name="workAuthorized"
                  value="yes"
                  required
                  className="mt-1 h-4 w-4 accent-[var(--sp-green-dark)]"
                />
                <span>
                  I confirm that I am legally authorized to work in the United
                  States.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-[var(--sp-ink)]/78">
                <input
                  type="checkbox"
                  name="accuracyConfirmed"
                  value="yes"
                  required
                  className="mt-1 h-4 w-4 accent-[var(--sp-green-dark)]"
                />
                <span>
                  I certify that the information provided in this application
                  is true and complete to the best of my knowledge.
                </span>
              </label>
              <p className="text-xs leading-5 text-[var(--sp-sage)]">
                Southern Pallet Recycling is an equal opportunity employer. Submission of
                this form does not guarantee employment.
              </p>
            </div>

            {submissionError && (
              <div
                role="alert"
                aria-live="polite"
                className="mt-7 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
              >
                {submissionError}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 border-t border-[var(--sp-rule)]/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs leading-5 text-[var(--sp-sage)]">
                Your application will be reviewed only for employment-related
                purposes.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-none bg-[var(--sp-forest)] px-8 font-bold text-white hover:bg-[var(--sp-green-dark)] disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Submitting
                  </>
                ) : (
                  <>
                    Submit application
                    <Send />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
