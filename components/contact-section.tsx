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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactSection() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      const data = {
        name: formData.get("name") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        phone: phoneNumber,
        productInterest: formData.get("productInterest") as string,
        message: formData.get("message") as string,
        smsConsent: formData.get("smsConsent") === "on",
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

      // GTM Conversion Tracking Event
      if (typeof window !== "undefined") {
        const gtmWindow = window as typeof window & {
          dataLayer?: Array<Record<string, string | number>>;
        };
        if (gtmWindow.dataLayer) {
          gtmWindow.dataLayer.push({
            event: "quote_request_completed",
            event_category: "Contact",
            event_action: "Quote Request",
            event_label: "Main Contact Form",
            quote_type: data.productInterest || "",
            company: data.company || "",
            conversion_value: 100,
            currency: "USD",
          });
        }
      }

      // Build UTM parameters for tracking
      const redirectUrlParams = new URLSearchParams();

      // Add form data
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== "object" && value) {
          redirectUrlParams.append(key, value.toString());
        }
      });

      // Add UTM parameters
      Object.entries(utmParams).forEach(([key, value]) => {
        redirectUrlParams.append(key, value);
      });

      redirectUrlParams.append("form_type", "quote_request");
      redirectUrlParams.append("conversion", "true");

      // Redirect to thank you page with UTM parameters
      router.push(`/thank-you?${redirectUrlParams.toString()}`);
    } catch (error) {
      console.error("Form submission error:", error);
      // TODO: Add proper error handling/display
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-[#1e4a2b] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Need Pallets Now?</h2>
            <h3 className="text-2xl mb-8">Let&apos;s talk!</h3>
            <p className="text-gray-200 text-lg mb-12">
              Most quotes returned in under 1 hour. Deliveries will be made the
              following day, within 24hrs. That&apos;s the Southern Pallet
              difference.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4" />
                <div>
                  <div className="font-semibold">
                    Call Direct : (601) 746-5012
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4" />
                <div>
                  <div className="font-semibold">
                    Email : info@southernpallet.co
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <div className="font-semibold mb-2">Headquarters :</div>
                  <div className="text-gray-200">
                    5695 Rabbit Creek Dr Ste 101
                    <br />
                    Theodore, AL 36582
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <div className="font-semibold mb-2">Business Hours :</div>
                  <div className="text-gray-200">
                    Monday - Friday: 7:00 AM - 4:00 PM (CST)
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-black p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Request A Quote
            </h3>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    className="border border-gray-500"
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
                    className="border border-gray-500"
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
                    className="border border-gray-500"
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
                    className="border border-gray-500"
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
                  <SelectTrigger className="border border-gray-500 w-full">
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
                  className="border border-gray-500"
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
