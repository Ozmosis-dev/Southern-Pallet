"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildThankYouUrl } from "@/lib/form-redirect";
import { trackLeadGeneration } from "@/lib/analytics";

export default function ContactSection() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>("");
  const submissionIdRef = useRef<string | null>(null);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, "");

    // Limit to 10 digits
    const limitedPhoneNumber = phoneNumber.slice(0, 10);

    // Format based on length
    if (limitedPhoneNumber.length < 4) {
      return limitedPhoneNumber;
    } else if (limitedPhoneNumber.length < 7) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(
        3
      )}`;
    } else {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(
        3,
        6
      )}-${limitedPhoneNumber.slice(6)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_term: urlParams.get("utm_term") || "",
        utm_content: urlParams.get("utm_content") || "",
        utm_creative: urlParams.get("utm_creative") || "",
        utm_adgroup: urlParams.get("utm_adgroup") || "",
        utm_location: urlParams.get("utm_location") || "",
      };

      // Get form data
      const formData = new FormData(e.currentTarget);
      const submissionId =
        submissionIdRef.current ?? window.crypto.randomUUID();
      submissionIdRef.current = submissionId;
      const data = {
        name: formData.get("name") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        website: formData.get("website") as string,
        phone: phoneNumber,
        productInterest: formData.get("productInterest") as string,
        message: formData.get("message") as string,
        smsConsent: formData.get("smsConsent") === "on",
        submissionId,
        timestamp: new Date().toISOString(),
        source: "website_new_contact_form",
        utmParams: utmParams,
        pageUrl: window.location.href,
      };

      // ========================================
      // BACKEND DEVELOPERS: ACTUAL API CALL
      // ========================================
      //
      // This now calls the API endpoint you need to implement.
      // The API endpoint at /api/contact handles all data processing options.
      // See app/api/contact/route.ts for implementation details.

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Contact form submitted successfully:", result);

      trackLeadGeneration({
        formName: "Main Contact Form",
        formType: "quote_request",
        submissionId: data.submissionId,
      });

      router.push(buildThankYouUrl("quote_request", utmParams));
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionError(
        "We couldn’t submit your request. Please try again or call us at (601) 746-5012."
      );
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--sp-forest)] py-24 text-white lg:py-32">
      <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green)]">Quote desk</p>
            <h2 className="sp-display mt-5 text-5xl sm:text-6xl">
              Need pallets now?
            </h2>
            <p className="mt-7 max-w-md text-lg leading-8 text-white/70">
              Most quotes returned in under 1 hour. Deliveries will be made the
              following day, within 24hrs. That&apos;s the Southern Pallet Recycling
              difference.
            </p>

            <div className="mt-12 border-t border-white/25">
              <div className="flex items-center gap-4 border-b border-white/25 py-5">
                <Phone className="size-5 text-[var(--sp-green)]" />
                <div>
                  <div className="text-sm font-bold">
                    Call direct · (601) 746-5012
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-white/25 py-5">
                <Mail className="size-5 text-[var(--sp-green)]" />
                <div>
                  <div className="text-sm font-bold">
                    Email · info@southernpallet.co
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-white/25 py-5">
                <MapPin className="mt-1 size-5 text-[var(--sp-green)]" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.1em]">Primary facility</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    119 Industrial Park Dr
                    <br />
                    Poplarville, MS 39470
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-white/25 py-5">
                <Clock className="mt-1 size-5 text-[var(--sp-green)]" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.1em]">Business hours</div>
                  <div className="mt-2 text-sm text-white/65">
                    Monday - Friday: 7:00 AM - 4:00 PM (CST)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/20 bg-[var(--sp-paper)] p-6 text-[var(--sp-ink)] sm:p-10">
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Tell us what you need</p>
            <h3 className="sp-display mt-3 text-3xl text-[var(--sp-forest)]">
              Request a quote
            </h3>

            <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
              <div
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="contact-website">Website</label>
                <Input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    name="company"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <Input
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber || ""}
                    onChange={handlePhoneChange}
                    maxLength={14}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Interest
                </label>
                <Select name="productInterest">
                  <SelectTrigger className="w-full rounded-none border-[var(--sp-rule)] bg-white">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Pallets</SelectItem>
                    <SelectItem value="custom">Custom Pallets</SelectItem>
                    <SelectItem value="recycled">Recycled Pallets</SelectItem>
                    <SelectItem value="repair">Pallet Repair</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  className="rounded-none border-[var(--sp-rule)] bg-white"
                  placeholder="Tell us about your pallet needs"
                  rows={4}
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="smsConsent"
                  name="smsConsent"
                  className="mt-1"
                  required
                />
                <label htmlFor="smsConsent" className="text-xs text-gray-600">
                  I consent to receive transactional messages about my requests.
                  Message & data rates may apply. Reply STOP to opt-out.
                </label>
              </div>

              <p className="text-[10px] text-gray-500 mt-2">
                By submitting, you agree to our{" "}
                <button
                  type="button"
                  className="underline hover:text-gray-700"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-legal-modal", { detail: "privacy" })
                    );
                  }}
                >
                  Privacy Policy
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="underline hover:text-gray-700"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-legal-modal", { detail: "terms" })
                    );
                  }}
                >
                  Terms of Service
                </button>
                .
              </p>

              {submissionError && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  {submissionError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 w-full rounded-none bg-[var(--sp-green)] font-bold uppercase tracking-[0.08em] text-[var(--sp-forest-deep)] hover:bg-[var(--sp-forest)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
