"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    if (!isHomePage) {
      window.location.href = "/#contact";
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

  return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e4a2b] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-18 px-4">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label={isHomePage ? "Scroll to top" : "Go to homepage"}
          >
            <Image 
              src="/logo.svg" 
              alt="Southern Pallet Recycling" 
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          <a
            href={getNavHref("products")}
            onClick={getNavClickHandler("products")}
            className="hover:text-[#22c55e] transition-colors"
          >
            Products
          </a>
          <a
            href={getNavHref("services")}
            onClick={getNavClickHandler("services")}
            className="hover:text-[#22c55e] transition-colors"
          >
            Services
          </a>
          <a
            href="/recycle-pallets"
            className="hover:text-[#22c55e] transition-colors"
          >
            Recycle Pallets
          </a>
          <a
            href="/blog"
            className="hover:text-[#22c55e] transition-colors"
          >
            Blog
          </a>
          <a
            href="/careers"
            className="hover:text-[#22c55e] transition-colors"
          >
            Careers
          </a>
          <a
            href={getNavHref("about")}
            onClick={getNavClickHandler("about")}
            className="hover:text-[#22c55e] transition-colors"
          >
            About Us
          </a>
          <a
            href={getNavHref("delivery")}
            onClick={getNavClickHandler("delivery")}
            className="hover:text-[#22c55e] transition-colors"
          >
            Delivery
          </a>
          <a
            href={getNavHref("contact")}
            onClick={getNavClickHandler("contact")}
            className="hover:text-[#22c55e] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Navigation Backdrop */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 transition-opacity xl:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`fixed top-0 right-0 h-full w-64 bg-[#1e4a2b] shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } xl:hidden z-[60]`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col gap-4">
              <a
                href={isHomePage ? "#home" : "/"}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href={getNavHref("products")}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href={getNavHref("services")}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/recycle-pallets"
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recycle Pallets
              </a>
              <a
                href="/blog"
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/careers"
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </a>
              <a
                href={getNavHref("about")}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href={getNavHref("delivery")}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Delivery
              </a>
              <a
                href={getNavHref("contact")}
                className="hover:text-[#22c55e] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        <Button
          className="hidden xl:inline-flex bg-[#22c55e] text-black hover:bg-[#16a34a] font-semibold"
          onClick={handleGetQuoteClick}
        >
          Get Quote
        </Button>
      </div>
    </header>
  );
}
