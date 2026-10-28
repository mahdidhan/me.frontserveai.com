import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 pt-16 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold tracking-tight font-stretch-125% sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-[48ch] text-lg text-graphite">
        There&apos;s nothing at this address. It may have moved, or the link may
        have a typo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-ink px-6 font-medium text-paper transition-colors hover:bg-cobalt hover:text-cobalt-ink"
      >
        Go to the home page
      </Link>
    </div>
  );
}
