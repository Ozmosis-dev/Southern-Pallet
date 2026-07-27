"use client";

import { Mail, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SharedFooterProps {
  isPrivatePage?: boolean;
}

export default function SharedFooter({
  isPrivatePage = false,
}: SharedFooterProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Open modal if URL contains #privacy or #terms (on load and hash changes)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash === "#privacy" || hash === "#terms") {
        setActiveModal(hash.replace("#", ""));
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Allow other components to request opening legal modal without hash
  useEffect(() => {
    const handleOpenLegal = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const which = customEvent.detail;
      if (which === "privacy" || which === "terms") {
        setActiveModal(which);
      }
    };
    window.addEventListener(
      "open-legal-modal",
      handleOpenLegal as EventListener
    );
    return () => {
      window.removeEventListener(
        "open-legal-modal",
        handleOpenLegal as EventListener
      );
    };
  }, []);
  return (
    <footer className={isPrivatePage ? "bg-[#1e4a2b] py-6 text-white" : "border-t-4 border-[#22c55e] bg-[#102c1b] text-white"}>
      <div className={isPrivatePage ? "mx-auto max-w-full px-8 lg:px-12 xl:px-16" : "mx-auto max-w-7xl px-6 pb-6 pt-16 sm:px-8 lg:pt-20"}>
        <div className={isPrivatePage ? "mb-4 grid grid-cols-1 gap-8 border-t border-gray-600 pt-6 md:grid-cols-2 lg:ml-32 lg:grid-cols-6 xl:ml-40" : "grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-12"}>
          <div className={isPrivatePage ? "lg:col-span-2" : "lg:col-span-4"}>
            <Image
              src="/logo.svg"
              alt="Southern Pallet Recycling"
              width={isPrivatePage ? 48 : 190}
              height={48}
              className={isPrivatePage ? "h-10 w-auto lg:h-12" : "h-12 w-auto"}
            />
            <p className={isPrivatePage ? "mb-6 mt-6 max-w-md text-gray-300" : "mt-7 max-w-sm text-sm leading-7 text-white/65"}>
              {isPrivatePage
                ? "Providing quality new and recycled wooden pallets throughout the southeastern United States since 2025."
                : "Quality new and recycled wooden pallets, responsive service, and dependable delivery throughout the southeastern United States."}
            </p>
            {!isPrivatePage && <Link
              href="/careers"
              className="mt-8 inline-flex border-b border-[#22c55e] pb-1 text-xs font-extrabold uppercase tracking-[0.2em] text-white hover:text-[#7ee29a]"
            >
              Careers at Southern Pallet
            </Link>}
          </div>

          <div className={isPrivatePage ? "" : "lg:col-span-2"}>
            <p className={isPrivatePage ? "mb-4 text-lg font-bold text-[#22c55e]" : "mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-[#7ee29a]"}>
              Products
            </p>
            <div className={isPrivatePage ? "flex flex-col gap-2 text-gray-300" : "flex flex-col gap-3 text-sm text-white/65"}>
              <span>Standard pallets</span>
              <span>Custom pallets</span>
              <span>Recycled pallets</span>
              <span>Heat-treated pallets</span>
              <span>Specialty products</span>
            </div>
          </div>

          <div className={isPrivatePage ? "" : "lg:col-span-2"}>
            <p className={isPrivatePage ? "mb-4 text-lg font-bold text-[#22c55e]" : "mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-[#7ee29a]"}>
              Services
            </p>
            <div className={isPrivatePage ? "flex flex-col gap-2 text-gray-300" : "flex flex-col gap-3 text-sm text-white/65"}>
              <span>Pallet manufacturing</span>
              {isPrivatePage ? (
                <span>Pallet recycling</span>
              ) : (
                <Link href="/recycle-pallets" className="hover:text-white">
                  Pallet recycling
                </Link>
              )}
              <span>Pallet repair</span>
              {isPrivatePage ? (
                <>
                  <span>Local delivery</span>
                  <span>Custom solutions</span>
                </>
              ) : (
                <>
                  <Link href="/#delivery" className="hover:text-white">
                    Regional delivery
                  </Link>
                  <Link href="/blog" className="hover:text-white">
                    Resource library
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className={isPrivatePage ? "lg:col-span-2" : "grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1"}>
            <div>
              <p className={isPrivatePage ? "mb-4 text-lg font-bold text-[#22c55e]" : "mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-[#7ee29a]"}>
                {isPrivatePage ? "Contact Us" : "Facilities"}
              </p>
              <div className={isPrivatePage ? "space-y-6 text-gray-300" : "grid gap-5 text-sm leading-6 text-white/65 sm:grid-cols-2 lg:grid-cols-1"}>
                <address className="not-italic">
                  <strong className="mb-2 block font-semibold text-white">
                    {isPrivatePage ? "Corporate Office:" : "Corporate office"}
                  </strong>
                  5695 Rabbit Creek Dr Ste 101
                  <br />
                  Theodore, AL 36582
                </address>
                <address className="not-italic">
                  <strong className="mb-2 block font-semibold text-white">
                    {isPrivatePage ? "Manufacturing Facility:" : "Manufacturing facility"}
                  </strong>
                  119 Industrial Park Dr
                  <br />
                  Poplarville, MS 39470
                </address>
              </div>
            </div>

            <div className={isPrivatePage ? "mt-6 flex flex-col gap-3" : "flex flex-col gap-3 text-sm"}>
              <a
                href="tel:+16017465012"
                className={isPrivatePage ? "flex items-center text-gray-300 hover:text-[#22c55e]" : "flex items-center gap-3 text-white/70 hover:text-white"}
              >
                <Phone className={isPrivatePage ? "mr-2 h-4 w-4 text-[#22c55e]" : "h-4 w-4 text-[#22c55e]"} />
                <span>(601) 746-5012</span>
              </a>
              <a
                href="mailto:info@southernpallet.co"
                className={isPrivatePage ? "flex items-center text-gray-300 hover:text-[#22c55e]" : "flex items-center gap-3 text-white/70 hover:text-white"}
              >
                <Mail className={isPrivatePage ? "mr-2 h-4 w-4 text-[#22c55e]" : "h-4 w-4 text-[#22c55e]"} />
                <span>info@southernpallet.co</span>
              </a>
            </div>
          </div>
        </div>

        <div className={isPrivatePage ? "flex flex-col items-center justify-between border-t border-gray-600 pt-3 text-sm text-gray-400 md:flex-row" : "flex flex-col gap-4 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"}>
          <p>© 2025 Southern Pallet Company. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() => openModal("privacy")}
              className="hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openModal("terms")}
              className="hover:text-white"
            >
              Terms of Service
            </button>
          </div>
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Background blur overlay */}
            <div
              className={
                isPrivatePage
                  ? "absolute inset-0 bg-black/50 backdrop-blur-sm"
                  : "absolute inset-0 bg-[#071a0e]/78 backdrop-blur-sm"
              }
              onClick={closeModal}
            ></div>

            {/* Modal content */}
            <div
              className={
                isPrivatePage
                  ? "relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl"
                  : "relative max-h-[82vh] w-full max-w-2xl overflow-hidden border-t-4 border-[#22c55e] bg-[#fffef9] shadow-[0_30px_100px_rgba(3,18,9,0.35)]"
              }
            >
              {/* Header */}
              <div className={isPrivatePage ? "flex items-center justify-between border-b border-gray-200 p-6" : "flex items-center justify-between border-b border-[#bdc8bd] p-6"}>
                <h2 className={isPrivatePage ? "text-2xl font-bold text-gray-900" : "text-4xl font-extrabold leading-none text-[#183523]"}>
                  {activeModal === "privacy"
                    ? "Privacy Policy"
                    : "Terms of Service"}
                </h2>
                <button
                  onClick={closeModal}
                  className={
                    isPrivatePage
                      ? "text-gray-400 transition-colors hover:text-gray-600"
                      : "border border-[#bdc8bd] p-2 text-[#647168] hover:border-[#168344] hover:text-[#183523]"
                  }
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className={isPrivatePage ? "max-h-[60vh] overflow-y-auto p-6" : "max-h-[62vh] overflow-y-auto p-6 sm:p-8"}>
                <div className={isPrivatePage ? "text-gray-700" : "text-sm leading-7 text-[#45554a]"}>
                  {activeModal === "privacy" ? (
                    <div className="space-y-4">
                      <p>
                        Your privacy is important to us at Southern Pallet
                        Company (&quot;Company,&quot; &quot;we,&quot;
                        &quot;our,&quot; or &quot;us&quot;). This Privacy Policy
                        explains how we collect, use, disclose, and safeguard
                        your data when you visit southernpallet.co (the
                        &quot;Site&quot;). By accessing or using the Site, you
                        agree to the terms in this Privacy Policy. If you do not
                        agree, please discontinue use of the Site.
                      </p>

                      <p>
                        We collect personal information that you provide
                        directly to us, such as your name, email address, phone
                        number, and mailing address, when you interact with
                        forms, place orders, or contact us. Additionally, our
                        systems automatically collect non-personal information,
                        including your IP address, browser type, operating
                        system, and browsing behavior. This data helps us
                        analyze usage trends and improve services.
                      </p>

                      <p>
                        The Site uses cookies and similar technologies to
                        enhance user experience. We also utilize Microsoft
                        Clarity to analyze user behavior on the Site. Microsoft
                        Clarity records interactions such as clicks, scrolling,
                        and navigation paths. For details, please review{" "}
                        <a
                          href="https://privacy.microsoft.com/en-us/privacystatement"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#002947] hover:underline"
                        >
                          Microsoft Clarity Privacy Policy
                        </a>
                        .
                      </p>

                      <p>
                        We use collected data to operate and enhance the Site,
                        process transactions, provide customer support, and
                        comply with legal obligations. The data may be shared
                        with trusted third-party providers for hosting,
                        analytics, and marketing, but we do not sell or rent
                        personal information.
                      </p>

                      <p>
                        We implement robust security measures to protect your
                        information. However, no system is entirely secure, and
                        we cannot guarantee absolute security. If you suspect a
                        data breach, contact us immediately at{" "}
                        <a
                          href="mailto:info@southernpallet.co"
                          className="text-[#002947] hover:underline"
                        >
                          info@southernpallet.co
                        </a>
                        .
                      </p>

                      <p>
                        This Privacy Policy may be updated periodically. Changes
                        will take effect when posted, and the &quot;Last
                        Updated&quot; date will reflect the latest changes. For
                        questions about this Privacy Policy, contact us at{" "}
                        <a
                          href="mailto:info@southernpallet.co"
                          className="text-[#002947] hover:underline"
                        >
                          info@southernpallet.co
                        </a>
                        .
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p>
                        Welcome to Southern Pallet Company (&quot;Company,&quot;
                        &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                        These Terms of Service (&quot;Terms&quot;) govern your
                        access to and use of our website at southernpallet.co
                        (the &quot;Site&quot;). By using the Site, you agree to
                        these Terms. If you do not agree, discontinue use
                        immediately.
                      </p>

                      <p>
                        The Site is intended for users aged 18 or older or those
                        with parental consent. You agree to use the Site for
                        lawful purposes and in compliance with all applicable
                        laws. Prohibited activities include unauthorized access,
                        disrupting the Site, or violating intellectual property
                        rights.
                      </p>

                      <p>
                        The content on the Site, including text, images, and
                        software, is owned by Southern Pallet Company or
                        licensed to us. You may not copy, distribute, or modify
                        content without prior written consent. Unauthorized use
                        of content may result in legal action.
                      </p>

                      <p>
                        To access certain features, you may need to create an
                        account. You are responsible for maintaining the
                        confidentiality of your account information. Notify us
                        immediately at{" "}
                        <a
                          href="mailto:info@southernpallet.co"
                          className="text-[#002947] hover:underline"
                        >
                          info@southernpallet.co
                        </a>{" "}
                        if you suspect unauthorized use of your account.
                      </p>

                      <p>
                        All purchases made through the Site are subject to the
                        refund and cancellation policies. By completing a
                        purchase, you agree to these policies.
                      </p>

                      <p>
                        The Site is provided &quot;as is&quot; without
                        warranties of any kind. Southern Pallet Company
                        disclaims all liability for damages arising from your
                        use of the Site, including loss of data, revenue, or
                        opportunities.
                      </p>

                      <p>
                        These Terms are governed by the laws of Alabama, United
                        States. Any disputes will be resolved in the courts of
                        Alabama. By using the Site, you consent to this
                        jurisdiction.
                      </p>

                      <p>
                        We reserve the right to update these Terms at any time.
                        Changes will take effect upon posting, and the
                        &quot;Last Updated&quot; date will reflect
                        modifications. Continued use of the Site constitutes
                        acceptance of revised Terms.
                      </p>

                      <p>
                        For questions about these Terms, please contact us at{" "}
                        <a
                          href="mailto:info@southernpallet.co"
                          className="text-[#002947] hover:underline"
                        >
                          info@southernpallet.co
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="bg-[#002947] text-white px-6 py-2 rounded hover:bg-[#003a5f] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
