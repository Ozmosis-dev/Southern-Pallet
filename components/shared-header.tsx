"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SharedHeaderProps {
  isRecyclePage?: boolean;
  isPrivatePage?: boolean;
}

export default function SharedHeader({
  isRecyclePage = false,
  isPrivatePage = false,
}: SharedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" && !isRecyclePage && !isPrivatePage;
  const isContactPage = pathname === "/contact";

  const handleLogoClick = () => {
    if (!isHomePage) {
      window.location.href = "/";
    } else {
      const startPosition = window.scrollY;
      const distance = -startPosition;
      const duration = 1000;
      let start: number;

      const animation = (currentTime: number) => {
        if (!start) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeInOutCubic = (p: number): number => {
          return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        };

        window.scrollTo({
          top: startPosition + distance * easeInOutCubic(progress),
        });

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  const handleGetQuoteClick = (e: React.MouseEvent) => {
    if (!isHomePage && !isContactPage) {
      window.location.href = "/contact";
    } else {
      e.preventDefault();
      const element = document.getElementById("contact");
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - headerOffset;
        const startPosition = window.scrollY;
        const distance = elementPosition - startPosition;
        const duration = 1000;
        let start: number;

        const animation = (currentTime: number) => {
          if (!start) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          const easeInOutCubic = (p: number): number => {
            return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          };

          window.scrollTo({
            top: startPosition + distance * easeInOutCubic(progress),
          });

          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    }
  };

  const getNavHref = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`;
  };

  const getNavClickHandler = (section: string) => {
    if (!isHomePage) {
      return undefined;
    }

    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - headerOffset;
        const startPosition = window.scrollY;
        const distance = elementPosition - startPosition;
        const duration = 1000;
        let start: number;

        const animation = (currentTime: number) => {
          if (!start) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          const easeInOutCubic = (p: number): number => {
            return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          };

          window.scrollTo({
            top: startPosition + distance * easeInOutCubic(progress),
          });

          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };
  };

  const routeLinkClass = (href: string) => {
    const isActive =
      href === "/blog" ? pathname.startsWith("/blog") : pathname === href;

    return `relative px-3 py-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:bg-[#22c55e] after:transition-transform ${
      isActive
        ? "text-white after:scale-x-100"
        : "text-white/78 hover:text-white after:scale-x-0 hover:after:scale-x-100"
    }`;
  };

  const sectionLinkClass =
    "relative px-3 py-2 text-[13px] font-semibold tracking-[-0.01em] text-white/78 transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#22c55e] after:transition-transform hover:text-white hover:after:scale-x-100";

  const mobileLinkClass =
    "border-b border-white/10 py-3 text-base font-semibold text-white/80 transition-colors hover:border-[#22c55e] hover:text-white";
  const privateDesktopLinkClass =
    "transition-colors hover:text-[#22c55e]";
  const privateMobileLinkClass =
    "py-2 transition-colors hover:text-[#22c55e]";

  return (
    <header
      className={
        isPrivatePage
          ? "fixed left-0 right-0 top-0 z-50 bg-[#1e4a2b] text-white shadow-lg"
          : "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#173b24]/96 text-white shadow-[0_8px_30px_rgba(8,30,17,0.12)] backdrop-blur-md"
      }
    >
      <div
        className={
          isPrivatePage
            ? "mx-auto flex h-18 max-w-7xl items-center justify-between px-4"
            : "mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7"
        }
      >
        <div className="flex items-center gap-1">
          <button
            onClick={handleLogoClick}
            className="cursor-pointer transition-opacity hover:opacity-80"
            aria-label={isHomePage ? "Scroll to top" : "Go to homepage"}
          >
            <Image 
              src="/logo.svg" 
              alt="Southern Pallet Recycling" 
              width={isPrivatePage ? 32 : 168}
              height={isPrivatePage ? 32 : 42}
              className={isPrivatePage ? "h-8 w-auto" : "h-10 w-auto"}
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={
            isPrivatePage
              ? "hidden items-center gap-8 xl:flex"
              : "hidden items-center gap-0.5 xl:flex"
          }
          aria-label="Primary navigation"
        >
          <a
            href={getNavHref("products")}
            onClick={getNavClickHandler("products")}
            className={isPrivatePage ? privateDesktopLinkClass : sectionLinkClass}
          >
            Products
          </a>
          <a
            href={getNavHref("services")}
            onClick={getNavClickHandler("services")}
            className={isPrivatePage ? privateDesktopLinkClass : sectionLinkClass}
          >
            Services
          </a>
          <a
            href="/recycle-pallets"
            className={isPrivatePage ? privateDesktopLinkClass : routeLinkClass("/recycle-pallets")}
            aria-current={pathname === "/recycle-pallets" ? "page" : undefined}
          >
            Recycle Pallets
          </a>
          <a
            href="/blog"
            className={isPrivatePage ? privateDesktopLinkClass : routeLinkClass("/blog")}
            aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          >
            Blog
          </a>
          <a
            href="/careers"
            className={isPrivatePage ? privateDesktopLinkClass : routeLinkClass("/careers")}
            aria-current={pathname === "/careers" ? "page" : undefined}
          >
            Careers
          </a>
          <a
            href={getNavHref("about")}
            onClick={getNavClickHandler("about")}
            className={isPrivatePage ? privateDesktopLinkClass : sectionLinkClass}
          >
            About Us
          </a>
          <a
            href={getNavHref("delivery")}
            onClick={getNavClickHandler("delivery")}
            className={isPrivatePage ? privateDesktopLinkClass : sectionLinkClass}
          >
            Delivery
          </a>
          <a
            href="/contact"
            className={isPrivatePage ? privateDesktopLinkClass : routeLinkClass("/contact")}
            aria-current={isContactPage ? "page" : undefined}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={
            isPrivatePage
              ? "rounded-lg p-2 transition-colors hover:bg-white/10 xl:hidden"
              : "border border-white/15 p-2.5 transition-colors hover:border-[#22c55e] hover:bg-white/5 xl:hidden"
          }
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Navigation Backdrop */}
        {isMenuOpen && (
          <div
            className={
              isPrivatePage
                ? "fixed inset-0 bg-black/50 transition-opacity xl:hidden"
                : "fixed inset-0 bg-[#071a0e]/70 backdrop-blur-sm transition-opacity xl:hidden"
            }
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`fixed right-0 top-0 h-full transform transition-transform duration-300 ease-in-out ${
            isPrivatePage
              ? "w-64 bg-[#1e4a2b] shadow-lg"
              : "w-[min(22rem,88vw)] border-l border-white/10 bg-[#102c1b] shadow-[-24px_0_70px_rgba(3,18,9,0.28)]"
          } ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } xl:hidden z-[60]`}
        >
          <div className={isPrivatePage ? "p-4" : "p-6"}>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={
                isPrivatePage
                  ? "mb-4 rounded-lg p-2 transition-colors hover:bg-white/10"
                  : "mb-8 border border-white/15 p-2 transition-colors hover:border-[#22c55e] hover:bg-white/5"
              }
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className={isPrivatePage ? "flex flex-col gap-4" : "flex flex-col"} aria-label="Mobile navigation">
              <a
                href={isHomePage ? "#home" : "/"}
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href={getNavHref("products")}
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href={getNavHref("services")}
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/recycle-pallets"
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                aria-current={pathname === "/recycle-pallets" ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                Recycle Pallets
              </a>
              <a
                href="/blog"
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                aria-current={pathname.startsWith("/blog") ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/careers"
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                aria-current={pathname === "/careers" ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </a>
              <a
                href={getNavHref("about")}
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href={getNavHref("delivery")}
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Delivery
              </a>
              <a
                href="/contact"
                className={isPrivatePage ? privateMobileLinkClass : mobileLinkClass}
                aria-current={isContactPage ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className={isPrivatePage ? "hidden xl:block" : "hidden items-center gap-2 xl:flex"}>
          {!isPrivatePage && <a
            href="tel:+16017465012"
            aria-label="Call Southern Pallet Recycling at (601) 746-5012"
            className="inline-flex h-10 items-center gap-2 border border-white/30 px-4 text-xs font-semibold text-white hover:border-white hover:bg-white hover:text-[#102c1b]"
          >
            <Phone className="size-4" />
            Call (601) 746-5012
          </a>}
          <Button
            className={
              isPrivatePage
                ? "bg-[#22c55e] font-semibold text-black hover:bg-[#16a34a]"
                : "h-10 rounded-none bg-[#22c55e] px-5 font-bold text-[#102c1b] shadow-none hover:-translate-y-0.5 hover:bg-[#43d875] active:translate-y-px"
            }
            onClick={handleGetQuoteClick}
          >
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
