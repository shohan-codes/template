"use client"

import { resolveSlots } from "../../utilities/resolve-slots"
import type {
  ComponentProps,
  ElementType,
  MouseEventHandler,
  ReactNode,
} from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@workspace/shadcn-ui/components/button"
import { DropdownMenuTrigger } from "@workspace/shadcn-ui"
import { cn } from "@workspace/shadcn-ui/lib/utils"
import { DropdownCore, type DropdownProps, type DropdownSlots } from "../core"
import { defaultDropdownSlots } from "./default-dropdown"

export type SplitDropdownSlots = DropdownSlots &
  Readonly<{
    Container: ElementType
    PrimaryAction: ElementType
  }>

function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("inline-flex max-w-full items-stretch", className)}
    />
  )
}

function PrimaryAction({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      {...props}
      className={cn("min-w-0 flex-1 rounded-r-none", className)}
    />
  )
}

function Trigger({
  children,
  ...props
}: ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger {...props} asChild>
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0"
      >
        {children}
      </Button>
    </DropdownMenuTrigger>
  )
}

export const splitDropdownSlots: SplitDropdownSlots = {
  ...defaultDropdownSlots,
  Container,
  PrimaryAction,
  Trigger,
}

export type SplitDropdownProps = Omit<
  DropdownProps,
  "trigger" | "$trigger" | "slots" | "defaultSlots"
> & {
  primaryAction: Readonly<{
    label: string
    icon?: ReactNode
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
  }>
  /** Accessible name for the secondary action menu. */
  menuLabel: string
  slots?: Partial<SplitDropdownSlots>
  defaultSlots?: SplitDropdownSlots
  $container?: Omit<ComponentProps<"div">, "children">
  $primary?: Omit<
    ComponentProps<typeof Button>,
    "children" | "asChild" | "disabled" | "onClick"
  >
  $trigger?: Omit<
    NonNullable<DropdownProps["$trigger"]>,
    "asChild" | "aria-label"
  >
}

/** Run a primary action directly, or open the separate menu for alternatives. */
export function SplitDropdown({
  primaryAction,
  menuLabel,
  defaultSlots = splitDropdownSlots,
  slots,
  $container,
  $primary,
  $trigger,
  ...props
}: SplitDropdownProps) {
  const P = resolveSlots(defaultSlots, slots)
  return (
    <P.Container role="group" aria-label={primaryAction.label} {...$container}>
      <P.PrimaryAction
        type="button"
        {...$primary}
        className={cn(
          props.items.length === 0 && "rounded-r-lg",
          $primary?.className
        )}
        disabled={primaryAction.disabled}
        onClick={primaryAction.onClick}
      >
        {primaryAction.icon}
        <span className="truncate">{primaryAction.label}</span>
      </P.PrimaryAction>
      <DropdownCore
        defaultSlots={P}
        {...props}
        trigger={<ChevronDown aria-hidden="true" />}
        $trigger={{ ...$trigger, "aria-label": menuLabel }}
      />
    </P.Container>
  )
}
