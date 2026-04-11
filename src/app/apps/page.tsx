"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search, Star, Download, ArrowRight, Filter, Grid3x3, List,
  ChevronDown, ChevronRight, Sparkles, Shield, Zap, TrendingUp,
  Package, ExternalLink, X, Check, Globe, Cpu, Palette,
  ShoppingCart, BarChart3, Settings, Lock, MessageSquare,
  Users, Cloud, RefreshCw, Briefcase,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* ================================================================== */
/*  TYPES                                                              */
/* ================================================================== */

type PricingType = "free" | "freemium" | "paid" | "subscription"
type Badge = "staff-pick" | "trending" | "new" | "popular" | "built-in" | "verified" | null

interface App {
  id: string
  name: string
  description: string
  category: string
  icon: string
  rating: number
  reviews: number
  pricing: string
  pricingType: PricingType
  badge: Badge
  developer: string
  installs: string
}

/* ================================================================== */
/*  CATEGORIES                                                         */
/* ================================================================== */

const CATEGORIES = [
  { id: "sales-channels", name: "Sales Channels", icon: ShoppingCart, count: 15 },
  { id: "finding-products", name: "Finding Products", icon: Search, count: 15 },
  { id: "selling-products", name: "Selling Products", icon: Package, count: 18 },
  { id: "orders-shipping", name: "Orders & Shipping", icon: Globe, count: 16 },
  { id: "store-design", name: "Store Design", icon: Palette, count: 18 },
  { id: "marketing-conversion", name: "Marketing & Conversion", icon: TrendingUp, count: 22 },
  { id: "store-management", name: "Store Management", icon: Settings, count: 14 },
  { id: "ai-ml", name: "AI & Machine Learning", icon: Cpu, count: 25 },
  { id: "analytics-data", name: "Analytics & Data", icon: BarChart3, count: 16 },
  { id: "developer-tools", name: "Developer Tools", icon: Zap, count: 20 },
  { id: "communication", name: "Communication", icon: MessageSquare, count: 14 },
  { id: "security", name: "Security", icon: Lock, count: 12 },
  { id: "finance-billing", name: "Finance & Billing", icon: Briefcase, count: 12 },
  { id: "productivity", name: "Productivity", icon: Users, count: 15 },
  { id: "automation", name: "Automation", icon: RefreshCw, count: 16 },
  { id: "infrastructure", name: "Infrastructure", icon: Cloud, count: 14 },
]

/* ================================================================== */
/*  APP DATA — 248 real apps                                           */
/* ================================================================== */

const ALL_APPS: App[] = [
  // ── Sales Channels (15) ──
  { id: "shopify-pos", name: "Shopify POS", description: "Sell in-person at retail locations, pop-ups, and markets with unified inventory.", category: "sales-channels", icon: "🏪", rating: 4.4, reviews: 48200, pricing: "Included", pricingType: "free", badge: "built-in", developer: "Shopify", installs: "2.1M+" },
  { id: "facebook-shop", name: "Facebook Shop", description: "Sync your catalog and sell directly on Facebook and Instagram storefronts.", category: "sales-channels", icon: "📘", rating: 4.1, reviews: 38700, pricing: "Free", pricingType: "free", badge: "popular", developer: "Meta", installs: "1.8M+" },
  { id: "instagram-shopping", name: "Instagram Shopping", description: "Tag products in posts and stories for seamless in-app purchasing.", category: "sales-channels", icon: "📸", rating: 4.2, reviews: 41200, pricing: "Free", pricingType: "free", badge: "popular", developer: "Meta", installs: "1.6M+" },
  { id: "tiktok-shop", name: "TikTok Shop", description: "Sell through TikTok with shoppable videos, live shopping, and creator collabs.", category: "sales-channels", icon: "🎵", rating: 4.3, reviews: 28900, pricing: "Free", pricingType: "free", badge: "trending", developer: "TikTok", installs: "980K+" },
  { id: "amazon-channel", name: "Amazon", description: "List and manage your products on Amazon Marketplace from one dashboard.", category: "sales-channels", icon: "📦", rating: 4.0, reviews: 52100, pricing: "Free", pricingType: "free", badge: "popular", developer: "Amazon", installs: "2.4M+" },
  { id: "ebay-channel", name: "eBay", description: "Sync inventory and manage eBay listings directly from your store admin.", category: "sales-channels", icon: "🏷️", rating: 4.1, reviews: 31400, pricing: "Free", pricingType: "free", badge: null, developer: "eBay Inc.", installs: "1.2M+" },
  { id: "google-shopping", name: "Google Shopping", description: "Show your products in Google Search, Shopping tab, and YouTube.", category: "sales-channels", icon: "🔍", rating: 4.3, reviews: 67800, pricing: "Free", pricingType: "free", badge: "staff-pick", developer: "Google", installs: "3.1M+" },
  { id: "pinterest-channel", name: "Pinterest", description: "Turn pins into shoppable product listings with auto-synced catalogs.", category: "sales-channels", icon: "📌", rating: 4.2, reviews: 18900, pricing: "Free", pricingType: "free", badge: null, developer: "Pinterest", installs: "890K+" },
  { id: "etsy-marketplace", name: "Etsy", description: "Connect your Etsy shop and manage listings, orders, and inventory in one place.", category: "sales-channels", icon: "🧶", rating: 4.0, reviews: 22300, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "CedCommerce", installs: "670K+" },
  { id: "walmart-marketplace", name: "Walmart Marketplace", description: "List products on Walmart.com and reach 120M+ monthly visitors.", category: "sales-channels", icon: "🛒", rating: 4.1, reviews: 14700, pricing: "Free", pricingType: "free", badge: "new", developer: "Walmart", installs: "540K+" },
  { id: "faire-wholesale", name: "Faire", description: "Sell wholesale to independent retailers worldwide with net-60 terms.", category: "sales-channels", icon: "🤝", rating: 4.4, reviews: 9800, pricing: "Free", pricingType: "free", badge: "trending", developer: "Faire", installs: "320K+" },
  { id: "wish-marketplace", name: "Wish", description: "Reach global shoppers on Wish with automated listing sync and order management.", category: "sales-channels", icon: "⭐", rating: 3.9, reviews: 8200, pricing: "$19/mo", pricingType: "subscription", badge: null, developer: "Wish", installs: "210K+" },
  { id: "mercado-libre", name: "Mercado Libre", description: "Sell across Latin America on the largest regional e-commerce platform.", category: "sales-channels", icon: "🌎", rating: 4.0, reviews: 6700, pricing: "Free", pricingType: "free", badge: null, developer: "Mercado Libre", installs: "180K+" },
  { id: "handshake-wholesale", name: "Handshake", description: "Built-in wholesale marketplace connecting brands with vetted retailers.", category: "sales-channels", icon: "🤲", rating: 4.3, reviews: 5400, pricing: "Free", pricingType: "free", badge: "built-in", developer: "Shopify", installs: "150K+" },
  { id: "taobao-channel", name: "Taobao", description: "Access the massive Chinese consumer market through Taobao integration.", category: "sales-channels", icon: "🇨🇳", rating: 4.0, reviews: 3200, pricing: "$29/mo", pricingType: "subscription", badge: null, developer: "Alibaba Group", installs: "95K+" },

  // ── Finding Products (15) ──
  { id: "dsers", name: "DSers", description: "AliExpress dropshipping tool with bulk ordering and supplier optimization.", category: "finding-products", icon: "🚀", rating: 4.6, reviews: 78200, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "DSers", installs: "2.8M+" },
  { id: "spocket", name: "Spocket", description: "Dropship US/EU products with fast shipping from vetted suppliers.", category: "finding-products", icon: "📦", rating: 4.5, reviews: 45600, pricing: "$39.99/mo", pricingType: "subscription", badge: "popular", developer: "Spocket", installs: "1.4M+" },
  { id: "cjdropshipping", name: "CJDropshipping", description: "All-in-one dropshipping with sourcing, warehousing, and global fulfillment.", category: "finding-products", icon: "🏭", rating: 4.3, reviews: 38900, pricing: "Free", pricingType: "free", badge: "popular", developer: "CJDropshipping", installs: "1.1M+" },
  { id: "printful", name: "Printful", description: "Print-on-demand for custom apparel, accessories, and home decor with no minimums.", category: "finding-products", icon: "👕", rating: 4.5, reviews: 52400, pricing: "Free to use", pricingType: "free", badge: "staff-pick", developer: "Printful", installs: "1.9M+" },
  { id: "printify", name: "Printify", description: "Connect with 90+ print providers worldwide for custom product creation.", category: "finding-products", icon: "🎨", rating: 4.4, reviews: 41200, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Printify", installs: "1.6M+" },
  { id: "modalyst", name: "Modalyst", description: "Curated marketplace of independent brands and trending products to sell.", category: "finding-products", icon: "💎", rating: 4.2, reviews: 18700, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Modalyst", installs: "520K+" },
  { id: "syncee", name: "Syncee", description: "Find millions of products from global suppliers with automated syncing.", category: "finding-products", icon: "🔄", rating: 4.3, reviews: 12400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Syncee", installs: "380K+" },
  { id: "importify", name: "Importify", description: "Import products from AliExpress, Amazon, Etsy, and 30+ marketplaces.", category: "finding-products", icon: "📥", rating: 4.1, reviews: 8900, pricing: "$14.95/mo", pricingType: "subscription", badge: null, developer: "Importify", installs: "290K+" },
  { id: "zendrop", name: "Zendrop", description: "US-based dropshipping with branded packaging and 3-5 day shipping.", category: "finding-products", icon: "⚡", rating: 4.4, reviews: 22100, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Zendrop", installs: "670K+" },
  { id: "autods", name: "AutoDS", description: "Automated dropshipping from 500+ suppliers with AI product recommendations.", category: "finding-products", icon: "🤖", rating: 4.5, reviews: 31800, pricing: "$26.90/mo", pricingType: "subscription", badge: "trending", developer: "AutoDS", installs: "890K+" },
  { id: "salehoo", name: "SaleHoo", description: "Directory of 8000+ vetted wholesale and dropship suppliers worldwide.", category: "finding-products", icon: "📋", rating: 4.2, reviews: 6700, pricing: "$67/year", pricingType: "paid", badge: null, developer: "SaleHoo", installs: "190K+" },
  { id: "doba", name: "Doba", description: "Access millions of products from certified suppliers with one integration.", category: "finding-products", icon: "🏬", rating: 4.0, reviews: 4300, pricing: "$24.99/mo", pricingType: "subscription", badge: null, developer: "Doba Inc.", installs: "140K+" },
  { id: "tundra", name: "Tundra", description: "Wholesale marketplace with zero fees and direct brand relationships.", category: "finding-products", icon: "❄️", rating: 4.3, reviews: 3100, pricing: "Free", pricingType: "free", badge: "new", developer: "Tundra", installs: "98K+" },
  { id: "inventory-source", name: "Inventory Source", description: "Automate dropshipping with real-time inventory sync from 230+ suppliers.", category: "finding-products", icon: "📊", rating: 4.1, reviews: 5600, pricing: "$99/mo", pricingType: "subscription", badge: null, developer: "Inventory Source", installs: "160K+" },
  { id: "gelato", name: "Gelato", description: "Print-on-demand with local production in 34 countries for faster delivery.", category: "finding-products", icon: "🌍", rating: 4.4, reviews: 14200, pricing: "Free to use", pricingType: "free", badge: "new", developer: "Gelato", installs: "420K+" },

  // ── Selling Products (18) ──
  { id: "reconvert", name: "ReConvert", description: "Post-purchase upsell and thank you page builder that boosts AOV by 15%.", category: "selling-products", icon: "🔁", rating: 4.8, reviews: 56300, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "ReConvert", installs: "1.8M+" },
  { id: "bold-upsell", name: "Bold Upsell", description: "Smart upsell and cross-sell offers triggered by cart contents and behavior.", category: "selling-products", icon: "💪", rating: 4.4, reviews: 28700, pricing: "$9.99/mo", pricingType: "subscription", badge: "popular", developer: "Bold Commerce", installs: "890K+" },
  { id: "loox-reviews", name: "Loox Reviews", description: "Photo and video reviews with automatic collection emails and social proof widgets.", category: "selling-products", icon: "📷", rating: 4.9, reviews: 42100, pricing: "$9.99/mo", pricingType: "subscription", badge: "staff-pick", developer: "Loox", installs: "1.5M+" },
  { id: "judge-me", name: "Judge.me", description: "Lightweight, fast-loading product reviews with photo/video and SEO snippets.", category: "selling-products", icon: "⚖️", rating: 4.9, reviews: 89400, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Judge.me", installs: "2.6M+" },
  { id: "stamped-io", name: "Stamped", description: "Reviews, loyalty, and referrals platform for building customer trust.", category: "selling-products", icon: "✅", rating: 4.7, reviews: 18900, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Stamped.io", installs: "680K+" },
  { id: "yotpo", name: "Yotpo", description: "Enterprise reviews, loyalty, SMS, and subscription management platform.", category: "selling-products", icon: "🌟", rating: 4.3, reviews: 31200, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Yotpo", installs: "1.1M+" },
  { id: "vitals", name: "Vitals", description: "40+ apps in one: reviews, upsells, currency converter, sticky cart, and more.", category: "selling-products", icon: "💊", rating: 4.8, reviews: 67800, pricing: "$29.99/mo", pricingType: "subscription", badge: "staff-pick", developer: "Vitals", installs: "2.2M+" },
  { id: "frequently-bought", name: "Frequently Bought Together", description: "Amazon-style product bundles with automatic AI recommendations.", category: "selling-products", icon: "🛍️", rating: 4.7, reviews: 34500, pricing: "$9.99/mo", pricingType: "subscription", badge: "popular", developer: "Code Black Belt", installs: "1.3M+" },
  { id: "bold-bundles", name: "Bold Bundles", description: "Create product bundles and mix-and-match sets with automatic discounts.", category: "selling-products", icon: "🎁", rating: 4.3, reviews: 14200, pricing: "$19.99/mo", pricingType: "subscription", badge: null, developer: "Bold Commerce", installs: "520K+" },
  { id: "product-options", name: "Product Options", description: "Add unlimited custom options: swatches, file uploads, text fields, and conditional logic.", category: "selling-products", icon: "⚙️", rating: 4.5, reviews: 21300, pricing: "$14.99/mo", pricingType: "subscription", badge: null, developer: "Bold Commerce", installs: "780K+" },
  { id: "infinite-options", name: "Infinite Options", description: "Unlimited product customization with conditional logic and price add-ons.", category: "selling-products", icon: "♾️", rating: 4.2, reviews: 9800, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "ShopPad", installs: "340K+" },
  { id: "pagefly-product", name: "PageFly Product", description: "Build custom product pages with drag-and-drop and conversion optimization.", category: "selling-products", icon: "📝", rating: 4.6, reviews: 15600, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "PageFly", installs: "480K+" },
  { id: "rivyo-reviews", name: "Rivyo", description: "Import and display product reviews with rich snippets for better SEO.", category: "selling-products", icon: "📝", rating: 4.3, reviews: 7200, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Rivyo", installs: "210K+" },
  { id: "ali-reviews", name: "Ali Reviews", description: "Import AliExpress reviews with photos and display as social proof.", category: "selling-products", icon: "⭐", rating: 4.6, reviews: 19800, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "FireApps", installs: "620K+" },
  { id: "trust-reviews", name: "TrustReviews", description: "Automated review collection with trust badges and Google Shopping integration.", category: "selling-products", icon: "🛡️", rating: 4.4, reviews: 5400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "TrustReviews", installs: "180K+" },
  { id: "smart-review", name: "SmartReview", description: "AI-powered review analysis with sentiment scoring and auto-moderation.", category: "selling-products", icon: "🧠", rating: 4.3, reviews: 3800, pricing: "$12.99/mo", pricingType: "subscription", badge: "new", developer: "SmartReview", installs: "120K+" },
  { id: "cross-sell", name: "CrossSell", description: "Recommend complementary products with hand-picked or automated suggestions.", category: "selling-products", icon: "🔀", rating: 4.5, reviews: 8700, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "CrossSell", installs: "290K+" },
  { id: "honeycomb-upsell", name: "Honeycomb Upsell", description: "One-click post-purchase upsells with A/B testing and funnel analytics.", category: "selling-products", icon: "🍯", rating: 4.7, reviews: 12400, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Conversion Bear", installs: "410K+" },

  // ── Orders & Shipping (16) ──
  { id: "shipstation", name: "ShipStation", description: "Multi-carrier shipping solution with batch labels, automation rules, and branded tracking.", category: "orders-shipping", icon: "🚢", rating: 4.3, reviews: 34200, pricing: "$9.99/mo", pricingType: "subscription", badge: "staff-pick", developer: "ShipStation", installs: "1.4M+" },
  { id: "aftership", name: "AfterShip", description: "Automated shipment tracking with branded tracking pages and delivery notifications.", category: "orders-shipping", icon: "📬", rating: 4.6, reviews: 48700, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "AfterShip", installs: "1.8M+" },
  { id: "route", name: "Route", description: "Package protection and visual order tracking that increases customer confidence.", category: "orders-shipping", icon: "🛡️", rating: 4.4, reviews: 22100, pricing: "Free", pricingType: "free", badge: "popular", developer: "Route", installs: "890K+" },
  { id: "shipbob", name: "ShipBob", description: "3PL fulfillment with 2-day express shipping from warehouses across the US and globe.", category: "orders-shipping", icon: "📦", rating: 4.2, reviews: 15800, pricing: "Custom", pricingType: "paid", badge: "popular", developer: "ShipBob", installs: "620K+" },
  { id: "shippo", name: "Shippo", description: "Discounted shipping rates from USPS, UPS, FedEx, and DHL in one platform.", category: "orders-shipping", icon: "✈️", rating: 4.3, reviews: 19400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Shippo", installs: "740K+" },
  { id: "easyship", name: "EasyShip", description: "All-in-one shipping with 250+ courier options, duties calculation, and tracking.", category: "orders-shipping", icon: "🌐", rating: 4.4, reviews: 12300, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "EasyShip", installs: "480K+" },
  { id: "pirate-ship", name: "Pirate Ship", description: "Free USPS and UPS shipping software with the cheapest commercial rates.", category: "orders-shipping", icon: "🏴‍☠️", rating: 4.8, reviews: 27600, pricing: "Free", pricingType: "free", badge: "trending", developer: "Pirate Ship", installs: "1.1M+" },
  { id: "tracktor", name: "Tracktor", description: "Real-time order tracking page with carrier auto-detection and status updates.", category: "orders-shipping", icon: "📍", rating: 4.5, reviews: 8900, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "ShopPad", installs: "310K+" },
  { id: "packlink", name: "Packlink", description: "Compare shipping rates from 300+ carriers and print labels in one click.", category: "orders-shipping", icon: "📮", rating: 4.1, reviews: 6700, pricing: "Free", pricingType: "free", badge: null, developer: "Packlink", installs: "240K+" },
  { id: "shiphero", name: "ShipHero", description: "Warehouse management and shipping with pick-pack-ship automation.", category: "orders-shipping", icon: "🦸", rating: 4.2, reviews: 4500, pricing: "$499/mo", pricingType: "subscription", badge: null, developer: "ShipHero", installs: "180K+" },
  { id: "easypost", name: "Easypost", description: "Shipping API with multi-carrier rate shopping, label generation, and tracking.", category: "orders-shipping", icon: "🔗", rating: 4.3, reviews: 3200, pricing: "Pay per label", pricingType: "paid", badge: null, developer: "EasyPost", installs: "150K+" },
  { id: "shipping-rates", name: "Shipping Rates Calculator", description: "Real-time carrier rates at checkout from USPS, UPS, FedEx, and more.", category: "orders-shipping", icon: "🧮", rating: 4.4, reviews: 11200, pricing: "$7.99/mo", pricingType: "subscription", badge: null, developer: "Starter Apps", installs: "390K+" },
  { id: "boxc", name: "BoxC", description: "Global fulfillment network with warehouses in US, EU, and Asia.", category: "orders-shipping", icon: "📤", rating: 4.0, reviews: 2100, pricing: "Custom", pricingType: "paid", badge: null, developer: "BoxC", installs: "78K+" },
  { id: "shipway", name: "Shipway", description: "Automated shipping notifications via SMS, WhatsApp, and email with NDR management.", category: "orders-shipping", icon: "💬", rating: 4.5, reviews: 7800, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Shipway", installs: "280K+" },
  { id: "parcelpanel", name: "ParcelPanel", description: "Branded tracking page with upsell recommendations and delivery estimates.", category: "orders-shipping", icon: "📊", rating: 4.7, reviews: 16400, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "ParcelPanel", installs: "560K+" },
  { id: "trackingmore", name: "TrackingMore", description: "Track shipments across 1100+ carriers worldwide with one unified dashboard.", category: "orders-shipping", icon: "🌎", rating: 4.3, reviews: 5100, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "TrackingMore", installs: "190K+" },

  // ── Store Design (18) ──
  { id: "pagefly", name: "PageFly", description: "Drag-and-drop page builder with 100+ templates for landing, product, and blog pages.", category: "store-design", icon: "🎯", rating: 4.7, reviews: 71200, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "PageFly", installs: "2.4M+" },
  { id: "shogun", name: "Shogun", description: "Visual page builder with A/B testing, SEO tools, and headless CMS support.", category: "store-design", icon: "⚔️", rating: 4.5, reviews: 38400, pricing: "$39/mo", pricingType: "subscription", badge: "popular", developer: "Shogun Labs", installs: "1.2M+" },
  { id: "gempages", name: "GemPages", description: "Conversion-focused page builder with AI layout generator and mobile-first design.", category: "store-design", icon: "💎", rating: 4.8, reviews: 45600, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "GemPages", installs: "1.6M+" },
  { id: "zipify-pages", name: "Zipify Pages", description: "Landing page builder designed for direct response marketing and sales funnels.", category: "store-design", icon: "⚡", rating: 4.6, reviews: 12800, pricing: "$67/mo", pricingType: "subscription", badge: null, developer: "Zipify", installs: "420K+" },
  { id: "tapcart", name: "Tapcart", description: "Turn your store into a native mobile app with push notifications and app-only sales.", category: "store-design", icon: "📱", rating: 4.6, reviews: 18900, pricing: "$99/mo", pricingType: "subscription", badge: "trending", developer: "Tapcart", installs: "580K+" },
  { id: "ecomposer", name: "EComposer", description: "Live drag-and-drop editor with AI content writer and 200+ section templates.", category: "store-design", icon: "🎨", rating: 4.9, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "EComposer", installs: "1.1M+" },
  { id: "layouthub", name: "LayoutHub", description: "One-click page import with 90+ pre-built layouts for every store type.", category: "store-design", icon: "📐", rating: 4.3, reviews: 8700, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "LayoutHub", installs: "290K+" },
  { id: "debutify", name: "Debutify", description: "High-converting theme with 50+ built-in add-ons and speed optimization.", category: "store-design", icon: "🚀", rating: 4.5, reviews: 21400, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Debutify", installs: "780K+" },
  { id: "booster-theme", name: "Booster Theme", description: "Speed-optimized theme that replaces 10+ apps with built-in conversion tools.", category: "store-design", icon: "🏎️", rating: 4.4, reviews: 9200, pricing: "$398 one-time", pricingType: "paid", badge: null, developer: "Clean Canvas", installs: "340K+" },
  { id: "turbo-theme", name: "Turbo Theme", description: "Premium theme by Out of the Sandbox with predictive search and mega menus.", category: "store-design", icon: "💨", rating: 4.6, reviews: 7800, pricing: "$425 one-time", pricingType: "paid", badge: null, developer: "Out of the Sandbox", installs: "280K+" },
  { id: "prestige-theme", name: "Prestige Theme", description: "Luxury-focused theme with editorial layouts and immersive product storytelling.", category: "store-design", icon: "👑", rating: 4.7, reviews: 5400, pricing: "$350 one-time", pricingType: "paid", badge: null, developer: "Maestrooo", installs: "190K+" },
  { id: "dawn-customizer", name: "Dawn Customizer", description: "Enhanced customization options for Shopify's default Dawn theme.", category: "store-design", icon: "🌅", rating: 4.3, reviews: 14600, pricing: "Free", pricingType: "free", badge: "popular", developer: "Shopify", installs: "890K+" },
  { id: "section-store", name: "Section Store", description: "Pre-built theme sections you can add to any Online Store 2.0 theme.", category: "store-design", icon: "🧩", rating: 4.4, reviews: 6200, pricing: "$4.99/section", pricingType: "paid", badge: "new", developer: "Section Store", installs: "210K+" },
  { id: "quick-css", name: "Quick CSS", description: "Add custom CSS to your theme without editing code files directly.", category: "store-design", icon: "🎭", rating: 4.5, reviews: 4800, pricing: "Free", pricingType: "free", badge: null, developer: "Quick CSS", installs: "170K+" },
  { id: "custom-fonts", name: "Custom Fonts", description: "Upload and use any font on your store without touching theme code.", category: "store-design", icon: "🔤", rating: 4.4, reviews: 7200, pricing: "$4.99/mo", pricingType: "subscription", badge: null, developer: "Qikify", installs: "260K+" },
  { id: "animation-effects", name: "Animation Effects", description: "Add scroll animations, hover effects, and micro-interactions without code.", category: "store-design", icon: "✨", rating: 4.2, reviews: 3400, pricing: "$5.99/mo", pricingType: "subscription", badge: "new", developer: "Starter Apps", installs: "120K+" },
  { id: "mega-menu", name: "Mega Menu", description: "Build rich dropdown menus with images, product cards, and multi-column layouts.", category: "store-design", icon: "📋", rating: 4.6, reviews: 11800, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Qikify", installs: "420K+" },
  { id: "smart-sticky-cart", name: "Smart Sticky Cart", description: "Persistent add-to-cart bar that follows shoppers as they scroll.", category: "store-design", icon: "📌", rating: 4.5, reviews: 9100, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Starter Apps", installs: "330K+" },

  // ── Marketing & Conversion (22) ──
  { id: "klaviyo", name: "Klaviyo", description: "Enterprise email and SMS marketing with deep data segmentation and AI-powered flows.", category: "marketing-conversion", icon: "📧", rating: 4.5, reviews: 89200, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Klaviyo", installs: "3.2M+" },
  { id: "privy", name: "Privy", description: "Pop-ups, email capture, and automated cart abandonment campaigns.", category: "marketing-conversion", icon: "🎪", rating: 4.4, reviews: 42100, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Privy", installs: "1.8M+" },
  { id: "omnisend", name: "Omnisend", description: "Omnichannel marketing automation: email, SMS, push notifications, and more.", category: "marketing-conversion", icon: "📡", rating: 4.6, reviews: 56700, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Omnisend", installs: "2.1M+" },
  { id: "mailchimp", name: "Mailchimp", description: "All-in-one marketing platform with email campaigns, automations, and analytics.", category: "marketing-conversion", icon: "🐒", rating: 4.2, reviews: 67300, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Intuit Mailchimp", installs: "2.8M+" },
  { id: "optinmonster", name: "OptinMonster", description: "Conversion optimization with exit-intent popups, floating bars, and gamified wheels.", category: "marketing-conversion", icon: "👹", rating: 4.3, reviews: 18900, pricing: "$14/mo", pricingType: "subscription", badge: null, developer: "OptinMonster", installs: "720K+" },
  { id: "justuno", name: "Justuno", description: "AI-powered on-site conversion with personalized pop-ups and product recommendations.", category: "marketing-conversion", icon: "🎰", rating: 4.4, reviews: 12400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Justuno", installs: "480K+" },
  { id: "sumo", name: "Sumo", description: "Free email capture tools: list builder, welcome mat, smart bar, and share buttons.", category: "marketing-conversion", icon: "🏋️", rating: 4.1, reviews: 21300, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Sumo", installs: "890K+" },
  { id: "pushowl", name: "PushOwl", description: "Web push notifications for cart recovery, back-in-stock alerts, and flash sales.", category: "marketing-conversion", icon: "🦉", rating: 4.6, reviews: 28700, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "PushOwl", installs: "1.1M+" },
  { id: "firepush", name: "Firepush", description: "Multi-channel marketing with SMS, email, and push notification campaigns.", category: "marketing-conversion", icon: "🔥", rating: 4.3, reviews: 9800, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Firepush", installs: "340K+" },
  { id: "smsbump", name: "SMSBump", description: "SMS and MMS marketing with automation flows, segmentation, and A/B testing.", category: "marketing-conversion", icon: "💬", rating: 4.7, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Yotpo", installs: "1.3M+" },
  { id: "postscript", name: "Postscript", description: "Revenue-driving SMS marketing built specifically for Shopify stores.", category: "marketing-conversion", icon: "📲", rating: 4.8, reviews: 22100, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Postscript", installs: "780K+" },
  { id: "attentive", name: "Attentive", description: "Personalized SMS and email marketing with AI-powered messaging optimization.", category: "marketing-conversion", icon: "🎯", rating: 4.5, reviews: 14600, pricing: "Custom", pricingType: "paid", badge: "popular", developer: "Attentive", installs: "520K+" },
  { id: "shoelace", name: "Shoelace", description: "Retargeting ads that tell a brand story across Facebook, Instagram, and Google.", category: "marketing-conversion", icon: "👟", rating: 4.2, reviews: 4300, pricing: "$79/mo", pricingType: "subscription", badge: null, developer: "Shoelace", installs: "150K+" },
  { id: "adroll", name: "AdRoll", description: "AI-driven retargeting and prospecting ads across web, social, and email.", category: "marketing-conversion", icon: "🎯", rating: 4.1, reviews: 8700, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "AdRoll", installs: "310K+" },
  { id: "criteo", name: "Criteo", description: "Dynamic retargeting ads powered by AI with 1.5B+ active shopper profiles.", category: "marketing-conversion", icon: "📺", rating: 4.0, reviews: 5600, pricing: "Custom", pricingType: "paid", badge: null, developer: "Criteo", installs: "210K+" },
  { id: "google-ads-app", name: "Google Ads", description: "Create and manage Google Ads campaigns directly from your store dashboard.", category: "marketing-conversion", icon: "📈", rating: 4.2, reviews: 31200, pricing: "Free", pricingType: "free", badge: "popular", developer: "Google", installs: "1.6M+" },
  { id: "facebook-pixel", name: "Facebook Pixel", description: "Track conversions, optimize ads, and build targeted audiences for Facebook and Instagram.", category: "marketing-conversion", icon: "📊", rating: 4.3, reviews: 24500, pricing: "Free", pricingType: "free", badge: "popular", developer: "Meta", installs: "2.2M+" },
  { id: "tiktok-pixel", name: "TikTok Pixel", description: "Install TikTok tracking pixel for ad optimization and audience building.", category: "marketing-conversion", icon: "🎵", rating: 4.1, reviews: 12300, pricing: "Free", pricingType: "free", badge: "trending", developer: "TikTok", installs: "780K+" },
  { id: "hotjar", name: "Hotjar", description: "Heatmaps, session recordings, and surveys to understand user behavior.", category: "marketing-conversion", icon: "🔥", rating: 4.5, reviews: 18700, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Hotjar", installs: "920K+" },
  { id: "lucky-orange", name: "Lucky Orange", description: "Real-time heatmaps, visitor recordings, live chat, and conversion funnels.", category: "marketing-conversion", icon: "🍊", rating: 4.4, reviews: 14200, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Lucky Orange", installs: "560K+" },
  { id: "referral-candy", name: "Referral Candy", description: "Referral marketing program that rewards customers for sharing with friends.", category: "marketing-conversion", icon: "🍬", rating: 4.3, reviews: 11800, pricing: "$59/mo", pricingType: "subscription", badge: null, developer: "ReferralCandy", installs: "420K+" },
  { id: "smile-io", name: "Smile.io", description: "Loyalty points, VIP tiers, and referral programs to boost repeat purchases.", category: "marketing-conversion", icon: "😊", rating: 4.6, reviews: 38900, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Smile.io", installs: "1.4M+" },

  // ── Store Management (14) ──
  { id: "langify", name: "Langify", description: "Translate your store into multiple languages with SEO-friendly URL structure.", category: "store-management", icon: "🌐", rating: 4.3, reviews: 12400, pricing: "$17.50/mo", pricingType: "subscription", badge: null, developer: "Langify", installs: "420K+" },
  { id: "weglot", name: "Weglot", description: "Automatic and manual translation with multilingual SEO and language switcher.", category: "store-management", icon: "🗣️", rating: 4.6, reviews: 21800, pricing: "$15/mo", pricingType: "subscription", badge: "staff-pick", developer: "Weglot", installs: "780K+" },
  { id: "matrixify", name: "Matrixify", description: "Bulk import, export, and migrate products, orders, and customers via Excel/CSV.", category: "store-management", icon: "📊", rating: 4.8, reviews: 14600, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Matrixify", installs: "520K+" },
  { id: "stock-sync", name: "Stock Sync", description: "Automate inventory updates from suppliers via feeds, FTP, email, or API.", category: "store-management", icon: "🔄", rating: 4.2, reviews: 8900, pricing: "$5/mo", pricingType: "subscription", badge: null, developer: "Stock Sync", installs: "310K+" },
  { id: "bulk-editor", name: "Bulk Editor", description: "Edit thousands of products, prices, and variants simultaneously in a spreadsheet view.", category: "store-management", icon: "📝", rating: 4.4, reviews: 18200, pricing: "Free", pricingType: "free", badge: "popular", developer: "Shopify", installs: "890K+" },
  { id: "multi-currency", name: "Multi Currency", description: "Auto-convert prices based on visitor location with real-time exchange rates.", category: "store-management", icon: "💱", rating: 4.3, reviews: 11400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Bold Commerce", installs: "460K+" },
  { id: "geolocation-app", name: "Geolocation", description: "Detect visitor location and redirect to the right language and currency.", category: "store-management", icon: "📍", rating: 4.2, reviews: 7800, pricing: "Free", pricingType: "free", badge: "built-in", developer: "Shopify", installs: "680K+" },
  { id: "store-locator", name: "Store Locator", description: "Interactive map showing your physical store locations with hours and directions.", category: "store-management", icon: "🗺️", rating: 4.4, reviews: 5600, pricing: "$9.99/mo", pricingType: "subscription", badge: null, developer: "Starter Apps", installs: "220K+" },
  { id: "age-verifier", name: "Age Verifier", description: "Age gate popup for stores selling age-restricted products.", category: "store-management", icon: "🔞", rating: 4.3, reviews: 4200, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Starter Apps", installs: "180K+" },
  { id: "cookie-banner", name: "Cookie Banner", description: "GDPR and CCPA compliant cookie consent banner with granular controls.", category: "store-management", icon: "🍪", rating: 4.5, reviews: 14800, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Pandectes", installs: "620K+" },
  { id: "gdpr-compliance", name: "GDPR Compliance", description: "Full GDPR, CCPA, and LGPD compliance toolkit with data deletion requests.", category: "store-management", icon: "🔒", rating: 4.4, reviews: 9200, pricing: "$9/mo", pricingType: "subscription", badge: null, developer: "Consentmo", installs: "380K+" },
  { id: "backup-pro", name: "Backup Pro", description: "Automatic daily backups of products, themes, customers, orders, and pages.", category: "store-management", icon: "💾", rating: 4.6, reviews: 6800, pricing: "$14.99/mo", pricingType: "subscription", badge: null, developer: "Rewind", installs: "240K+" },
  { id: "import-export", name: "Import/Export", description: "Migrate data between platforms with smart field mapping and scheduling.", category: "store-management", icon: "🔃", rating: 4.3, reviews: 7400, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "EZ Importer", installs: "280K+" },
  { id: "inventory-planner", name: "Inventory Planner", description: "AI demand forecasting and purchase order automation to prevent stockouts.", category: "store-management", icon: "📈", rating: 4.7, reviews: 3200, pricing: "$249/mo", pricingType: "subscription", badge: "verified", developer: "Inventory Planner", installs: "120K+" },

  // ── AI & Machine Learning (25) ──
  { id: "chatgpt", name: "ChatGPT", description: "AI assistant for content writing, customer support, code generation, and brainstorming.", category: "ai-ml", icon: "🤖", rating: 4.7, reviews: 487000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "OpenAI", installs: "12M+" },
  { id: "claude-ai", name: "Claude AI", description: "Advanced AI for analysis, writing, coding, and complex reasoning with 200K context.", category: "ai-ml", icon: "🧠", rating: 4.8, reviews: 312000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Anthropic", installs: "8.4M+" },
  { id: "gemini", name: "Gemini", description: "Google's multimodal AI for text, images, audio, and video understanding.", category: "ai-ml", icon: "♊", rating: 4.6, reviews: 245000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Google", installs: "6.2M+" },
  { id: "perplexity", name: "Perplexity", description: "AI-powered search engine that provides cited answers from the web in real-time.", category: "ai-ml", icon: "🔮", rating: 4.7, reviews: 189000, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Perplexity AI", installs: "4.8M+" },
  { id: "ollama", name: "Ollama", description: "Run open-source LLMs locally: Llama, Mistral, Gemma, Phi, and more.", category: "ai-ml", icon: "🦙", rating: 4.8, reviews: 78200, pricing: "Free", pricingType: "free", badge: "trending", developer: "Ollama", installs: "2.1M+" },
  { id: "lm-studio", name: "LM Studio", description: "Desktop app to discover, download, and run local LLMs with a chat interface.", category: "ai-ml", icon: "🖥️", rating: 4.7, reviews: 45600, pricing: "Free", pricingType: "free", badge: "trending", developer: "LM Studio", installs: "1.4M+" },
  { id: "hugging-face", name: "Hugging Face", description: "Hub for 500K+ ML models, datasets, and spaces for every AI use case.", category: "ai-ml", icon: "🤗", rating: 4.8, reviews: 156000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Hugging Face", installs: "5.6M+" },
  { id: "midjourney", name: "Midjourney", description: "Generate stunning AI art and images from text descriptions via Discord.", category: "ai-ml", icon: "🎨", rating: 4.7, reviews: 234000, pricing: "$10/mo", pricingType: "subscription", badge: "popular", developer: "Midjourney", installs: "7.8M+" },
  { id: "dall-e-3", name: "DALL-E 3", description: "Create photorealistic images and art from natural language prompts with high fidelity.", category: "ai-ml", icon: "🖼️", rating: 4.5, reviews: 167000, pricing: "Pay per image", pricingType: "paid", badge: "popular", developer: "OpenAI", installs: "5.2M+" },
  { id: "stable-diffusion", name: "Stable Diffusion", description: "Open-source image generation model you can run locally or in the cloud.", category: "ai-ml", icon: "🌊", rating: 4.6, reviews: 123000, pricing: "Free", pricingType: "free", badge: "popular", developer: "Stability AI", installs: "4.1M+" },
  { id: "elevenlabs", name: "ElevenLabs", description: "AI voice cloning and text-to-speech with ultra-realistic human-quality voices.", category: "ai-ml", icon: "🎙️", rating: 4.7, reviews: 98400, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "ElevenLabs", installs: "3.4M+" },
  { id: "whisper-ai", name: "Whisper AI", description: "OpenAI's speech recognition model for accurate transcription in 99 languages.", category: "ai-ml", icon: "👂", rating: 4.6, reviews: 67800, pricing: "Free", pricingType: "free", badge: "popular", developer: "OpenAI", installs: "2.8M+" },
  { id: "runwayml", name: "RunwayML", description: "AI video generation and editing: text-to-video, image-to-video, and motion brush.", category: "ai-ml", icon: "🎬", rating: 4.5, reviews: 78900, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Runway", installs: "2.4M+" },
  { id: "pika", name: "Pika", description: "AI video generator that creates and edits cinematic videos from text and images.", category: "ai-ml", icon: "🎥", rating: 4.4, reviews: 45200, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Pika Labs", installs: "1.6M+" },
  { id: "suno-ai", name: "Suno AI", description: "AI music generator that creates full songs with vocals from text prompts.", category: "ai-ml", icon: "🎵", rating: 4.6, reviews: 89300, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Suno", installs: "3.2M+" },
  { id: "notebooklm", name: "NotebookLM", description: "Google's AI notebook that turns documents into interactive knowledge bases.", category: "ai-ml", icon: "📓", rating: 4.5, reviews: 34500, pricing: "Free", pricingType: "free", badge: "new", developer: "Google", installs: "1.2M+" },
  { id: "cursor-ai", name: "Cursor AI", description: "AI-native code editor with intelligent autocomplete and codebase understanding.", category: "ai-ml", icon: "💻", rating: 4.8, reviews: 67200, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Anysphere", installs: "2.6M+" },
  { id: "v0-dev", name: "v0.dev", description: "Vercel's AI tool that generates React components and UI from text descriptions.", category: "ai-ml", icon: "🔷", rating: 4.6, reviews: 38900, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Vercel", installs: "1.8M+" },
  { id: "bolt-new", name: "Bolt.new", description: "Full-stack web app generator powered by AI with instant preview and deploy.", category: "ai-ml", icon: "⚡", rating: 4.5, reviews: 28700, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "StackBlitz", installs: "1.1M+" },
  { id: "lovable", name: "Lovable", description: "AI full-stack engineer that builds production-ready web apps from prompts.", category: "ai-ml", icon: "💜", rating: 4.4, reviews: 21400, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Lovable", installs: "820K+" },
  { id: "copilot", name: "Copilot", description: "AI pair programmer that suggests code completions inline as you type.", category: "ai-ml", icon: "🤝", rating: 4.6, reviews: 189000, pricing: "$10/mo", pricingType: "subscription", badge: "popular", developer: "GitHub", installs: "5.4M+" },
  { id: "tabnine", name: "Tabnine", description: "AI code assistant that runs on your machine for privacy-first code completion.", category: "ai-ml", icon: "⌨️", rating: 4.3, reviews: 34500, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Tabnine", installs: "1.2M+" },
  { id: "codeium", name: "Codeium", description: "Free AI code completion with support for 70+ languages and all major IDEs.", category: "ai-ml", icon: "🔮", rating: 4.5, reviews: 28900, pricing: "Free", pricingType: "free", badge: "popular", developer: "Codeium", installs: "980K+" },
  { id: "jasper-ai", name: "Jasper AI", description: "Enterprise AI for marketing teams: brand voice, campaigns, and content at scale.", category: "ai-ml", icon: "✍️", rating: 4.3, reviews: 42100, pricing: "$49/mo", pricingType: "subscription", badge: null, developer: "Jasper", installs: "1.6M+" },
  { id: "copy-ai", name: "Copy.ai", description: "AI-powered copywriting for ads, emails, social posts, and product descriptions.", category: "ai-ml", icon: "📝", rating: 4.4, reviews: 38700, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Copy.ai", installs: "1.4M+" },

  // ── Analytics & Data (16) ──
  { id: "google-analytics", name: "Google Analytics", description: "Industry-standard web analytics with traffic, conversions, and audience insights.", category: "analytics-data", icon: "📈", rating: 4.4, reviews: 312000, pricing: "Free", pricingType: "free", badge: "staff-pick", developer: "Google", installs: "8.6M+" },
  { id: "mixpanel", name: "Mixpanel", description: "Product analytics with funnel analysis, retention tracking, and user segmentation.", category: "analytics-data", icon: "📊", rating: 4.5, reviews: 78200, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Mixpanel", installs: "2.4M+" },
  { id: "amplitude", name: "Amplitude", description: "Digital analytics platform for understanding user behavior and driving growth.", category: "analytics-data", icon: "📉", rating: 4.4, reviews: 56300, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Amplitude", installs: "1.8M+" },
  { id: "posthog", name: "PostHog", description: "Open-source product analytics with feature flags, session replay, and A/B testing.", category: "analytics-data", icon: "🦔", rating: 4.7, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "PostHog", installs: "1.2M+" },
  { id: "plausible", name: "Plausible", description: "Privacy-friendly, lightweight analytics that don't need cookie banners.", category: "analytics-data", icon: "🌿", rating: 4.8, reviews: 18900, pricing: "$9/mo", pricingType: "subscription", badge: "trending", developer: "Plausible", installs: "680K+" },
  { id: "umami", name: "Umami", description: "Open-source, privacy-first web analytics alternative you can self-host.", category: "analytics-data", icon: "🍣", rating: 4.6, reviews: 12400, pricing: "Free", pricingType: "free", badge: "new", developer: "Umami", installs: "420K+" },
  { id: "fathom", name: "Fathom", description: "Simple, privacy-focused analytics with no cookie banners and GDPR compliance.", category: "analytics-data", icon: "🎯", rating: 4.7, reviews: 8900, pricing: "$14/mo", pricingType: "subscription", badge: null, developer: "Fathom", installs: "310K+" },
  { id: "datadog", name: "Datadog", description: "Cloud monitoring and observability with logs, metrics, traces, and dashboards.", category: "analytics-data", icon: "🐕", rating: 4.5, reviews: 45600, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Datadog", installs: "1.6M+" },
  { id: "grafana", name: "Grafana", description: "Open-source visualization and monitoring with customizable dashboards.", category: "analytics-data", icon: "📊", rating: 4.6, reviews: 67800, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Grafana Labs", installs: "2.2M+" },
  { id: "segment", name: "Segment", description: "Customer data platform that collects, cleans, and routes data to 300+ tools.", category: "analytics-data", icon: "🔀", rating: 4.3, reviews: 28700, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Twilio", installs: "980K+" },
  { id: "heap", name: "Heap", description: "Auto-capture analytics that records every user interaction without manual tracking.", category: "analytics-data", icon: "📚", rating: 4.4, reviews: 14200, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Heap", installs: "520K+" },
  { id: "fullstory", name: "FullStory", description: "Digital experience intelligence with session replay, heatmaps, and frustration signals.", category: "analytics-data", icon: "🎥", rating: 4.5, reviews: 18700, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "FullStory", installs: "680K+" },
  { id: "logrocket", name: "LogRocket", description: "Session replay and error tracking to reproduce bugs exactly as users experienced them.", category: "analytics-data", icon: "🚀", rating: 4.4, reviews: 12800, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "LogRocket", installs: "460K+" },
  { id: "tableau", name: "Tableau", description: "Enterprise business intelligence with interactive data visualizations and dashboards.", category: "analytics-data", icon: "📊", rating: 4.3, reviews: 89400, pricing: "$75/user/mo", pricingType: "subscription", badge: "popular", developer: "Salesforce", installs: "3.4M+" },
  { id: "looker-studio", name: "Looker Studio", description: "Free Google tool for creating interactive reports and dashboards from any data source.", category: "analytics-data", icon: "📋", rating: 4.4, reviews: 56700, pricing: "Free", pricingType: "free", badge: "popular", developer: "Google", installs: "2.8M+" },
  { id: "metabase", name: "Metabase", description: "Open-source BI tool that lets anyone ask questions about data without SQL.", category: "analytics-data", icon: "🔍", rating: 4.6, reviews: 34500, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Metabase", installs: "1.1M+" },

  // ── Developer Tools (20) ──
  { id: "github", name: "GitHub", description: "Code hosting, version control, CI/CD, and collaboration for development teams.", category: "developer-tools", icon: "🐙", rating: 4.8, reviews: 456000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "GitHub", installs: "14M+" },
  { id: "gitlab", name: "GitLab", description: "Complete DevOps platform with git repos, CI/CD, security scanning, and project management.", category: "developer-tools", icon: "🦊", rating: 4.5, reviews: 89200, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "GitLab", installs: "4.2M+" },
  { id: "vscode", name: "VS Code", description: "The most popular code editor with extensions, debugging, and integrated terminal.", category: "developer-tools", icon: "💠", rating: 4.9, reviews: 378000, pricing: "Free", pricingType: "free", badge: "staff-pick", developer: "Microsoft", installs: "18M+" },
  { id: "docker", name: "Docker", description: "Containerize applications for consistent development, testing, and deployment.", category: "developer-tools", icon: "🐳", rating: 4.7, reviews: 234000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Docker", installs: "9.6M+" },
  { id: "vercel", name: "Vercel", description: "Deploy frontend frameworks with zero config, edge functions, and global CDN.", category: "developer-tools", icon: "▲", rating: 4.8, reviews: 156000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Vercel", installs: "5.8M+" },
  { id: "netlify", name: "Netlify", description: "Deploy web projects with CI/CD, serverless functions, and form handling.", category: "developer-tools", icon: "🌐", rating: 4.5, reviews: 89400, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Netlify", installs: "3.4M+" },
  { id: "railway", name: "Railway", description: "Deploy databases, backends, and full-stack apps with one-click from GitHub.", category: "developer-tools", icon: "🚂", rating: 4.6, reviews: 28700, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Railway", installs: "1.2M+" },
  { id: "supabase", name: "Supabase", description: "Open-source Firebase alternative with Postgres, auth, storage, and realtime.", category: "developer-tools", icon: "⚡", rating: 4.8, reviews: 78900, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Supabase", installs: "3.2M+" },
  { id: "firebase", name: "Firebase", description: "Google's app platform with Firestore, Auth, Hosting, Functions, and Analytics.", category: "developer-tools", icon: "🔥", rating: 4.5, reviews: 189000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Google", installs: "6.8M+" },
  { id: "planetscale", name: "PlanetScale", description: "Serverless MySQL database with branching, deploy requests, and infinite scale.", category: "developer-tools", icon: "🪐", rating: 4.6, reviews: 23400, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "PlanetScale", installs: "890K+" },
  { id: "neon", name: "Neon", description: "Serverless Postgres with autoscaling, branching, and bottomless storage.", category: "developer-tools", icon: "🟢", rating: 4.7, reviews: 18900, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Neon", installs: "720K+" },
  { id: "prisma", name: "Prisma", description: "Next-generation TypeScript ORM with auto-generated types and visual database browser.", category: "developer-tools", icon: "🔷", rating: 4.6, reviews: 45600, pricing: "Free", pricingType: "free", badge: "popular", developer: "Prisma", installs: "2.1M+" },
  { id: "trpc", name: "tRPC", description: "End-to-end typesafe APIs without code generation or schema definitions.", category: "developer-tools", icon: "🔗", rating: 4.7, reviews: 21300, pricing: "Free", pricingType: "free", badge: "trending", developer: "tRPC", installs: "980K+" },
  { id: "hono", name: "Hono", description: "Ultra-fast web framework for edge computing: Cloudflare Workers, Deno, and Bun.", category: "developer-tools", icon: "🔥", rating: 4.7, reviews: 14800, pricing: "Free", pricingType: "free", badge: "trending", developer: "Hono", installs: "620K+" },
  { id: "bun", name: "Bun", description: "All-in-one JavaScript toolkit: runtime, bundler, test runner, and package manager.", category: "developer-tools", icon: "🍔", rating: 4.7, reviews: 34200, pricing: "Free", pricingType: "free", badge: "trending", developer: "Oven", installs: "1.4M+" },
  { id: "deno", name: "Deno", description: "Secure JavaScript/TypeScript runtime with built-in tooling and web standard APIs.", category: "developer-tools", icon: "🦕", rating: 4.5, reviews: 28900, pricing: "Free", pricingType: "free", badge: "popular", developer: "Deno Land", installs: "1.1M+" },
  { id: "turborepo", name: "Turborepo", description: "High-performance monorepo build system with remote caching and parallel execution.", category: "developer-tools", icon: "🌀", rating: 4.6, reviews: 18700, pricing: "Free", pricingType: "free", badge: "popular", developer: "Vercel", installs: "780K+" },
  { id: "nx", name: "Nx", description: "Smart monorepo build system with computation caching and dependency graph.", category: "developer-tools", icon: "🔧", rating: 4.5, reviews: 21400, pricing: "Free", pricingType: "free", badge: "popular", developer: "Nrwl", installs: "890K+" },
  { id: "storybook", name: "Storybook", description: "Build, document, and test UI components in isolation with visual testing.", category: "developer-tools", icon: "📖", rating: 4.6, reviews: 67800, pricing: "Free", pricingType: "free", badge: "popular", developer: "Storybook", installs: "2.8M+" },
  { id: "playwright", name: "Playwright", description: "End-to-end testing for modern web apps with auto-wait and cross-browser support.", category: "developer-tools", icon: "🎭", rating: 4.7, reviews: 45600, pricing: "Free", pricingType: "free", badge: "trending", developer: "Microsoft", installs: "1.8M+" },

  // ── Communication (14) ──
  { id: "twilio", name: "Twilio", description: "Cloud communications API for SMS, voice, video, and WhatsApp messaging.", category: "communication", icon: "📞", rating: 4.4, reviews: 89200, pricing: "Pay per use", pricingType: "paid", badge: "staff-pick", developer: "Twilio", installs: "3.6M+" },
  { id: "sendgrid", name: "SendGrid", description: "Transactional and marketing email delivery with analytics and deliverability tools.", category: "communication", icon: "📧", rating: 4.3, reviews: 67800, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Twilio", installs: "2.8M+" },
  { id: "resend", name: "Resend", description: "Modern email API built for developers with React Email templates.", category: "communication", icon: "✉️", rating: 4.7, reviews: 18900, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Resend", installs: "780K+" },
  { id: "postmark", name: "Postmark", description: "Transactional email service with industry-leading deliverability and speed.", category: "communication", icon: "📮", rating: 4.8, reviews: 12400, pricing: "$15/mo", pricingType: "subscription", badge: "verified", developer: "Wildbit", installs: "460K+" },
  { id: "pusher", name: "Pusher", description: "Realtime APIs for notifications, chat, live updates, and collaborative features.", category: "communication", icon: "🔔", rating: 4.4, reviews: 21300, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Pusher", installs: "890K+" },
  { id: "onesignal", name: "OneSignal", description: "Multi-channel notifications: push, email, SMS, and in-app messaging.", category: "communication", icon: "🔕", rating: 4.5, reviews: 34500, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "OneSignal", installs: "1.4M+" },
  { id: "intercom", name: "Intercom", description: "Customer messaging platform with live chat, bots, product tours, and help center.", category: "communication", icon: "💬", rating: 4.4, reviews: 56700, pricing: "$74/mo", pricingType: "subscription", badge: "popular", developer: "Intercom", installs: "2.1M+" },
  { id: "crisp", name: "Crisp", description: "All-in-one customer messaging with live chat, chatbot, and shared inbox.", category: "communication", icon: "💭", rating: 4.6, reviews: 18200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Crisp", installs: "720K+" },
  { id: "tawk-to", name: "Tawk.to", description: "Free live chat software with unlimited agents, chat history, and ticketing.", category: "communication", icon: "🗨️", rating: 4.3, reviews: 42100, pricing: "Free", pricingType: "free", badge: "popular", developer: "Tawk.to", installs: "1.8M+" },
  { id: "livechat", name: "LiveChat", description: "Premium live chat with AI assist, rich messages, and e-commerce integrations.", category: "communication", icon: "💬", rating: 4.5, reviews: 28700, pricing: "$20/agent/mo", pricingType: "subscription", badge: null, developer: "LiveChat", installs: "1.1M+" },
  { id: "drift", name: "Drift", description: "Conversational marketing and sales platform with AI chatbots and live chat.", category: "communication", icon: "🌊", rating: 4.2, reviews: 14600, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Salesloft", installs: "520K+" },
  { id: "zendesk-chat", name: "Zendesk Chat", description: "Enterprise live chat with routing, analytics, and omnichannel support.", category: "communication", icon: "🎧", rating: 4.3, reviews: 38900, pricing: "$55/agent/mo", pricingType: "subscription", badge: "popular", developer: "Zendesk", installs: "1.6M+" },
  { id: "whatsapp-business", name: "WhatsApp Business", description: "Connect with customers on WhatsApp with automated messages and catalogs.", category: "communication", icon: "📱", rating: 4.5, reviews: 78200, pricing: "Free", pricingType: "free", badge: "popular", developer: "Meta", installs: "3.2M+" },
  { id: "telegram-bot", name: "Telegram Bot", description: "Build customer support and notification bots on the Telegram platform.", category: "communication", icon: "✈️", rating: 4.4, reviews: 21800, pricing: "Free", pricingType: "free", badge: null, developer: "Telegram", installs: "980K+" },

  // ── Security (12) ──
  { id: "auth0", name: "Auth0", description: "Identity platform with social login, MFA, passwordless, and enterprise SSO.", category: "security", icon: "🔐", rating: 4.5, reviews: 67800, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Okta", installs: "2.8M+" },
  { id: "clerk", name: "Clerk", description: "Drop-in auth with beautiful UI components, user management, and webhooks.", category: "security", icon: "🔑", rating: 4.8, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Clerk", installs: "1.4M+" },
  { id: "cloudflare", name: "Cloudflare", description: "CDN, DDoS protection, WAF, and DNS management for security and performance.", category: "security", icon: "☁️", rating: 4.7, reviews: 189000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Cloudflare", installs: "6.2M+" },
  { id: "snyk", name: "Snyk", description: "Find and fix vulnerabilities in code, dependencies, containers, and IaC.", category: "security", icon: "🐛", rating: 4.5, reviews: 45600, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Snyk", installs: "1.8M+" },
  { id: "sonarqube", name: "SonarQube", description: "Static code analysis for bugs, vulnerabilities, and code smells across 30+ languages.", category: "security", icon: "🔍", rating: 4.4, reviews: 56700, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "SonarSource", installs: "2.1M+" },
  { id: "1password", name: "1Password", description: "Team password management with vaults, secrets automation, and SSO integration.", category: "security", icon: "🔒", rating: 4.8, reviews: 134000, pricing: "$7.99/user/mo", pricingType: "subscription", badge: "staff-pick", developer: "1Password", installs: "4.6M+" },
  { id: "hashicorp-vault", name: "HashiCorp Vault", description: "Secrets management, encryption, and identity-based access for infrastructure.", category: "security", icon: "🏦", rating: 4.5, reviews: 28700, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "HashiCorp", installs: "1.2M+" },
  { id: "trivy", name: "Trivy", description: "Open-source vulnerability scanner for containers, filesystems, and git repos.", category: "security", icon: "🛡️", rating: 4.6, reviews: 18900, pricing: "Free", pricingType: "free", badge: "trending", developer: "Aqua Security", installs: "780K+" },
  { id: "lets-encrypt", name: "Let's Encrypt", description: "Free, automated TLS/SSL certificates for any website or application.", category: "security", icon: "🔏", rating: 4.9, reviews: 234000, pricing: "Free", pricingType: "free", badge: "staff-pick", developer: "ISRG", installs: "8.4M+" },
  { id: "recaptcha", name: "reCAPTCHA", description: "Protect forms from spam and abuse with invisible and challenge-based verification.", category: "security", icon: "🤖", rating: 4.2, reviews: 89400, pricing: "Free", pricingType: "free", badge: "popular", developer: "Google", installs: "5.6M+" },
  { id: "turnstile", name: "Turnstile", description: "Cloudflare's privacy-first CAPTCHA alternative with no visual puzzles.", category: "security", icon: "🔄", rating: 4.6, reviews: 14200, pricing: "Free", pricingType: "free", badge: "new", developer: "Cloudflare", installs: "620K+" },
  { id: "rewind-backups", name: "Rewind Backups", description: "Automated daily backups with one-click restore for your entire store.", category: "security", icon: "⏪", rating: 4.7, reviews: 21300, pricing: "$9/mo", pricingType: "subscription", badge: "verified", developer: "Rewind", installs: "890K+" },

  // ── Finance & Billing (12) ──
  { id: "stripe", name: "Stripe", description: "Complete payments platform with subscriptions, invoicing, and global payment methods.", category: "finance-billing", icon: "💳", rating: 4.7, reviews: 289000, pricing: "Pay per transaction", pricingType: "paid", badge: "staff-pick", developer: "Stripe", installs: "9.2M+" },
  { id: "paypal", name: "PayPal", description: "Accept PayPal, Venmo, and credit card payments with buyer protection.", category: "finance-billing", icon: "🅿️", rating: 4.3, reviews: 234000, pricing: "Pay per transaction", pricingType: "paid", badge: "popular", developer: "PayPal", installs: "8.6M+" },
  { id: "square", name: "Square", description: "Unified payments for online and in-person with invoicing and banking.", category: "finance-billing", icon: "⬜", rating: 4.4, reviews: 89200, pricing: "Pay per transaction", pricingType: "paid", badge: "popular", developer: "Block", installs: "3.8M+" },
  { id: "quickbooks", name: "QuickBooks", description: "Accounting software with invoicing, expense tracking, tax prep, and payroll.", category: "finance-billing", icon: "📗", rating: 4.3, reviews: 156000, pricing: "$30/mo", pricingType: "subscription", badge: "popular", developer: "Intuit", installs: "5.4M+" },
  { id: "xero", name: "Xero", description: "Cloud accounting with bank reconciliation, invoicing, and multi-currency support.", category: "finance-billing", icon: "📘", rating: 4.4, reviews: 89400, pricing: "$15/mo", pricingType: "subscription", badge: "popular", developer: "Xero", installs: "3.2M+" },
  { id: "freshbooks", name: "FreshBooks", description: "Small business accounting with time tracking, proposals, and client portals.", category: "finance-billing", icon: "📒", rating: 4.5, reviews: 45600, pricing: "$17/mo", pricingType: "subscription", badge: null, developer: "FreshBooks", installs: "1.8M+" },
  { id: "chargebee", name: "Chargebee", description: "Subscription billing and revenue management with dunning and analytics.", category: "finance-billing", icon: "🐝", rating: 4.4, reviews: 21300, pricing: "Freemium", pricingType: "freemium", badge: null, developer: "Chargebee", installs: "780K+" },
  { id: "lemon-squeezy", name: "Lemon Squeezy", description: "Merchant of record for digital products: handles tax, billing, and global payments.", category: "finance-billing", icon: "🍋", rating: 4.6, reviews: 14800, pricing: "Pay per transaction", pricingType: "paid", badge: "trending", developer: "Lemon Squeezy", installs: "420K+" },
  { id: "paddle", name: "Paddle", description: "All-in-one checkout, tax compliance, and subscription management platform.", category: "finance-billing", icon: "🏓", rating: 4.5, reviews: 18200, pricing: "Pay per transaction", pricingType: "paid", badge: "trending", developer: "Paddle", installs: "560K+" },
  { id: "mercury", name: "Mercury", description: "Business banking built for startups with API access, team cards, and treasury.", category: "finance-billing", icon: "🪙", rating: 4.7, reviews: 28700, pricing: "Free", pricingType: "free", badge: "trending", developer: "Mercury", installs: "890K+" },
  { id: "wise-business", name: "Wise Business", description: "International business payments with real exchange rates and multi-currency accounts.", category: "finance-billing", icon: "🌍", rating: 4.6, reviews: 67800, pricing: "Pay per transfer", pricingType: "paid", badge: "popular", developer: "Wise", installs: "2.4M+" },
  { id: "baremetrics", name: "Baremetrics", description: "Subscription analytics dashboard with MRR, churn, LTV, and forecasting.", category: "finance-billing", icon: "📊", rating: 4.4, reviews: 8900, pricing: "$108/mo", pricingType: "subscription", badge: null, developer: "Baremetrics", installs: "210K+" },

  // ── Productivity (15) ──
  { id: "notion", name: "Notion", description: "All-in-one workspace for notes, docs, wikis, project management, and databases.", category: "productivity", icon: "📝", rating: 4.7, reviews: 345000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Notion", installs: "11M+" },
  { id: "linear", name: "Linear", description: "Issue tracking and project management built for high-performance engineering teams.", category: "productivity", icon: "🔄", rating: 4.9, reviews: 67800, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Linear", installs: "2.4M+" },
  { id: "slack", name: "Slack", description: "Team messaging with channels, threads, app integrations, and huddles.", category: "productivity", icon: "💬", rating: 4.5, reviews: 289000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Salesforce", installs: "8.6M+" },
  { id: "asana", name: "Asana", description: "Project management with timelines, boards, portfolios, and workflow automation.", category: "productivity", icon: "📋", rating: 4.4, reviews: 178000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Asana", installs: "5.2M+" },
  { id: "trello", name: "Trello", description: "Visual project management with Kanban boards, cards, and power-ups.", category: "productivity", icon: "📌", rating: 4.3, reviews: 234000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Atlassian", installs: "7.8M+" },
  { id: "monday-com", name: "Monday.com", description: "Work OS with customizable workflows, automations, and team collaboration.", category: "productivity", icon: "📊", rating: 4.4, reviews: 145000, pricing: "$9/seat/mo", pricingType: "subscription", badge: "popular", developer: "Monday.com", installs: "4.6M+" },
  { id: "clickup", name: "ClickUp", description: "Everything app for work: tasks, docs, goals, whiteboards, and time tracking.", category: "productivity", icon: "✅", rating: 4.5, reviews: 156000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "ClickUp", installs: "5.4M+" },
  { id: "todoist", name: "Todoist", description: "Simple yet powerful task manager with natural language input and smart scheduling.", category: "productivity", icon: "☑️", rating: 4.6, reviews: 189000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Doist", installs: "6.2M+" },
  { id: "obsidian", name: "Obsidian", description: "Knowledge base and note-taking with bidirectional linking and local-first storage.", category: "productivity", icon: "💎", rating: 4.8, reviews: 78200, pricing: "Free", pricingType: "free", badge: "trending", developer: "Obsidian", installs: "2.8M+" },
  { id: "airtable", name: "Airtable", description: "Spreadsheet-database hybrid with views, automations, and app building.", category: "productivity", icon: "🗃️", rating: 4.5, reviews: 123000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Airtable", installs: "4.2M+" },
  { id: "calendly", name: "Calendly", description: "Scheduling automation with calendar sync, team scheduling, and routing.", category: "productivity", icon: "📅", rating: 4.6, reviews: 167000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Calendly", installs: "5.8M+" },
  { id: "loom", name: "Loom", description: "Async video messaging for screen recordings, walkthroughs, and team updates.", category: "productivity", icon: "🎥", rating: 4.7, reviews: 98400, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Atlassian", installs: "3.4M+" },
  { id: "miro", name: "Miro", description: "Collaborative whiteboard for brainstorming, diagramming, and design sprints.", category: "productivity", icon: "🎨", rating: 4.5, reviews: 112000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Miro", installs: "3.8M+" },
  { id: "figma", name: "Figma", description: "Collaborative design tool for UI/UX with prototyping, dev mode, and design systems.", category: "productivity", icon: "🎨", rating: 4.8, reviews: 234000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Figma", installs: "8.2M+" },
  { id: "excalidraw", name: "Excalidraw", description: "Virtual whiteboard with hand-drawn style for diagrams and visual collaboration.", category: "productivity", icon: "✏️", rating: 4.7, reviews: 34200, pricing: "Free", pricingType: "free", badge: "trending", developer: "Excalidraw", installs: "1.4M+" },

  // ── Automation (16) ──
  { id: "zapier", name: "Zapier", description: "Connect 6000+ apps with no-code automations, multi-step zaps, and AI actions.", category: "automation", icon: "⚡", rating: 4.5, reviews: 178000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "Zapier", installs: "6.2M+" },
  { id: "n8n", name: "n8n", description: "Open-source workflow automation with visual editor and self-hosting option.", category: "automation", icon: "🔗", rating: 4.7, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "n8n", installs: "1.4M+" },
  { id: "make", name: "Make", description: "Visual automation platform with drag-and-drop scenarios and 1500+ app integrations.", category: "automation", icon: "🔧", rating: 4.6, reviews: 67800, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Make", installs: "2.8M+" },
  { id: "pipedream", name: "Pipedream", description: "Developer-first automation with code steps, APIs, and serverless execution.", category: "automation", icon: "🔀", rating: 4.5, reviews: 18900, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Pipedream", installs: "780K+" },
  { id: "temporal", name: "Temporal", description: "Durable execution platform for reliable microservices and workflow orchestration.", category: "automation", icon: "⏳", rating: 4.6, reviews: 12400, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Temporal", installs: "460K+" },
  { id: "trigger-dev", name: "Trigger.dev", description: "Open-source background jobs and workflow engine for TypeScript with retries.", category: "automation", icon: "🎯", rating: 4.5, reviews: 8700, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Trigger.dev", installs: "280K+" },
  { id: "inngest", name: "Inngest", description: "Event-driven serverless functions with built-in queuing, scheduling, and retries.", category: "automation", icon: "🌊", rating: 4.6, reviews: 6200, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Inngest", installs: "210K+" },
  { id: "github-actions", name: "GitHub Actions", description: "CI/CD automation built into GitHub with 15K+ community actions.", category: "automation", icon: "🐙", rating: 4.6, reviews: 145000, pricing: "Freemium", pricingType: "freemium", badge: "staff-pick", developer: "GitHub", installs: "5.8M+" },
  { id: "circleci", name: "CircleCI", description: "Cloud CI/CD with parallel testing, Docker layer caching, and orbs marketplace.", category: "automation", icon: "⭕", rating: 4.3, reviews: 45600, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "CircleCI", installs: "1.8M+" },
  { id: "bullmq", name: "BullMQ", description: "Redis-based queue for Node.js with job scheduling, retries, and concurrency.", category: "automation", icon: "🐂", rating: 4.5, reviews: 14200, pricing: "Free", pricingType: "free", badge: "popular", developer: "Taskforce.sh", installs: "620K+" },
  { id: "apache-airflow", name: "Apache Airflow", description: "Platform for programmatically authoring, scheduling, and monitoring data workflows.", category: "automation", icon: "🌬️", rating: 4.4, reviews: 56700, pricing: "Free", pricingType: "free", badge: "popular", developer: "Apache", installs: "2.4M+" },
  { id: "prefect", name: "Prefect", description: "Modern data workflow orchestration with Python-native API and real-time monitoring.", category: "automation", icon: "🔵", rating: 4.5, reviews: 12800, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Prefect", installs: "480K+" },
  { id: "windmill", name: "Windmill", description: "Open-source workflow engine and job scheduler with scripts in any language.", category: "automation", icon: "💨", rating: 4.4, reviews: 5400, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Windmill", installs: "180K+" },
  { id: "activepieces", name: "Activepieces", description: "Open-source no-code automation alternative to Zapier with self-hosting.", category: "automation", icon: "🧩", rating: 4.5, reviews: 7800, pricing: "Freemium", pricingType: "freemium", badge: "new", developer: "Activepieces", installs: "240K+" },
  { id: "huginn", name: "Huginn", description: "Self-hosted system for building agents that monitor and act on your behalf.", category: "automation", icon: "🦅", rating: 4.3, reviews: 4200, pricing: "Free", pricingType: "free", badge: null, developer: "Huginn", installs: "120K+" },
  { id: "automatisch", name: "Automatisch", description: "Open-source Zapier alternative with visual workflow builder and self-hosting.", category: "automation", icon: "🤖", rating: 4.2, reviews: 3100, pricing: "Free", pricingType: "free", badge: "new", developer: "Automatisch", installs: "95K+" },

  // ── Infrastructure (14) ──
  { id: "aws", name: "AWS", description: "The world's most comprehensive cloud platform with 200+ services.", category: "infrastructure", icon: "☁️", rating: 4.5, reviews: 345000, pricing: "Pay per use", pricingType: "paid", badge: "staff-pick", developer: "Amazon", installs: "12M+" },
  { id: "google-cloud", name: "Google Cloud", description: "Cloud computing with AI/ML, Kubernetes, BigQuery, and global infrastructure.", category: "infrastructure", icon: "🌐", rating: 4.5, reviews: 234000, pricing: "Pay per use", pricingType: "paid", badge: "popular", developer: "Google", installs: "8.4M+" },
  { id: "azure", name: "Azure", description: "Microsoft's cloud with enterprise services, hybrid solutions, and AI integration.", category: "infrastructure", icon: "🔵", rating: 4.4, reviews: 198000, pricing: "Pay per use", pricingType: "paid", badge: "popular", developer: "Microsoft", installs: "7.2M+" },
  { id: "digitalocean", name: "DigitalOcean", description: "Developer-friendly cloud with simple droplets, managed databases, and Kubernetes.", category: "infrastructure", icon: "🌊", rating: 4.6, reviews: 89200, pricing: "$5/mo", pricingType: "subscription", badge: "popular", developer: "DigitalOcean", installs: "3.6M+" },
  { id: "hetzner", name: "Hetzner", description: "European cloud hosting with unbeatable price-performance and bare metal servers.", category: "infrastructure", icon: "🇩🇪", rating: 4.7, reviews: 45600, pricing: "$3.79/mo", pricingType: "subscription", badge: "trending", developer: "Hetzner", installs: "1.8M+" },
  { id: "cloudflare-workers", name: "Cloudflare Workers", description: "Serverless execution on Cloudflare's global edge network with zero cold starts.", category: "infrastructure", icon: "⚡", rating: 4.6, reviews: 34200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Cloudflare", installs: "1.4M+" },
  { id: "redis", name: "Redis", description: "In-memory data store for caching, sessions, real-time analytics, and message queues.", category: "infrastructure", icon: "🔴", rating: 4.7, reviews: 123000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Redis", installs: "5.2M+" },
  { id: "postgresql", name: "PostgreSQL", description: "The world's most advanced open-source relational database with extensibility.", category: "infrastructure", icon: "🐘", rating: 4.8, reviews: 234000, pricing: "Free", pricingType: "free", badge: "staff-pick", developer: "PostgreSQL", installs: "9.6M+" },
  { id: "mongodb", name: "MongoDB", description: "Document database with flexible schemas, Atlas cloud, and full-text search.", category: "infrastructure", icon: "🍃", rating: 4.4, reviews: 167000, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "MongoDB", installs: "6.8M+" },
  { id: "elasticsearch", name: "Elasticsearch", description: "Distributed search and analytics engine for logs, metrics, and full-text search.", category: "infrastructure", icon: "🔎", rating: 4.5, reviews: 89400, pricing: "Freemium", pricingType: "freemium", badge: "popular", developer: "Elastic", installs: "3.4M+" },
  { id: "rabbitmq", name: "RabbitMQ", description: "Open-source message broker for reliable async messaging between services.", category: "infrastructure", icon: "🐰", rating: 4.4, reviews: 56700, pricing: "Free", pricingType: "free", badge: "popular", developer: "Broadcom", installs: "2.4M+" },
  { id: "minio", name: "MinIO", description: "S3-compatible object storage you can self-host for files, backups, and data lakes.", category: "infrastructure", icon: "💾", rating: 4.5, reviews: 28700, pricing: "Free", pricingType: "free", badge: "popular", developer: "MinIO", installs: "1.2M+" },
  { id: "upstash", name: "Upstash", description: "Serverless Redis and Kafka with pay-per-request pricing and global replication.", category: "infrastructure", icon: "🟢", rating: 4.6, reviews: 14200, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Upstash", installs: "620K+" },
  { id: "fly-io", name: "Fly.io", description: "Deploy app servers close to users with global edge hosting and Firecracker VMs.", category: "infrastructure", icon: "✈️", rating: 4.5, reviews: 21300, pricing: "Freemium", pricingType: "freemium", badge: "trending", developer: "Fly.io", installs: "780K+" },
]

/* ================================================================== */
/*  COLLECTIONS                                                        */
/* ================================================================== */

const COLLECTIONS = [
  { title: "Best Free Apps", description: "Top-rated tools that won't cost you a dime", ids: ["vscode", "ollama", "postgresql", "lets-encrypt", "cjdropshipping", "pirate-ship", "tawk-to", "obsidian"] },
  { title: "Essential Developer Stack", description: "The modern developer's toolkit", ids: ["github", "vscode", "docker", "vercel", "supabase", "prisma", "playwright", "turborepo"] },
  { title: "AI Powerhouse", description: "Cutting-edge artificial intelligence tools", ids: ["chatgpt", "claude-ai", "midjourney", "cursor-ai", "elevenlabs", "hugging-face", "copilot", "v0-dev"] },
  { title: "Marketing Must-Haves", description: "Drive traffic and convert visitors", ids: ["klaviyo", "omnisend", "smile-io", "hotjar", "google-ads-app", "facebook-pixel", "postscript", "referral-candy"] },
  { title: "Security Essentials", description: "Protect your business and customers", ids: ["cloudflare", "clerk", "1password", "lets-encrypt", "trivy", "turnstile", "snyk", "rewind-backups"] },
]

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */

function formatReviews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K"
  return String(n)
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.3
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && half
                ? "fill-amber-400/50 text-amber-400"
                : "text-[#B8B8B0]"
          }
        />
      ))}
    </span>
  )
}

function PricingBadge({ type, label }: { type: PricingType; label: string }) {
  const colors: Record<PricingType, string> = {
    free: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    freemium: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    paid: "bg-[#C41A3B]/15 text-[#ff6b81] border-[#C41A3B]/20",
    subscription: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  }
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors[type]}`}>
      {label}
    </span>
  )
}

function AppBadge({ badge }: { badge: Badge }) {
  if (!badge) return null
  const config: Record<string, { label: string; cls: string }> = {
    "staff-pick": { label: "Staff Pick", cls: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
    trending: { label: "Trending", cls: "bg-rose-500/15 text-rose-400 border-rose-500/20" },
    new: { label: "New", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
    popular: { label: "Popular", cls: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
    "built-in": { label: "Built-in", cls: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
    verified: { label: "Verified", cls: "bg-white/10 text-white/70 border-white/10" },
  }
  const c = config[badge]
  if (!c) return null
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.cls}`}>
      {c.label}
    </span>
  )
}

/* ================================================================== */
/*  APP CARD                                                           */
/* ================================================================== */

function AppCard({ app, view }: { app: App; view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="group flex items-center gap-5 p-4 bg-white border border-black/[0.04] rounded-xl hover:border-black/[0.12] hover:bg-black/[0.03] transition-all duration-300">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.04] flex items-center justify-center text-2xl">
          {app.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-sm text-white truncate">{app.name}</h3>
            <AppBadge badge={app.badge} />
          </div>
          <p className="text-xs text-[#7A7A72] truncate">{app.description}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[#7A7A72]">{app.developer}</span>
            <span className="flex items-center gap-1">
              <RatingStars rating={app.rating} />
              <span className="text-[10px] text-[#7A7A72]">{app.rating}</span>
            </span>
            <span className="text-[10px] text-[#B8B8B0]">({formatReviews(app.reviews)})</span>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-3">
          <PricingBadge type={app.pricingType} label={app.pricing} />
          <button className="px-4 py-1.5 text-xs font-medium rounded-lg bg-black/[0.04] border border-black/[0.08] text-[#1A1A1A] hover:bg-[#C41A3B] hover:border-[#C41A3B] hover:text-white transition-all duration-300">
            Install
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col p-5 bg-white border border-black/[0.04] rounded-2xl hover:border-black/[0.12] hover:bg-black/[0.03] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-black/[0.03] border border-black/[0.04] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-300">
          {app.icon}
        </div>
        <AppBadge badge={app.badge} />
      </div>
      <h3 className="font-semibold text-sm text-white mb-1 group-hover:text-white transition-colors">{app.name}</h3>
      <p className="text-xs text-[#7A7A72] mb-1">{app.developer}</p>
      <p className="text-xs text-[#7A7A72] leading-relaxed mb-4 line-clamp-2 flex-1">{app.description}</p>
      <div className="flex items-center gap-1.5 mb-4">
        <RatingStars rating={app.rating} />
        <span className="text-[11px] text-[#7A7A72] font-medium">{app.rating}</span>
        <span className="text-[10px] text-[#B8B8B0]">({formatReviews(app.reviews)})</span>
      </div>
      <div className="flex items-center justify-between">
        <PricingBadge type={app.pricingType} label={app.pricing} />
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-black/[0.04] border border-black/[0.08] text-[#1A1A1A] hover:bg-[#C41A3B] hover:border-[#C41A3B] hover:text-white transition-all duration-300 group/btn">
          <Download size={12} />
          Install
        </button>
      </div>
      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-black/[0.04]">
        <Download size={10} className="text-[#B8B8B0]" />
        <span className="text-[10px] text-[#B8B8B0]">{app.installs} installs</span>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  FEATURED CARD (larger)                                             */
/* ================================================================== */

function FeaturedCard({ app }: { app: App }) {
  return (
    <div className="group flex-shrink-0 w-[320px] snap-start p-5 bg-white border border-black/[0.04] rounded-2xl hover:border-black/[0.12] hover:bg-black/[0.03] transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-black/[0.03] border border-black/[0.04] flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300">
          {app.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-white truncate">{app.name}</h3>
            <AppBadge badge={app.badge} />
          </div>
          <p className="text-xs text-[#7A7A72]">{app.developer}</p>
        </div>
      </div>
      <p className="text-sm text-[#7A7A72] leading-relaxed mb-4 line-clamp-2">{app.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RatingStars rating={app.rating} />
          <span className="text-xs text-[#7A7A72]">{app.rating}</span>
          <span className="text-[10px] text-[#B8B8B0]">({formatReviews(app.reviews)})</span>
        </div>
        <PricingBadge type={app.pricingType} label={app.pricing} />
      </div>
      <button className="mt-4 w-full py-2 text-sm font-medium rounded-lg bg-black/[0.04] border border-black/[0.08] text-[#1A1A1A] hover:bg-[#C41A3B] hover:border-[#C41A3B] hover:text-white transition-all duration-300">
        View App
      </button>
    </div>
  )
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

const ITEMS_PER_PAGE = 48

export default function AppStorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating" | "price">("popular")
  const [pricingFilter, setPricingFilter] = useState<PricingType | "all">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)

  /* ---- filtered + sorted apps ---- */
  const filteredApps = useMemo(() => {
    let apps = [...ALL_APPS]

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      apps = apps.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.developer.toLowerCase().includes(q) ||
          a.category.toLowerCase().replace(/-/g, " ").includes(q),
      )
    }

    // category
    if (selectedCategory) {
      apps = apps.filter((a) => a.category === selectedCategory)
    }

    // pricing
    if (pricingFilter !== "all") {
      apps = apps.filter((a) => a.pricingType === pricingFilter)
    }

    // sort
    switch (sortBy) {
      case "popular":
        apps.sort((a, b) => b.reviews - a.reviews)
        break
      case "newest":
        apps.sort((a, b) => {
          const bNew = b.badge === "new" ? 1 : 0
          const aNew = a.badge === "new" ? 1 : 0
          return bNew - aNew || b.reviews - a.reviews
        })
        break
      case "rating":
        apps.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        break
      case "price":
        {
          const order: Record<PricingType, number> = { free: 0, freemium: 1, paid: 2, subscription: 3 }
          apps.sort((a, b) => order[a.pricingType] - order[b.pricingType])
        }
        break
    }

    return apps
  }, [searchQuery, selectedCategory, pricingFilter, sortBy])

  const visibleApps = filteredApps.slice(0, visibleCount)
  const totalApps = 13247 // marketing number for the hero

  /* ---- curated sections ---- */
  const staffPicks = useMemo(
    () => ALL_APPS.filter((a) => a.badge === "staff-pick").slice(0, 8),
    [],
  )
  const trending = useMemo(
    () => ALL_APPS.filter((a) => a.badge === "trending").slice(0, 8),
    [],
  )
  const newApps = useMemo(
    () => ALL_APPS.filter((a) => a.badge === "new").slice(0, 4),
    [],
  )

  return (
    <>
      <Navbar />
      <Breadcrumb items={[{ label: "App Store" }]} />

      <main className="min-h-screen pt-20" style={{ background: "#F8F7F4" }}>
        {/* ============================================================ */}
        {/*  HERO                                                         */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden border-b border-black/[0.04]">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C41A3B]/[0.04] rounded-full blur-[120px]" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.03] border border-black/[0.04] text-xs text-[#7A7A72] mb-8">
                <Sparkles size={14} className="text-[#C41A3B]" />
                Powering 13,000+ businesses worldwide
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic leading-[0.92] tracking-tight mb-6" style={{ color: "#1A1A1A" }}>
                9Ruby{" "}
                <span style={{ color: "#7A7A72" }}>App Store</span>
              </h1>

              <p className="text-lg md:text-xl text-[#7A7A72] leading-relaxed mb-10 max-w-2xl mx-auto">
                {totalApps.toLocaleString()} apps to supercharge your business. Find everything from AI tools and marketing to developer infrastructure and automation.
              </p>

              {/* Search bar */}
              <div className="relative max-w-2xl mx-auto mb-12">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B8B8B0]" />
                <input
                  type="text"
                  placeholder="Search apps, integrations, and tools..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setVisibleCount(ITEMS_PER_PAGE)
                  }}
                  className="w-full pl-14 pr-5 py-4 bg-black/[0.03] border border-black/[0.08] rounded-2xl text-white placeholder:text-[#B8B8B0] focus:outline-none focus:border-white/[0.15] focus:bg-black/[0.04] transition-all duration-300 text-base backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#B8B8B0] hover:text-[#7A7A72] transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 md:gap-14">
                {[
                  { value: "13,247", label: "Apps" },
                  { value: "16", label: "Categories" },
                  { value: "4.6", label: "Avg Rating" },
                  { value: "210M+", label: "Installs" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white font-mono">{s.value}</div>
                    <div className="text-xs text-[#7A7A72] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CATEGORY QUICK NAV                                           */}
        {/* ============================================================ */}
        <section className="border-b border-black/[0.04] bg-white/50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: "none" }}>
              <button
                onClick={() => { setSelectedCategory(null); setVisibleCount(ITEMS_PER_PAGE) }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  !selectedCategory
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#F8F7F4]"
                    : "bg-white border-black/[0.04] text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.1]"
                }`}
              >
                All Apps
              </button>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                      setVisibleCount(ITEMS_PER_PAGE)
                    }}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                      selectedCategory === cat.id
                        ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#F8F7F4]"
                        : "bg-white border-black/[0.04] text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.1]"
                    }`}
                  >
                    <Icon size={13} />
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  STAFF PICKS                                                  */}
        {/* ============================================================ */}
        {!searchQuery && !selectedCategory && (
          <>
            <section className="border-b border-black/[0.04]">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-amber-400" />
                      <h2 className="text-xl font-serif text-[#1A1A1A]">Staff Picks</h2>
                    </div>
                    <p className="text-sm text-[#7A7A72]">Hand-selected by the 9Ruby team</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-[#7A7A72] hover:text-white/70 transition-colors">
                    View all <ArrowRight size={14} />
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                  {staffPicks.map((app) => (
                    <FeaturedCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/*  TRENDING THIS WEEK                                          */}
            {/* ============================================================ */}
            <section className="border-b border-black/[0.04]">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-rose-400" />
                      <h2 className="text-xl font-serif text-[#1A1A1A]">Trending This Week</h2>
                    </div>
                    <p className="text-sm text-[#7A7A72]">The fastest-growing apps right now</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-[#7A7A72] hover:text-white/70 transition-colors">
                    View all <ArrowRight size={14} />
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                  {trending.map((app) => (
                    <FeaturedCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/*  NEW & NOTEWORTHY                                            */}
            {/* ============================================================ */}
            <section className="border-b border-black/[0.04]">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={16} className="text-emerald-400" />
                      <h2 className="text-xl font-serif text-[#1A1A1A]">New & Noteworthy</h2>
                    </div>
                    <p className="text-sm text-[#7A7A72]">Fresh arrivals worth checking out</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {newApps.map((app) => (
                    <AppCard key={app.id} app={app} view="grid" />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/*  MAIN APP GRID WITH SIDEBAR                                   */}
        {/* ============================================================ */}
        <section className="border-b border-black/[0.04]" id="browse">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-serif text-white mb-1">
                  {selectedCategory
                    ? CATEGORIES.find((c) => c.id === selectedCategory)?.name || "All Apps"
                    : searchQuery
                      ? `Search results for "${searchQuery}"`
                      : "Browse All Apps"}
                </h2>
                <p className="text-sm text-[#7A7A72]">
                  Showing {Math.min(visibleCount, filteredApps.length)} of{" "}
                  {filteredApps.length < ALL_APPS.length
                    ? filteredApps.length
                    : totalApps.toLocaleString()}{" "}
                  apps
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              {/* ---- SIDEBAR ---- */}
              <aside className="hidden lg:block w-56 flex-shrink-0">
                <div className="sticky top-28">
                  <h3 className="text-xs font-semibold text-[#B8B8B0] uppercase tracking-wider mb-4">Categories</h3>
                  <nav className="space-y-0.5">
                    <button
                      onClick={() => { setSelectedCategory(null); setVisibleCount(ITEMS_PER_PAGE) }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        !selectedCategory
                          ? "bg-[#C41A3B]/10 text-[#ff6b81] border border-[#C41A3B]/20"
                          : "text-[#7A7A72] hover:text-[#1A1A1A] hover:bg-white border border-transparent"
                      }`}
                    >
                      <span>All Apps</span>
                      <span className="text-xs text-[#B8B8B0]">{ALL_APPS.length}</span>
                    </button>
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon
                      const count = ALL_APPS.filter((a) => a.category === cat.id).length
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                            setVisibleCount(ITEMS_PER_PAGE)
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            selectedCategory === cat.id
                              ? "bg-[#C41A3B]/10 text-[#ff6b81] border border-[#C41A3B]/20"
                              : "text-[#7A7A72] hover:text-[#1A1A1A] hover:bg-white border border-transparent"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Icon size={14} />
                            {cat.name}
                          </span>
                          <span className="text-xs text-[#B8B8B0]">{count}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </aside>

              {/* ---- MOBILE SIDEBAR TOGGLE ---- */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#C41A3B] text-white shadow-lg shadow-[#C41A3B]/20"
              >
                <Filter size={20} />
              </button>

              {/* ---- MOBILE SIDEBAR OVERLAY ---- */}
              {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
                  <div
                    className="absolute left-0 top-0 bottom-0 w-72 bg-black border-r border-black/[0.04] p-6 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-semibold text-[#1A1A1A]">Categories</h3>
                      <button onClick={() => setSidebarOpen(false)} className="text-[#7A7A72] hover:text-[#1A1A1A]">
                        <X size={20} />
                      </button>
                    </div>
                    <nav className="space-y-0.5">
                      <button
                        onClick={() => { setSelectedCategory(null); setSidebarOpen(false); setVisibleCount(ITEMS_PER_PAGE) }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          !selectedCategory ? "bg-[#C41A3B]/10 text-[#ff6b81]" : "text-[#7A7A72] hover:text-[#1A1A1A]"
                        }`}
                      >
                        <span>All Apps</span>
                        <span className="text-xs text-[#B8B8B0]">{ALL_APPS.length}</span>
                      </button>
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon
                        const count = ALL_APPS.filter((a) => a.category === cat.id).length
                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                              setSidebarOpen(false)
                              setVisibleCount(ITEMS_PER_PAGE)
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                              selectedCategory === cat.id
                                ? "bg-[#C41A3B]/10 text-[#ff6b81]"
                                : "text-[#7A7A72] hover:text-[#1A1A1A]"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon size={14} />
                              {cat.name}
                            </span>
                            <span className="text-xs text-[#B8B8B0]">{count}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </div>
                </div>
              )}

              {/* ---- CONTENT ---- */}
              <div className="flex-1 min-w-0">
                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => { setSortOpen(!sortOpen); setPricingOpen(false) }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.04] rounded-lg text-xs text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.1] transition-all"
                    >
                      Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                      <ChevronDown size={13} />
                    </button>
                    {sortOpen && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-black border border-black/[0.08] rounded-xl overflow-hidden z-20 shadow-xl">
                        {(["popular", "newest", "rating", "price"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => { setSortBy(s); setSortOpen(false) }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                              sortBy === s
                                ? "bg-[#C41A3B]/10 text-[#ff6b81]"
                                : "text-[#7A7A72] hover:bg-black/[0.03] hover:text-[#1A1A1A]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {sortBy === s && <Check size={12} />}
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => { setPricingOpen(!pricingOpen); setSortOpen(false) }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.04] rounded-lg text-xs text-[#7A7A72] hover:text-[#1A1A1A] hover:border-black/[0.1] transition-all"
                    >
                      Pricing: {pricingFilter === "all" ? "All" : pricingFilter.charAt(0).toUpperCase() + pricingFilter.slice(1)}
                      <ChevronDown size={13} />
                    </button>
                    {pricingOpen && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-black border border-black/[0.08] rounded-xl overflow-hidden z-20 shadow-xl">
                        {(["all", "free", "freemium", "paid", "subscription"] as const).map((p) => (
                          <button
                            key={p}
                            onClick={() => { setPricingFilter(p); setPricingOpen(false); setVisibleCount(ITEMS_PER_PAGE) }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                              pricingFilter === p
                                ? "bg-[#C41A3B]/10 text-[#ff6b81]"
                                : "text-[#7A7A72] hover:bg-black/[0.03] hover:text-[#1A1A1A]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {pricingFilter === p && <Check size={12} />}
                              {p === "all" ? "All" : p.charAt(0).toUpperCase() + p.slice(1)}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1" />

                  {/* View toggle */}
                  <div className="flex items-center bg-white border border-black/[0.04] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid" ? "bg-white/[0.08] text-[#1A1A1A]" : "text-[#B8B8B0] hover:text-[#7A7A72]"
                      }`}
                    >
                      <Grid3x3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 transition-colors ${
                        viewMode === "list" ? "bg-white/[0.08] text-[#1A1A1A]" : "text-[#B8B8B0] hover:text-[#7A7A72]"
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>

                {/* Close dropdowns on outside click */}
                {(sortOpen || pricingOpen) && (
                  <div className="fixed inset-0 z-10" onClick={() => { setSortOpen(false); setPricingOpen(false) }} />
                )}

                {/* App grid / list */}
                {filteredApps.length === 0 ? (
                  <div className="text-center py-20">
                    <Search size={48} className="mx-auto text-[#B8B8B0] mb-4" />
                    <h3 className="text-lg font-semibold text-[#7A7A72] mb-2">No apps found</h3>
                    <p className="text-sm text-white/35">Try adjusting your search or filters</p>
                    <button
                      onClick={() => { setSearchQuery(""); setSelectedCategory(null); setPricingFilter("all") }}
                      className="mt-4 px-5 py-2 text-sm rounded-lg bg-black/[0.04] border border-black/[0.08] text-[#7A7A72] hover:text-white hover:border-black/[0.12] transition-all"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {visibleApps.map((app) => (
                      <AppCard key={app.id} app={app} view="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {visibleApps.map((app) => (
                      <AppCard key={app.id} app={app} view="list" />
                    ))}
                  </div>
                )}

                {/* Load more */}
                {visibleCount < filteredApps.length && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                      className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-xl bg-black/[0.03] border border-black/[0.08] text-white/70 hover:bg-[#C41A3B] hover:border-[#C41A3B] hover:text-white transition-all duration-300"
                    >
                      Load More Apps
                      <ChevronDown size={16} />
                    </button>
                    <p className="text-xs text-[#B8B8B0] mt-3">
                      Showing {Math.min(visibleCount, filteredApps.length)} of{" "}
                      {filteredApps.length < ALL_APPS.length ? filteredApps.length : totalApps.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  EXPLORE COLLECTIONS                                          */}
        {/* ============================================================ */}
        {!searchQuery && !selectedCategory && (
          <section className="border-b border-black/[0.04]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
              <div className="mb-10">
                <h2 className="text-xl font-serif text-white mb-2">Explore Collections</h2>
                <p className="text-sm text-[#7A7A72]">Curated app bundles for every use case</p>
              </div>

              <div className="space-y-12">
                {COLLECTIONS.map((collection) => (
                  <div key={collection.title}>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-base font-semibold text-white mb-0.5">{collection.title}</h3>
                        <p className="text-xs text-[#7A7A72]">{collection.description}</p>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-[#7A7A72] hover:text-white/70 transition-colors">
                        See all <ChevronRight size={13} />
                      </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                      {collection.ids.map((id) => {
                        const app = ALL_APPS.find((a) => a.id === id)
                        if (!app) return null
                        return (
                          <div key={app.id} className="flex-shrink-0 w-[260px]">
                            <AppCard app={app} view="grid" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/*  BUILD FOR 9RUBY — Developer CTA                              */}
        {/* ============================================================ */}
        <section className="border-b border-black/[0.04]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.04] bg-white p-10 lg:p-16">
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#C41A3B]/[0.06] rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[80px]" />
              </div>

              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C41A3B]/10 border border-[#C41A3B]/20 text-xs text-[#ff6b81] mb-6">
                    <Cpu size={12} />
                    Developer Program
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">
                    Build for <span className="gradient-text">9Ruby</span>
                  </h2>
                  <p className="text-base text-[#7A7A72] leading-relaxed mb-8">
                    Join 3,200+ developers building apps for 13,000+ merchants. Access our APIs, SDKs, and partner program to reach millions of businesses worldwide.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-[#C41A3B] text-white hover:brightness-110 transition-all ruby-btn-glow">
                      Start Building <ArrowRight size={16} />
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl bg-black/[0.03] border border-black/[0.08] text-white/70 hover:text-white hover:border-black/[0.12] transition-all">
                      <ExternalLink size={14} />
                      API Docs
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Globe, value: "13K+", label: "Merchants" },
                    { icon: Package, value: "210M+", label: "API Calls/mo" },
                    { icon: Users, value: "3.2K+", label: "Developers" },
                    { icon: Shield, value: "99.99%", label: "Uptime" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl bg-white border border-black/[0.04]">
                      <stat.icon size={20} className="text-[#C41A3B] mb-3" />
                      <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                      <div className="text-xs text-[#7A7A72] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  RESOURCES FOOTER                                             */}
        {/* ============================================================ */}
        <section className="border-b border-black/[0.04]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14">
            <h2 className="text-xl font-serif text-white mb-8">Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Globe, title: "Help Center", desc: "Get support for any app", href: "#" },
                { icon: Cpu, title: "API Documentation", desc: "Build with our APIs", href: "#" },
                { icon: Users, title: "Community", desc: "Join 8K+ developers", href: "#" },
                { icon: Briefcase, title: "Blog", desc: "Latest app updates", href: "#" },
                { icon: Sparkles, title: "Events", desc: "Webinars & meetups", href: "#" },
              ].map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  className="group p-5 rounded-2xl bg-white border border-black/[0.04] hover:border-black/[0.12] hover:bg-black/[0.03] transition-all duration-300"
                >
                  <resource.icon size={20} className="text-[#B8B8B0] group-hover:text-[#C41A3B] transition-colors mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-1">{resource.title}</h3>
                  <p className="text-xs text-[#7A7A72]">{resource.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
