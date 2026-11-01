"use client"

import { Tabs, type TabItemData } from "@workspace/pattern"
import { Button } from "@workspace/shadcn-ui"
import { RiRefreshLine, RiDownloadLine, RiArrowUpLine } from "@remixicon/react"

const overviewItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="grid gap-3 pt-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs">
          <div className="text-[11px] text-muted-foreground">Total Ingress</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-foreground">2.84M</span>
            <span className="flex items-center text-[10px] font-medium text-emerald-500">
              <RiArrowUpLine className="size-3" /> +12.4%
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs">
          <div className="text-[11px] text-muted-foreground">Edge Latency (p95)</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-foreground">34ms</span>
            <span className="text-[10px] text-muted-foreground">Global CDN</span>
          </div>
        </div>
        <div className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs">
          <div className="text-[11px] text-muted-foreground">Cache Hit Ratio</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-foreground">96.8%</span>
            <span className="text-[10px] font-medium text-emerald-500">Optimal</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Traffic Sources",
    content: (
      <div className="space-y-2.5 pt-3">
        {[
          { source: "api.antigravity.dev (REST & GraphQL)", percentage: 64, reqs: "1.81M requests" },
          { source: "app.antigravity.dev (Web Dashboard)", percentage: 26, reqs: "738K requests" },
          { source: "cli.antigravity.dev (Developer Terminal)", percentage: 10, reqs: "284K requests" },
        ].map((t) => (
          <div key={t.source} className="rounded-lg border border-border/60 bg-card p-3 text-xs">
            <div className="flex justify-between font-mono">
              <span className="font-medium text-foreground">{t.source}</span>
              <span className="text-muted-foreground">{t.reqs}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${t.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "reports",
    label: "Audit Reports",
    content: (
      <div className="space-y-2 pt-3">
        {[
          { name: "OCT_2026_SOC2_COMPLIANCE_AUDIT.pdf", size: "2.4 MB", date: "Oct 31, 2026" },
          { name: "Q3_2026_SYSTEM_UPTIME_VERIFICATION.csv", size: "840 KB", date: "Oct 01, 2026" },
        ].map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 text-xs">
            <div>
              <div className="font-mono font-medium text-foreground">{r.name}</div>
              <div className="text-[11px] text-muted-foreground">{r.size} • Generated {r.date}</div>
            </div>
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 hover:bg-muted/60 hover:text-foreground cursor-pointer text-muted-foreground"
              aria-label={`Download ${r.name}`}
            >
              <RiDownloadLine className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    ),
  },
]

export default function LineTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Tabs
        variant="line"
        items={overviewItems}
        actions={
          <Button variant="ghost" size="xs" className="gap-1.5 text-xs text-muted-foreground">
            <RiRefreshLine className="size-3.5" />
            Refresh
          </Button>
        }
      />
    </div>
  )
}
