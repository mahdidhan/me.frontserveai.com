export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading page"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6"
    >
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
      </div>
      <p className="font-mono text-sm text-zinc-500">Loading...</p>
    </div>
  );
}
