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
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildThankYouUrl } from "@/lib/form-redirect";
import { trackLeadGeneration } from "@/lib/analytics";

export default function RecycleCTASection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    palletType: "",
    quantity: "",
    condition: "",
    location: "",
    additionalDetails: "",
    pickupService: "",
    smsConsent: false,
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
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
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      // Get UTM parameters from URL for thank you page redirect
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

      // Prepare data for API submission
      const submissionId =
        submissionIdRef.current ?? window.crypto.randomUUID();
      submissionIdRef.current = submissionId;
      const submissionData = {
        ...formData,
        submissionId,
        timestamp: new Date().toISOString(),
        source: "website_recycle_pallet",
        utmParams: utmParams,
        pageUrl: window.location.href,
        smsConsent: formData.smsConsent,
      };

      // ========================================
      // BACKEND DEVELOPERS: ACTUAL API CALL
      // ========================================
      //
      // This now calls the API endpoint you need to implement.
      // The API endpoint at /api/recycle handles all data processing options.
      // See app/api/recycle/route.ts for implementation details.

      const response = await fetch("/api/recycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Recycle form submitted successfully:", result);

      trackLeadGeneration({
        formName: "Pallet Recycling Form",
        formType: "recycle_request",
        submissionId: submissionData.submissionId,
      });

      router.push(buildThankYouUrl("recycle_request", utmParams));
    } catch (error) {
      console.error("❌ Recycle form submission error:", error);
      setSubmissionError(
        "There was an error submitting your request. Please try again or call us at (601) 746-5012."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sell-pallets" className="relative overflow-hidden bg-[var(--sp-forest)] py-24 text-white lg:py-32">
      <div className="sp-diagonal absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 border-b border-white/20 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="sp-eyebrow text-[var(--sp-green)]">Inventory evaluation</p>
            <h2 className="sp-display mt-5 text-4xl sm:text-5xl">Sell your used pallets.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/68 lg:justify-self-end">
            Fill out the form below and we&apos;ll contact you with a
            competitive quote for your pallets. We buy standard and box pallets
            after reviewing the type, condition, quantity, and location.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="border border-white/15 bg-[var(--sp-paper)] p-6 text-[var(--sp-ink)] sm:p-10">
            <p className="sp-eyebrow text-[var(--sp-green-dark)]">Tell us what you have</p>
            <h3 className="mt-3 text-3xl font-semibold text-[var(--sp-forest)]">
              Get a pallet quote
            </h3>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="recycle-website">Website</label>
                <Input
                  id="recycle-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    placeholder="Your name"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <Input
                    placeholder="Your company"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="rounded-none border-[var(--sp-rule)] bg-white"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              <div className="border-t border-[var(--sp-rule)] pt-6">
                <h4 className="mb-4 text-lg font-semibold text-[var(--sp-forest)]">Pallet information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pallet Type
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, palletType: value })
                      }
                    >
                      <SelectTrigger className="w-full rounded-none border-[var(--sp-rule)] bg-white">
                        <SelectValue placeholder="Select pallet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          Standard GMA Pallets (48x40)
                        </SelectItem>
                        <SelectItem value="box">Box Pallets</SelectItem>
                        <SelectItem value="custom">Custom Pallets</SelectItem>
                        <SelectItem value="mixed">Mixed Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity (Approximate)
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, quantity: value })
                      }
                    >
                      <SelectTrigger className="w-full rounded-none border-[var(--sp-rule)] bg-white">
                        <SelectValue placeholder="Select quantity range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 pallets</SelectItem>
                        <SelectItem value="11-50">11-50 pallets</SelectItem>
                        <SelectItem value="51-100">51-100 pallets</SelectItem>
                        <SelectItem value="100+">100+ pallets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Condition
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, condition: value })
                      }
                    >
                      <SelectTrigger className="w-full rounded-none border-[var(--sp-rule)] bg-white">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="mixed">Mixed Condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <Input
                      placeholder="City, State"
                      className="rounded-none border-[var(--sp-rule)] bg-white"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Details
                </label>
                <Textarea
                  placeholder="Any additional information about your pallets"
                  rows={4}
                  className="rounded-none border-[var(--sp-rule)] bg-white"
                  value={formData.additionalDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalDetails: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Do you need pickup service?
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, pickupService: value })
                  }
                >
                  <SelectTrigger className="w-full rounded-none border-[var(--sp-rule)] bg-white">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">
                      Yes, I need pickup service
                    </SelectItem>
                    <SelectItem value="no">No, I can deliver</SelectItem>
                    <SelectItem value="discuss">
                      Let&apos;s discuss options
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="smsConsent"
                  name="smsConsent"
                  className="mt-1"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, smsConsent: e.target.checked })
                  }
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
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
