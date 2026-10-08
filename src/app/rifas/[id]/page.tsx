import { notFound } from "next/navigation"
import { NumberBoard } from "@/components/rifas/number-board"
import { loadBoard } from "@/lib/public-data"

export const revalidate = 20

export default async function RifaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const board = await loadBoard(id)
  if (!board) notFound()
  return <NumberBoard board={board} />
}
