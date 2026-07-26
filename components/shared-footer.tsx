"use client";

import { Mail, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SharedFooter() {
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
    <footer className="bg-[#1e4a2b] text-white py-6">
      <div className="max-w-full mx-auto px-8 lg:px-12 xl:px-16">
        <div className="border-b border-gray-600 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-4 lg:ml-32 xl:ml-40">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            {/* Mobile layout - logo top, description bottom */}
            <div className="flex flex-col mb-6 lg:hidden">
              <Image
                src="/logo.svg"
                alt="Southern Pallet Recycling"
                width={40}
                height={40}
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-300 text-sm">
                Providing quality new and recycled wooden pallets throughout the
                southeastern United States since 2025.
              </p>
            </div>

            {/* Desktop layout - logo and description */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/logo.svg"
                  alt="Southern Pallet Recycling"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Providing quality new and recycled wooden pallets throughout the
                southeastern United States since 2025.
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[#22c55e] font-bold text-lg mb-4">Products</h3>
            <div className="flex flex-col gap-2">
              <span className="text-gray-300 select-none">
                Standard Pallets
              </span>
              <span className="text-gray-300 select-none">Custom Pallets</span>
              <span className="text-gray-300 select-none">
                Recycled Pallets
              </span>
              <span className="text-gray-300 select-none">
                Heat-Treated Pallets
              </span>
              <span className="text-gray-300 select-none">
                Specialty Products
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#22c55e] font-bold text-lg mb-4">Services</h3>
            <div className="flex flex-col gap-2">
              <span className="text-gray-300 select-none">
                Pallet Manufacturing
              </span>
              <span className="text-gray-300 select-none">
                Pallet Recycling
              </span>
              <span className="text-gray-300 select-none">Pallet Repair</span>
              <span className="text-gray-300 select-none">Local Delivery</span>
              <span className="text-gray-300 select-none">
                Custom Solutions
              </span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2">
            <h3 className="text-[#22c55e] font-bold text-lg mb-4">
              Contact Us
            </h3>

            {/* Corporate Office */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-2">
                Corporate Office:
              </h4>
              <div className="text-gray-300">
                <div>5695 Rabbit Creek Dr Ste 101</div>
                <div>Theodore, AL 36582</div>
              </div>
            </div>

            {/* Manufacturing Facility */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-2">
                Manufacturing Facility:
              </h4>
              <div className="text-gray-300">
                <div>119 Industrial Park Dr</div>
                <div>Poplarville, MS 39470</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+16017465012"
                className="flex items-center text-gray-300 hover:text-[#22c55e] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#22c55e] mr-2" />
                <span>(601) 746-5012</span>
              </a>
              <a
                href="mailto:info@southernpallet.co"
                className="flex items-center text-gray-300 hover:text-[#22c55e] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#22c55e] mr-2" />
                <span>info@southernpallet.co</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-600 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2025 Southern Pallet Company. All rights reserved.
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => openModal("privacy")}
                className="text-gray-400 text-sm select-none"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal("terms")}
                className="text-gray-400 text-sm select-none"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background blur overlay */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeModal === "privacy"
                    ? "Privacy Policy"
                    : "Terms of Service"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="text-gray-700">
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
