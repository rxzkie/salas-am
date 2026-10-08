export default function LoadingRifas() {
  return (
    <main className="flex-1">
      <section className="border-b border-[#d7e6f2] bg-white/80">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="h-4 w-16 animate-pulse rounded-full bg-[#e8eef5]" />
          <div className="mt-6 h-4 w-28 animate-pulse rounded-full bg-[#e8eef5]" />
          <div className="mt-3 h-12 w-64 max-w-full animate-pulse rounded-2xl bg-[#e8eef5]" />
          <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded-full bg-[#e8eef5]" />
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div className="h-96 animate-pulse rounded-[1.6rem] bg-white" />
        <div className="h-96 animate-pulse rounded-[1.6rem] bg-white" />
        <div className="h-96 animate-pulse rounded-[1.6rem] bg-white" />
      </section>
    </main>
  )
}
