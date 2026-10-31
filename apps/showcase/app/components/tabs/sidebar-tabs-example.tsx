"use client"

import { SidebarTabs, type TabItemData } from "@workspace/pattern"
import { Badge } from "@workspace/shadcn-ui"
import {
  RiUser3Line,
  RiBankCardLine,
  RiGroupLine,
  RiAppsLine,
} from "@remixicon/react"

const settingsItems: readonly TabItemData[] = [
  {
    id: "profile",
    label: "Profile & Identity",
    icon: <RiUser3Line className="size-4" />,
    content: (
      <div className="space-y-4 rounded-xl border p-5">
        <div>
          <h4 className="text-base font-semibold text-foreground">Personal Profile</h4>
          <p className="text-xs text-muted-foreground">
            Update your public persona, avatar, and contact email.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Connected as <span className="font-mono text-foreground">shakib@workspace.dev</span>
        </div>
      </div>
    ),
  },
  {
    id: "billing",
    label: "Billing & Plans",
    icon: <RiBankCardLine className="size-4" />,
    badge: (
      <Badge variant="outline" className="ms-auto text-[10px]">
        Pro
      </Badge>
    ),
    content: (
      <div className="space-y-4 rounded-xl border p-5">
        <div>
          <h4 className="text-base font-semibold text-foreground">Billing Overview</h4>
          <p className="text-xs text-muted-foreground">
            Active subscription: <strong className="text-foreground">Pro Team Plan</strong> ($20/seat/mo).
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Next invoice scheduled for December 1, 2026.
        </div>
      </div>
    ),
  },
  {
    id: "members",
    label: "Team Members",
    icon: <RiGroupLine className="size-4" />,
    badge: (
      <Badge variant="secondary" className="ms-auto text-[10px]">
        4
      </Badge>
    ),
    content: (
      <div className="space-y-4 rounded-xl border p-5">
        <div>
          <h4 className="text-base font-semibold text-foreground">Workspace Access</h4>
          <p className="text-xs text-muted-foreground">
            Collaborators with permissions to push to main branch and trigger deployments.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          4 of 10 seats currently utilized.
        </div>
      </div>
    ),
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <RiAppsLine className="size-4" />,
    content: (
      <div className="space-y-4 rounded-xl border p-5">
        <div>
          <h4 className="text-base font-semibold text-foreground">Connected Services</h4>
          <p className="text-xs text-muted-foreground">
            Sync GitHub repositories, Linear issue tracking, and Slack webhook alerts.
          </p>
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
