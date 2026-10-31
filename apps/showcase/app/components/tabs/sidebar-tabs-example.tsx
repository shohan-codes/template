"use client"

import { SidebarTabs, type TabItemData } from "@workspace/pattern"
import {
  RiUser3Line,
  RiBankCardLine,
  RiGroupLine,
  RiAppsLine,
  RiGithubFill,
  RiSlackLine,
  RiCheckLine,
  RiMailLine,
} from "@remixicon/react"

const settingsItems: readonly TabItemData[] = [
  {
    id: "profile",
    label: "Profile & Identity",
    icon: <RiUser3Line className="size-4" />,
    content: (
      <div className="space-y-5 rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Personal Information</h4>
          <p className="text-xs text-muted-foreground">
            Manage your personal profile details and contact preferences.
          </p>
        </div>

        {/* Profile Avatar Row */}
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
            SH
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-foreground">Shakib Hasan</div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>Fullstack Architect</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Display Name</label>
            <input
              type="text"
              readOnly
              defaultValue="Shakib Hasan"
              className="w-full rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Username</label>
            <input
              type="text"
              readOnly
              defaultValue="@shakib"
              className="w-full rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-ring"
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Work Email</label>
            <div className="relative">
              <input
                type="email"
                readOnly
                defaultValue="shakib@antigravity.dev"
                className="w-full rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-ring ps-8"
              />
              <RiMailLine className="absolute start-2.5 top-2 size-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "billing",
    label: "Billing & Plans",
    icon: <RiBankCardLine className="size-4" />,
    badge: (
      <span className="ms-auto rounded bg-primary/10 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-primary">
        PRO
      </span>
    ),
    content: (
      <div className="space-y-5 rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Subscription & Tier</h4>
          <p className="text-xs text-muted-foreground">
            Overview of your organization billing cycle and compute quotas.
          </p>
        </div>

        {/* Plan card */}
        <div className="rounded-lg border border-border/70 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-foreground">Pro Team License</span>
              <p className="text-[11px] text-muted-foreground">$40.00 / seat / month</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Seat Allocation</span>
              <span className="font-mono text-foreground">4 of 10 seats</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[40%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-10 items-center justify-center rounded border bg-background font-mono text-[10px] font-bold text-foreground">
              VISA
            </div>
            <div>
              <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
              <div className="text-[10px] text-muted-foreground">Expires 12/28</div>
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground">Next invoice: Dec 1, 2026</span>
        </div>
      </div>
    ),
  },
  {
    id: "members",
    label: "Team Members",
    icon: <RiGroupLine className="size-4" />,
    badge: (
      <span className="ms-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/15 px-1 font-mono text-[10px] font-medium text-foreground">
        4
      </span>
    ),
    content: (
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Collaborators</h4>
            <p className="text-xs text-muted-foreground">
              Users with direct repository commit and deployment privileges.
            </p>
          </div>
          <span className="rounded-md border border-border/60 bg-muted/30 px-2 py-1 text-[11px] font-medium text-foreground">
            4 Seats Active
          </span>
        </div>

        <div className="divide-y divide-border/60 rounded-lg border border-border/70">
          {[
            { name: "Shakib Hasan", email: "shakib@antigravity.dev", role: "Owner", tag: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
            { name: "Alex Rivera", email: "alex@antigravity.dev", role: "Admin", tag: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
            { name: "Sarah Chen", email: "sarah@antigravity.dev", role: "Developer", tag: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
            { name: "David Kim", email: "david@antigravity.dev", role: "Viewer", tag: "bg-muted text-muted-foreground" },
          ].map((m) => (
            <div key={m.email} className="flex items-center justify-between p-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-medium text-foreground">{m.name}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{m.email}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${m.tag}`}>
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <RiAppsLine className="size-4" />,
    content: (
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-2xs">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Connected Services</h4>
          <p className="text-xs text-muted-foreground">
            External platform webhooks and continuous integration triggers.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-xs">
            <div className="flex items-center gap-3">
              <RiGithubFill className="size-5 text-foreground" />
              <div>
                <div className="font-medium text-foreground">GitHub Enterprise</div>
                <div className="text-[10px] text-muted-foreground">14 repositories synced</div>
              </div>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
              <RiCheckLine className="size-3.5" /> Connected
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-xs">
            <div className="flex items-center gap-3">
              <RiSlackLine className="size-5 text-sky-500" />
              <div>
                <div className="font-medium text-foreground">Slack Webhooks</div>
                <div className="text-[10px] text-muted-foreground">#deployments channel alerts</div>
              </div>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
              <RiCheckLine className="size-3.5" /> Connected
            </span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function SidebarTabsExample() {
  return (
    <div className="w-full max-w-2xl">
      <SidebarTabs items={settingsItems} />
    </div>
  )
}
