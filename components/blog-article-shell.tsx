import { ArrowLeft, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import Header from "./header";
import PublicSiteShell from "./public-site-shell";

interface BlogArticleShellProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  readTime: string;
  children: React.ReactNode;
}

export default function BlogArticleShell({
  title,
  description,
  image,
  imageAlt,
  readTime,
  children,
}: BlogArticleShellProps) {
  return (
    <PublicSiteShell>
      <Header />
      <main data-blog-article="true" className="bg-[var(--sp-paper)] pt-20">
        <header className="border-b border-[var(--sp-rule)] bg-[var(--sp-cream)]">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-center px-6 py-16 lg:px-10 lg:py-24">
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--sp-green-dark)]"
              >
                <ArrowLeft className="size-4" />
                Back to blog
              </Link>
              <p className="sp-eyebrow mt-10 text-[var(--sp-green-dark)]">Field notes</p>
              <h1 className="sp-display mt-5 max-w-2xl text-4xl text-[var(--sp-forest)] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--sp-ink)]/68">
                {description}
              </p>
              <p className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sp-sage)]">
                <Clock3 className="size-4 text-[var(--sp-green-dark)]" />
                {readTime}
              </p>
            </div>
            <div className="relative min-h-[380px] border-t border-[var(--sp-rule)] lg:min-h-[600px] lg:border-l lg:border-t-0">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <div className="sp-article">{children}</div>
          <aside className="mt-20 border-y border-[var(--sp-rule)] py-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <p className="sp-eyebrow text-[var(--sp-green-dark)]">Need a pallet partner?</p>
              <p className="mt-2 text-lg font-semibold text-[var(--sp-forest)]">
                Tell us what your operation needs.
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-5 inline-flex min-h-11 items-center bg-[var(--sp-forest)] px-5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[var(--sp-green-dark)] sm:mt-0"
            >
              Request a quote
            </Link>
          </aside>
        </article>
      </main>
      <Footer />
    </PublicSiteShell>
  );
}
