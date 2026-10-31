"use client"

import { FolderTabs, type TabItemData } from "@workspace/pattern"
import {
  RiLayoutMasonryLine,
  RiDatabase2Line,
  RiShieldKeyholeLine,
} from "@remixicon/react"

const floatingItems: readonly TabItemData[] = [
  {
    id: "specs",
    label: "Architecture Specs",
    icon: <RiLayoutMasonryLine className="size-4 text-purple-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Distributed Edge Infrastructure</h4>
          <p className="text-xs text-muted-foreground">
            Multi-region cluster topology routing via Cloudflare Anycast with isolated edge workers.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/70 bg-card p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Gateway Protocol</span>
            <div className="font-mono text-xs font-semibold text-foreground">HTTP/3 + gRPC over QUIC</div>
            <p className="text-[11px] text-muted-foreground">Sub-millisecond TLS 1.3 handshake resumption</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-card p-3.5 space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Global Cache Layer</span>
            <div className="font-mono text-xs font-semibold text-foreground">Redis Cluster 7.4</div>
            <p className="text-[11px] text-muted-foreground">99.2% read hit ratio across 300+ PoPs</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "models",
    label: "Data Schemas",
    icon: <RiDatabase2Line className="size-4 text-amber-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Tenant Isolation Boundaries</h4>
          <p className="text-xs text-muted-foreground">
            Composite primary indexes enforcing organization security barriers.
          </p>
        </div>

        <div className="divide-y divide-border/60 rounded-lg border border-border/70 font-mono text-xs">
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">organizations</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(id, slug, tier, billing_status)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">12.4K</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <span className="font-semibold text-foreground">api_credentials</span>
              <span className="ms-2 text-[11px] text-muted-foreground">(key_id, org_id, scopes, expires_at)</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">84.1K</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "iam",
    label: "Compliance & IAM",
    icon: <RiShieldKeyholeLine className="size-4 text-emerald-500" />,
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Governance Verification</h4>
          <p className="text-xs text-muted-foreground">
            SOC2 Type II and HIPAA automated compliance controls.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3 text-xs">
            <div>
              <div className="font-medium text-foreground">Hardware MFA / WebAuthn</div>
              <div className="text-[11px] text-muted-foreground">FIDO2 key enforcement across admin roles</div>
            </div>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Enforced</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function FloatingFolderTabsExample() {
  return (
    <div className="w-full max-w-xl">
      <FolderTabs variant="floating" items={floatingItems} />
    </div>
  )
}
