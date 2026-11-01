"use client"

import { Tabs, type TabItemData } from "@workspace/pattern"
import { RiUserLine, RiLockLine, RiNotification3Line, RiShieldCheckLine } from "@remixicon/react"

const tabItems: readonly TabItemData[] = [
  {
    id: "account",
    label: "Account",
    icon: <RiUserLine className="size-4" />,
    content: (
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 text-sm shadow-2xs">
        <div>
          <h4 className="font-semibold text-foreground">General Account Information</h4>
          <p className="text-xs text-muted-foreground">
            Update your public profile handle and team alias.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Account Name</span>
            <input
              type="text"
              readOnly
              defaultValue="Shakib Hasan"
              className="w-full rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs text-foreground outline-none"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-foreground">Contact Email</span>
            <input
              type="email"
              readOnly
              defaultValue="shakib@antigravity.dev"
              className="w-full rounded-md border border-border/80 bg-background px-3 py-1.5 text-xs text-foreground outline-none"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "password",
    label: "Security",
    icon: <RiLockLine className="size-4" />,
    content: (
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 text-sm shadow-2xs">
        <div>
          <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
          <p className="text-xs text-muted-foreground">
            Secure your credentials with hardware WebAuthn keys and authenticator apps.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-3 text-xs">
          <div className="flex items-center gap-2.5">
            <RiShieldCheckLine className="size-5 text-emerald-500" />
            <div>
              <div className="font-medium text-foreground">TOTP Authenticator Active</div>
              <div className="text-[11px] text-muted-foreground">Last verified today at 11:42 PM</div>
            </div>
          </div>
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            Enabled
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "notifications",
    label: "Alerts",
    icon: <RiNotification3Line className="size-4" />,
    badge: (
      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/15 px-1 font-mono text-[10px] font-medium text-foreground">
        2
      </span>
    ),
    content: (
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 text-sm shadow-2xs">
        <div>
          <h4 className="font-semibold text-foreground">Notification Channels</h4>
          <p className="text-xs text-muted-foreground">
            Configure alert rules for infrastructure downtime and release updates.
          </p>
        </div>
        <div className="divide-y divide-border/60 rounded-lg border border-border/70 text-xs">
          <div className="flex items-center justify-between p-3">
            <div>
              <div className="font-medium text-foreground">Deployment Failures</div>
              <div className="text-[11px] text-muted-foreground">Immediate alerts via SMS and Discord webhook</div>
            </div>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Active</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <div className="font-medium text-foreground">Weekly Performance Digest</div>
              <div className="text-[11px] text-muted-foreground">Sent every Monday at 9:00 AM UTC</div>
            </div>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Active</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function DefaultTabsExample() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Tabs items={tabItems} />
    </div>
  )
}
