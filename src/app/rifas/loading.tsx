export default function LoadingRifas() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-12">
      <div className="h-4 w-24 animate-pulse rounded-full bg-[#e8eef5]" />
      <div className="mt-3 h-10 w-52 animate-pulse rounded-2xl bg-[#e8eef5]" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="h-80 animate-pulse rounded-[1.5rem] bg-[#e8eef5]" />
        <div className="h-80 animate-pulse rounded-[1.5rem] bg-[#e8eef5]" />
      </div>
    </main>
  )
}
