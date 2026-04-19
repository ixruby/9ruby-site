import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return NextResponse.json({ error: "not configured" }, { status: 503 })
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 })
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex")
  if (expected !== razorpay_signature) {
    return NextResponse.json({ verified: false }, { status: 400 })
  }
  // TODO: persist order (Supabase) + notify ops via email/WhatsApp webhook
  return NextResponse.json({ verified: true })
}
