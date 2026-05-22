"use client"

import { Fragment } from "react"
import Link from "next/link"
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItemData {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <div className="breadcrumb-band border-b border-border bg-background">
      <ShadcnBreadcrumb className="mx-auto max-w-[1200px] px-6 pt-[88px] pb-2">
        <BreadcrumbList className="font-mono text-xs text-muted-foreground">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, index) => (
            <Fragment key={item.label}>
              <BreadcrumbSeparator className="text-muted-foreground/50" />
              <BreadcrumbItem>
                {item.href && index < items.length - 1 ? (
                  <BreadcrumbLink asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-foreground">{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    </div>
  )
}
