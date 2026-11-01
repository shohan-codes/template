"use client"

import { SegmentedTabs, type TabItemData } from "@workspace/pattern"
import {
  RiGitBranchLine,
  RiGitCommitLine,
  RiGlobalLine,
  RiLoader4Line,
  RiArchiveStackLine,
  RiTimeLine,
  RiExternalLinkLine,
} from "@remixicon/react"

const filterItems: readonly TabItemData[] = [
  {
    id: "all",
    label: "All Projects",
    badge: (
      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/15 px-1 font-mono text-[10px] font-medium text-foreground">
        18
      </span>
    ),
    content: (
      <div className="w-full space-y-3 pt-2">
        {/* Project 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs transition-colors hover:border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-foreground">core-api</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Production
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1 font-mono">
                <RiGitBranchLine className="size-3" /> main
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <RiGitCommitLine className="size-3" /> f0eb301
              </span>
              <span>•</span>
              <span>Deployed 14m ago</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-end">
              <div className="text-[11px] font-medium text-foreground">99.98%</div>
              <div className="text-[10px] text-muted-foreground">42ms p95</div>
            </div>
            <a
              href="#visit"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              aria-label="Open core-api live domain"
            >
              <RiExternalLinkLine className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Project 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs transition-colors hover:border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-foreground">web-dashboard</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Production
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1 font-mono">
                <RiGitBranchLine className="size-3" /> main
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <RiGitCommitLine className="size-3" /> 8028f53
              </span>
              <span>•</span>
              <span>Deployed 2h ago</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-end">
              <div className="text-[11px] font-medium text-foreground">100%</div>
              <div className="text-[10px] text-muted-foreground">18ms p95</div>
            </div>
            <a
              href="#visit"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border/60 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              aria-label="Open web-dashboard live domain"
            >
              <RiExternalLinkLine className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Project 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs transition-colors hover:border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-foreground">billing-service</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                <RiLoader4Line className="size-2.5 animate-spin" />
                Building
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1 font-mono">
                <RiGitBranchLine className="size-3" /> feat/stripe-tax
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <RiGitCommitLine className="size-3" /> 7bf815b
              </span>
              <span>•</span>
              <span>Compiling edge functions</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 space-y-1 text-end">
              <div className="text-[10px] font-mono font-medium text-muted-foreground">72%</div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[72%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "active",
    label: "In Progress",
    badge: (
      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/15 px-1 font-mono text-[10px] font-medium text-foreground">
        3
      </span>
    ),
    content: (
      <div className="w-full space-y-3 pt-2">
        {/* Build 1 */}
        <div className="rounded-lg border border-border/70 bg-card p-4 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <RiLoader4Line className="size-4 animate-spin text-amber-500" />
                <span className="font-mono text-xs font-semibold text-foreground">billing-service</span>
                <span className="rounded bg-muted px-1.5 py-0.2 font-mono text-[10px] text-muted-foreground">
                  #build-904
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Step 3 of 4: Bundling serverless Lambdas and tree-shaking Prisma client
              </p>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <RiTimeLine className="size-3" /> 48s elapsed
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[72%] rounded-full bg-amber-500 transition-all duration-500" />
          </div>
        </div>

        {/* Build 2 */}
        <div className="rounded-lg border border-border/70 bg-card p-4 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <RiLoader4Line className="size-4 animate-spin text-amber-500" />
                <span className="font-mono text-xs font-semibold text-foreground">search-indexer</span>
                <span className="rounded bg-muted px-1.5 py-0.2 font-mono text-[10px] text-muted-foreground">
                  #build-903
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Compiling Rust WebAssembly vector similarity binary
              </p>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <RiTimeLine className="size-3" /> 1m 12s
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[45%] rounded-full bg-amber-500 transition-all duration-500" />
          </div>
        </div>

        {/* Build 3 */}
        <div className="rounded-lg border border-border/70 bg-card p-4 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <RiLoader4Line className="size-4 animate-spin text-amber-500" />
                <span className="font-mono text-xs font-semibold text-foreground">auth-worker</span>
                <span className="rounded bg-muted px-1.5 py-0.2 font-mono text-[10px] text-muted-foreground">
                  #build-902
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Executing Playwright end-to-end multi-tenant test matrix (34 of 42 passed)
              </p>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <RiTimeLine className="size-3" /> 2m 04s
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[81%] rounded-full bg-amber-500 transition-all duration-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "archived",
    label: "Archived",
    content: (
      <div className="w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/20 px-6 py-12 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <RiArchiveStackLine className="size-5" />
        </div>
        <h4 className="mt-3 text-sm font-semibold text-foreground">No archived deployments</h4>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          All active microservices and applications are healthy and handling ingress traffic.
          Archived repositories will be retained for 90 days.
        </p>
      </div>
    ),
  },
]

export default function SegmentedTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <SegmentedTabs $list={{ className: "mx-auto" }} items={filterItems} />
    </div>
  )
}
