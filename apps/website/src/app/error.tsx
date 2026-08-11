"use client";

import { useEffect } from "react";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>

      <p className="mt-4 max-w-lg text-gray-600">
        An unexpected error occurred while loading this page.
      </p>

      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
