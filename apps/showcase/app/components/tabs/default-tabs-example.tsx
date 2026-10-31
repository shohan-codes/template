"use client"

import { Tabs, type TabItemData } from "@workspace/pattern"
import { Badge } from "@workspace/shadcn-ui"
import { RiUserLine, RiLockLine, RiNotification3Line } from "@remixicon/react"

const tabItems: readonly TabItemData[] = [
  {
    id: "account",
    label: "Account",
    icon: <RiUserLine className="size-4" />,
    content: (
      <div className="space-y-2 rounded-lg border p-4 text-sm">
        <h4 className="font-medium text-foreground">Account Settings</h4>
        <p className="text-muted-foreground">
          Manage your account profile, email addresses, and personal preferences.
        </p>
      </div>
    ),
  },
  {
    id: "password",
    label: "Password",
    icon: <RiLockLine className="size-4" />,
    content: (
      <div className="space-y-2 rounded-lg border p-4 text-sm">
        <h4 className="font-medium text-foreground">Password & Security</h4>
        <p className="text-muted-foreground">
          Change your password and configure multi-factor authentication.
        </p>
      </div>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <RiNotification3Line className="size-4" />,
    badge: (
      <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
        3
      </Badge>
    ),
    content: (
      <div className="space-y-2 rounded-lg border p-4 text-sm">
        <h4 className="font-medium text-foreground">Notification Preferences</h4>
        <p className="text-muted-foreground">
          Choose what email and push notifications you would like to receive.
        </p>
      </div>
    ),
  },
]

export default function DefaultTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <Tabs items={tabItems} />
    </div>
  )
}
