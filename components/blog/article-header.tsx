import Image from "next/image";
import Link from "next/link";

type ArticleHeaderProps = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  datePublished: string;
  dateModified: string;
  readingTime: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function ArticleHeader({
  title,
  description,
  image,
  datePublished,
  dateModified,
  readingTime,
}: ArticleHeaderProps) {
  const publishedLabel = dateFormatter.format(new Date(datePublished));
  const modifiedLabel = dateFormatter.format(new Date(dateModified));

  return (
    <header className="mb-12">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-[#1e4a2b] hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-[#1e4a2b] hover:underline">
              Pallet Resources
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <div className="text-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-gray-700">
          {description}
        </p>
        <p className="mt-5 text-sm text-gray-600">
          By Southern Pallet
          <span aria-hidden="true"> · </span>
          Published{" "}
          <time dateTime={datePublished}>{publishedLabel}</time>
          {dateModified !== datePublished && (
            <>
              <span aria-hidden="true"> · </span>
              Updated <time dateTime={dateModified}>{modifiedLabel}</time>
            </>
          )}
          <span aria-hidden="true"> · </span>
          {readingTime}
        </p>
      </div>

      <Image
        src={image.src}
        alt={image.alt}
        width={1027}
        height={768}
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="mx-auto mt-10 aspect-[4/3] w-full rounded-lg object-cover shadow-lg"
      />
    </header>
  );
}
