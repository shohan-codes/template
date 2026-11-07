import type { Metadata } from "next"
import Showcase from "./showcase"
export const metadata: Metadata = { title: "Command Palette" }
export default function Page() {
  return <Showcase />
}
