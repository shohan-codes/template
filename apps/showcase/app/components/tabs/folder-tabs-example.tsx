"use client"

import { FolderTabs, type TabItemData } from "@workspace/pattern"
import { RiFileCodeLine, RiDatabase2Line, RiSeedlingLine } from "@remixicon/react"

const schemaItems: readonly TabItemData[] = [
  {
    id: "schema",
    label: "schema.prisma",
    icon: <RiFileCodeLine className="size-4 text-emerald-500" />,
    content: (
      <div className="space-y-2">
        <h5 className="font-mono text-xs font-semibold text-foreground">model User & Workspace</h5>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Defines the relational data models, composite indexes, and foreign key relations
          enforcing tenant boundaries.
        </p>
      </div>
    ),
  },
  {
    id: "migrations",
    label: "20261031_init",
    icon: <RiDatabase2Line className="size-4 text-amber-500" />,
    content: (
      <div className="space-y-2">
        <h5 className="font-mono text-xs font-semibold text-foreground">SQL Migration Script</h5>
        <p className="text-xs text-muted-foreground leading-relaxed">
          ALTER TABLE accounts ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE.
        </p>
      </div>
    ),
  },
  {
    id: "seeds",
    label: "seed.ts",
    icon: <RiSeedlingLine className="size-4 text-sky-500" />,
    content: (
      <div className="space-y-2">
        <h5 className="font-mono text-xs font-semibold text-foreground">Database Seeding</h5>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Generates mock demo organizations, demo team members, and role-based ACL permissions.
        </p>
      </div>
    ),
  },
]

export default function FolderTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <FolderTabs items={schemaItems} />
    </div>
  )
}

