import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium text-gray-500">404</p>

      <h1 className="mt-3 text-4xl font-bold">Page not found</h1>

      <p className="mt-4 max-w-lg text-gray-600">
        The page you are looking for does not exist or is no longer available.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
