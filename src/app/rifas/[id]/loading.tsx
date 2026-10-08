export default function LoadingRifa() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
      <div className="aspect-[16/9] animate-pulse rounded-[1.5rem] bg-[#e8eef5] sm:aspect-[21/9]" />
      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-xl bg-[#e8eef5]" />
        ))}
      </div>
    </main>
  )
}
