import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

export const runtime = "nodejs"

type OrderItem = { domain: string; price: number }

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 })
  }
  const body = await req.json().catch(() => null) as { items?: OrderItem[]; customer?: { name?: string; email?: string; phone?: string } } | null
  const items = body?.items
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "no items" }, { status: 400 })
  }
  const amount = items.reduce((s, i) => s + Math.round((Number(i.price) || 0) * 100), 0)
  if (amount < 100) return NextResponse.json({ error: "amount too low" }, { status: 400 })

  const rp = new Razorpay({ key_id: keyId, key_secret: keySecret })
  const order = await rp.orders.create({
    amount,
    currency: "INR",
    receipt: "dom_" + Date.now().toString(36),
    notes: {
      domains: items.map(i => i.domain).join(","),
      customer_name: body?.customer?.name || "",
      customer_email: body?.customer?.email || "",
      customer_phone: body?.customer?.phone || "",
    },
  })
  return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId })
}
