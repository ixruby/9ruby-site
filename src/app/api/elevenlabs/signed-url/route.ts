import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const agentId = process.env.ELEVENLABS_AGENT_ID
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!agentId || !apiKey) {
    return NextResponse.json(
      {
        error: "ElevenLabs credentials are not configured.",
        code: "ELEVENLABS_NOT_CONFIGURED",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }

  const apiUrl = new URL("https://api.elevenlabs.io/v1/convai/conversation/get-signed-url")
  apiUrl.searchParams.set("agent_id", agentId)

  try {
    const upstream = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
      },
      cache: "no-store",
    })

    if (!upstream.ok) {
      const body = await upstream.text()
      console.error("[elevenlabs] signed-url request failed", {
        status: upstream.status,
        body,
      })

      return NextResponse.json(
        { error: "Unable to create a secure ElevenLabs session." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      )
    }

    const data = (await upstream.json()) as { signed_url?: string }

    console.info("[elevenlabs] signed-url issued", {
      ts: new Date().toISOString(),
      agentId,
      userAgent: request.headers.get("user-agent") || "unknown",
    })

    return NextResponse.json(
      { signedUrl: data.signed_url },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[elevenlabs] signed-url request crashed", error)

    return NextResponse.json(
      { error: "Unable to reach ElevenLabs right now." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
