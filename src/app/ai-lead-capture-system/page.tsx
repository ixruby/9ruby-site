import SeoMoneyPageTemplate from "@/components/SeoMoneyPageTemplate"
import { seoMoneyPages } from "@/data/seo-money-pages"

const page = seoMoneyPages["ai-lead-capture-system"]

export const metadata = page.metadata

export default function Page() {
  return <SeoMoneyPageTemplate page={page} />
}
