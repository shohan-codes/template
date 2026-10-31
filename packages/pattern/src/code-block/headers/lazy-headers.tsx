import * as React from "react"

export const LazyTerminalHeader = React.lazy(() =>
  import("./terminal-header").then((m) => ({ default: m.TerminalHeader }))
)

export const LazyTabHeader = React.lazy(() =>
  import("./tab-header").then((m) => ({ default: m.TabHeader }))
)
