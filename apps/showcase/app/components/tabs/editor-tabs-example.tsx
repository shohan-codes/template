"use client"

import { EditorTabs, type TabItemData } from "@workspace/pattern"
import {
  RiFileCodeLine,
  RiDatabase2Line,
  RiSeedlingLine,
  RiFileCopyLine,
  RiCheckLine,
} from "@remixicon/react"
import { useState } from "react"

export default function EditorTabsExample() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const editorItems: readonly TabItemData[] = [
    {
      id: "schema",
      label: "schema.prisma",
      icon: <RiFileCodeLine className="size-3.5 text-emerald-500" />,
      content: (
        <div className="flex flex-col bg-background font-mono text-xs">
          {/* Code Body */}
          <div className="overflow-x-auto p-4 leading-relaxed text-muted-foreground select-text">
            <div><span className="text-muted-foreground/60 select-none pe-4">01</span><span className="text-purple-400">datasource</span> <span className="text-foreground">db</span> &#123;</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">02</span>  <span className="text-foreground">provider</span> = <span className="text-emerald-400">&quot;postgresql&quot;</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">03</span>  <span className="text-foreground">url</span>      = <span className="text-sky-400">env</span>(<span className="text-emerald-400">&quot;DATABASE_URL&quot;</span>)</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">04</span>&#125;</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">05</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">06</span><span className="text-purple-400">model</span> <span className="text-amber-400 font-semibold">User</span> &#123;</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">07</span>  <span className="text-foreground">id</span>          <span className="text-sky-400">String</span>    <span className="text-purple-400">@id</span> <span className="text-sky-400">@default</span>(<span className="text-purple-400">uuid</span>())</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">08</span>  <span className="text-foreground">email</span>       <span className="text-sky-400">String</span>    <span className="text-purple-400">@unique</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">09</span>  <span className="text-foreground">name</span>        <span className="text-sky-400">String?</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">10</span>  <span className="text-foreground">role</span>        <span className="text-amber-400">Role</span>      <span className="text-sky-400">@default</span>(<span className="text-foreground">MEMBER</span>)</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">11</span>  <span className="text-foreground">workspaceId</span> <span className="text-sky-400">String</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">12</span>  <span className="text-foreground">workspace</span>   <span className="text-amber-400">Workspace</span> <span className="text-sky-400">@relation</span>(<span className="text-foreground">fields</span>: [<span className="text-foreground">workspaceId</span>], <span className="text-foreground">references</span>: [<span className="text-foreground">id</span>], <span className="text-foreground">onDelete</span>: <span className="text-purple-400">Cascade</span>)</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">13</span>  <span className="text-foreground">createdAt</span>   <span className="text-sky-400">DateTime</span>  <span className="text-sky-400">@default</span>(<span className="text-purple-400">now</span>())</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">14</span>&#125;</div>
          </div>

          {/* Editor Status Bar */}
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">Prisma</span>
              <span>•</span>
              <span>UTF-8</span>
              <span>•</span>
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln 14, Col 2</span>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleCopy("model User { ... }")}
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                title="Copy schema snippet"
              >
                {copied ? <RiCheckLine className="size-3 text-emerald-500" /> : <RiFileCopyLine className="size-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "migrations",
      label: "20261031_init.sql",
      icon: <RiDatabase2Line className="size-3.5 text-amber-500" />,
      content: (
        <div className="flex flex-col bg-background font-mono text-xs">
          <div className="overflow-x-auto p-4 leading-relaxed text-muted-foreground select-text">
            <div><span className="text-muted-foreground/60 select-none pe-4">01</span><span className="text-muted-foreground/50">-- Migration: 20261031_init (PostgreSQL dialect)</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">02</span><span className="text-purple-400">CREATE TYPE</span> <span className="text-emerald-400">&quot;Role&quot;</span> <span className="text-purple-400">AS ENUM</span> (<span className="text-amber-400">&apos;OWNER&apos;</span>, <span className="text-amber-400">&apos;ADMIN&apos;</span>, <span className="text-amber-400">&apos;MEMBER&apos;</span>);</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">03</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">04</span><span className="text-purple-400">CREATE TABLE</span> <span className="text-emerald-400">&quot;users&quot;</span> (</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">05</span>    <span className="text-foreground">&quot;id&quot;</span> <span className="text-sky-400">TEXT NOT NULL PRIMARY KEY</span>,</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">06</span>    <span className="text-foreground">&quot;email&quot;</span> <span className="text-sky-400">TEXT NOT NULL UNIQUE</span>,</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">07</span>    <span className="text-foreground">&quot;role&quot;</span> <span className="text-emerald-400">&quot;Role&quot;</span> <span className="text-purple-400">NOT NULL DEFAULT</span> <span className="text-amber-400">&apos;MEMBER&apos;</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">08</span>);</div>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">SQL Migration</span>
              <span>•</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln 8, Col 3</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "seeds",
      label: "seed.ts",
      icon: <RiSeedlingLine className="size-3.5 text-sky-500" />,
      content: (
        <div className="flex flex-col bg-background font-mono text-xs">
          <div className="overflow-x-auto p-4 leading-relaxed text-muted-foreground select-text">
            <div><span className="text-muted-foreground/60 select-none pe-4">01</span><span className="text-purple-400">import</span> &#123; <span className="text-amber-400">PrismaClient</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&quot;@prisma/client&quot;</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">02</span><span className="text-purple-400">const</span> <span className="text-foreground">prisma</span> = <span className="text-purple-400">new</span> <span className="text-amber-400">PrismaClient</span>()</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">03</span></div>
            <div><span className="text-muted-foreground/60 select-none pe-4">04</span><span className="text-purple-400">async function</span> <span className="text-sky-400 font-semibold">seed</span>() &#123;</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">05</span>  <span className="text-purple-400">const</span> <span className="text-foreground">org</span> = <span className="text-purple-400">await</span> <span className="text-foreground">prisma</span>.<span className="text-foreground">workspace</span>.<span className="text-sky-400">upsert</span>(&#123;</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">06</span>    <span className="text-foreground">where</span>: &#123; <span className="text-foreground">slug</span>: <span className="text-emerald-400">&quot;antigravity-hq&quot;</span> &#125;,</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">07</span>    <span className="text-foreground">update</span>: &#123;&#125;,</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">08</span>    <span className="text-foreground">create</span>: &#123; <span className="text-foreground">name</span>: <span className="text-emerald-400">&quot;Antigravity HQ&quot;</span>, <span className="text-foreground">slug</span>: <span className="text-emerald-400">&quot;antigravity-hq&quot;</span> &#125;,</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">09</span>  &#125;)</div>
            <div><span className="text-muted-foreground/60 select-none pe-4">10</span>&#125;</div>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">TypeScript</span>
              <span>•</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln 10, Col 2</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-xl">
      <EditorTabs items={editorItems} />
    </div>
  )
}
