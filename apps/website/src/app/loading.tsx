export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-6 py-16">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"
        role="status"
        aria-label="Loading"
      />
    </main>
  );
}
