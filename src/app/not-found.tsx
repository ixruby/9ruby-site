import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-6 min-h-screen">
        <span className="font-mono text-sm text-white/30 mb-6">404</span>
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-4">
          Page not found
        </h1>
        <p className="text-white/50 text-lg mb-10 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-8 h-12 hover:bg-white/90 transition-all"
        >
          Back to home
        </Link>
      </section>
      <Footer />
    </main>
  )
}
