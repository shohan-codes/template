"use client"

import { FolderTabs, type TabItemData } from "@workspace/pattern"
import {
  RiFolder2Line,
  RiDatabase2Line,
  RiShieldCheckLine,
  RiCheckLine,
} from "@remixicon/react"

const folderItems: readonly TabItemData[] = [
  {
    id: "overview",
    label: "Project Specs",
    icon: <RiFolder2Line className="size-4 text-amber-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Next.js Monorepo Blueprint</h4>
          <p className="text-xs text-muted-foreground">
            Architecture guidelines and conventions for production multi-tenant applications.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Runtime Engine</span>
            <div className="font-mono text-xs font-semibold text-foreground">Node.js 22 LTS / Turbopack</div>
            <p className="text-[11px] text-muted-foreground">Full support for React Server Components</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Data Layer</span>
            <div className="font-mono text-xs font-semibold text-foreground">Prisma 6 + PostgreSQL 17</div>
            <p className="text-[11px] text-muted-foreground">Connection pooling via PgBouncer</p>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <RiCheckLine className="size-4 text-emerald-500" /> Automated CI/CD Pipelines
          </span>
          <span className="font-mono text-[10px]">main branch auto-deploy</span>
        </div>
      </div>
    ),
  },
  {
    id: "models",
    label: "Data Models",
    icon: <RiDatabase2Line className="size-4 text-purple-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Relational Schema Hierarchy</h4>
          <p className="text-xs text-muted-foreground">
            Strict row-level tenant boundary isolation mapped across relational entities.
          </p>
        </div>

        <div className="divide-y divide-border/60 rounded-lg border border-border/70 font-mono text-xs">
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">users</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, email, role, workspaceId)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">1.4M rows</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">workspaces</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, slug, name, plan)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">12.8K rows</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">audit_logs</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, actorId, action, timestamp)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">48.2M rows</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "security",
    label: "Security & IAM",
    icon: <RiShieldCheckLine className="size-4 text-emerald-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Identity & Governance</h4>
          <p className="text-xs text-muted-foreground">
            Zero-trust security compliance parameters and cryptographic key rotation.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 text-xs">
            <div>
              <div className="font-medium text-foreground">JWT Session Tokens (RS256)</div>
              <div className="text-[11px] text-muted-foreground">Rotates every 15 minutes with refresh rotation</div>
            </div>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Enforced</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 text-xs">
            <div>
              <div className="font-medium text-foreground">SOC2 Type II Audit Compliance</div>
              <div className="text-[11px] text-muted-foreground">Continuous monitoring by Drata automation</div>
            </div>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Compliant</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function FolderTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <FolderTabs items={folderItems} />
    </div>
  )
}
