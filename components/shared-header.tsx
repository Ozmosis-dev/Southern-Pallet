"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/site-config";

interface SharedHeaderProps {
  isRecyclePage?: boolean;
  isPrivatePage?: boolean;
}

export default function SharedHeader({
  isPrivatePage = false,
}: SharedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sectionHref = (section: string) => pathname === "/" ? `#${section}` : `/#${section}`;
  const links = [
    { label: "Products", href: isPrivatePage ? sectionHref("products") : "/pallet-supply" },
    { label: "Services", href: isPrivatePage ? sectionHref("services") : "/pallet-services" },
    { label: "Recycle Pallets", href: "/recycle-pallets" },
    { label: "Poplarville", href: "/locations/poplarville-ms" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "About Us", href: sectionHref("about") },
    { label: "Delivery", href: sectionHref("delivery") },
    { label: "Contact", href: "/contact" },
  ];
  const isActive = (href: string) => pathname === href ||
    (["/blog", "/pallet-supply"].includes(href) && pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!isMenuOpen) return;

    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
      }
      if (event.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
      if (trigger?.isConnected) trigger.focus();
    };
  }, [isMenuOpen]);

  const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7ee29a]";
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/15 text-white ${
        isPrivatePage ? "bg-[#1e4a2b]" : "bg-[#173b24]/96 shadow-[0_8px_30px_rgba(8,30,17,0.12)] backdrop-blur-md"
      }`}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-7">
          <Link href="/" aria-label="Southern Pallet Recycling home" className={`shrink-0 ${focusClass}`}>
            <Image src="/logo.svg" alt="Southern Pallet Recycling" width={168} height={42} className="h-10 w-auto" />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 xl:flex">
            {links.map(({ label, href }) => (
              <Link key={label} href={href} aria-current={isActive(href) ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-sm font-semibold transition-colors after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:bg-[#7ee29a] ${focusClass} ${
                  isActive(href) ? "text-white after:scale-x-100" : "text-white/90 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <a href={`tel:${CONTACT.phone}`} aria-label={`Call Southern Pallet Recycling at ${CONTACT.phoneDisplay}`}
              className={`hidden min-h-11 items-center gap-2 border border-white/40 px-3 text-sm font-semibold hover:bg-white hover:text-[#102c1b] min-[1440px]:inline-flex ${focusClass}`}>
              <Phone className="size-4" aria-hidden="true" />{CONTACT.phoneDisplay}
            </a>
            <Link href="/contact" className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap bg-[#22c55e] px-5 text-sm font-bold text-[#102c1b] hover:bg-[#7ee29a] ${focusClass}`}>Get a quote</Link>
          </div>

          <button ref={menuButtonRef} type="button" onClick={() => setIsMenuOpen(true)}
            className={`inline-flex min-h-11 items-center justify-center gap-2 border border-white/40 px-3 text-sm font-semibold hover:bg-white/10 xl:hidden ${focusClass}`}
            aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-controls={isMenuOpen ? "mobile-navigation" : undefined}>
            <Menu className="size-5" aria-hidden="true" />Menu
          </button>
        </div>
      </header>

      {isMenuOpen && createPortal(
        <div className="fixed inset-0 z-[80] text-white xl:hidden" style={{ fontFamily: "var(--font-public-body), sans-serif" }}>
          <div className="absolute inset-0 bg-[#071a0e]/75" onClick={closeMenu} aria-hidden="true" />
          <div id="mobile-navigation" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title"
            className="absolute inset-y-0 right-0 flex h-dvh w-[min(24rem,100vw)] flex-col border-l border-white/20 bg-[#102c1b] shadow-[-24px_0_70px_rgba(3,18,9,0.28)]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/20 px-6 py-4">
              <p id="mobile-menu-title" className="text-lg font-semibold">Explore our site</p>
              <button ref={closeButtonRef} type="button" onClick={closeMenu} aria-label="Close navigation menu"
                className={`inline-flex min-h-11 min-w-11 items-center justify-center border border-white/40 hover:bg-white/10 ${focusClass}`}>
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <nav aria-label="Mobile navigation" className="flex flex-col py-3">
                {[{ label: "Home", href: "/" }, ...links].map(({ label, href }) => (
                  <Link key={label} href={href} onClick={closeMenu} aria-current={isActive(href) ? "page" : undefined}
                    className={`flex min-h-12 items-center border-b border-white/15 px-3 py-3 text-base font-semibold ${focusClass} ${
                      isActive(href) ? "border-l-2 border-l-[#7ee29a] bg-white/10 text-[#a1efbb]" : "text-white hover:bg-white/10"
                    }`}>
                    {label}
                  </Link>
                ))}
              </nav>
              <Link href="/contact" onClick={closeMenu} className={`mt-4 flex min-h-12 items-center justify-center bg-[#22c55e] px-5 text-base font-bold text-[#102c1b] hover:bg-[#7ee29a] ${focusClass}`}>Request a pallet quote</Link>
              <a href={`tel:${CONTACT.phone}`} aria-label={`Call Southern Pallet Recycling at ${CONTACT.phoneDisplay}`}
                className={`mt-3 flex min-h-12 items-center justify-center gap-3 border border-white/40 px-3 text-base font-semibold text-white ${focusClass}`}>
                <Phone className="size-5" aria-hidden="true" />{CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>, document.body,
      )}
    </>
  );
}
