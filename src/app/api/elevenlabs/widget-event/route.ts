import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      type?: string
      meta?: Record<string, unknown>
    }

    console.info("[elevenlabs] widget-event", {
      ts: new Date().toISOString(),
      type: body.type || "unknown",
      meta: body.meta || {},
    })

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[elevenlabs] widget-event parse failed", error)

    return NextResponse.json(
      { ok: false },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    )
  }
}
