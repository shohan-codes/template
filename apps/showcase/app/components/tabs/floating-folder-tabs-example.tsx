"use client"

import { FolderTabs, type TabItemData } from "@workspace/pattern"
import {
  RiFileCodeLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiCheckboxCircleLine,
} from "@remixicon/react"

const floatingItems: readonly TabItemData[] = [
  {
    id: "schema",
    label: "schema.prisma",
    icon: <RiFileCodeLine className="size-4 text-emerald-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-mono text-xs font-semibold text-foreground">model User & Workspace</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Defines the relational data models, composite indexes, and foreign key relations
            enforcing tenant boundaries.
          </p>
        </div>

        <div className="divide-y divide-border/60 rounded-lg border border-border/70 font-mono text-xs">
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">users</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, email, role, workspaceId)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">UUID PK</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">workspaces</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, slug, name, plan)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Unique slug</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RiCheckboxCircleLine className="size-4 text-emerald-500" />
          <span>PostgreSQL 17 schema synchronized with Prisma Client</span>
        </div>
      </div>
    ),
  },
  {
    id: "migration",
    label: "20261031_init",
    icon: <RiDatabase2Line className="size-4 text-amber-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-mono text-xs font-semibold text-foreground">20261031_init / migration.sql</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Initial database migration script configuring schemas, constraints, and audit tables.
          </p>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/20 p-3 font-mono text-xs text-muted-foreground">
          <p>CREATE TABLE &quot;workspaces&quot; (&quot;id&quot; TEXT PRIMARY KEY, &quot;slug&quot; TEXT UNIQUE);</p>
          <p className="mt-1">CREATE TABLE &quot;users&quot; (&quot;id&quot; TEXT PRIMARY KEY, &quot;workspaceId&quot; TEXT REFERENCES &quot;workspaces&quot;(&quot;id&quot;));</p>
        </div>
      </div>
    ),
  },
  {
    id: "seed",
    label: "seed.ts",
    icon: <RiGitBranchLine className="size-4 text-sky-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-mono text-xs font-semibold text-foreground">seed.ts / Multi-Tenant Fixtures</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Populates test environments with realistic organizations, demo users, and role matrices.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card p-3 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Seeded Workspaces</span>
            <div className="font-mono text-xs font-semibold text-foreground">3 organizations</div>
            <p className="text-[10px] text-muted-foreground">Acme Corp, Cyberdyne, Stark Labs</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-3 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Seeded Accounts</span>
            <div className="font-mono text-xs font-semibold text-foreground">18 team members</div>
            <p className="text-[10px] text-muted-foreground">Owner, Admin, and Member roles</p>
          </div>
        </div>
      </div>
    ),
  },
]

export default function FloatingFolderTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <FolderTabs variant="floating" items={floatingItems} />
    </div>
  )
}
