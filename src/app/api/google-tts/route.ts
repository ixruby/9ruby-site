import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google TTS is not configured.", code: "GOOGLE_TTS_NOT_CONFIGURED" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }

  let text: string
  try {
    const body = (await request.json()) as { text?: string }
    text = (body.text || "").trim()
    if (!text) throw new Error("empty")
  } catch {
    return NextResponse.json({ error: "text is required" }, { status: 400 })
  }

  if (text.length > 500) {
    return NextResponse.json({ error: "text too long (max 500 chars)" }, { status: 400 })
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            response_modalities: ["AUDIO"],
            speech_config: {
              voice_config: {
                prebuilt_voice_config: { voice_name: "Kore" },
              },
            },
          },
        }),
        cache: "no-store",
      },
    )

    if (!upstream.ok) {
      const body = await upstream.text()
      console.error("[google-tts] upstream error", { status: upstream.status, body })
      return NextResponse.json(
        { error: "Google TTS request failed." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      )
    }

    const data = (await upstream.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ inlineData?: { mimeType?: string; data?: string } }> }
      }>
    }

    const part = data.candidates?.[0]?.content?.parts?.[0]?.inlineData
    if (!part?.data || !part?.mimeType) {
      console.error("[google-tts] no audio data in response", data)
      return NextResponse.json(
        { error: "No audio returned from Google TTS." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      )
    }

    const audioBuffer = Buffer.from(part.data, "base64")

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": part.mimeType,
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("[google-tts] crashed", error)
    return NextResponse.json(
      { error: "Unable to reach Google TTS right now." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
