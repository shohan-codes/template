import type { Metadata } from "next"
import Showcase from "./showcase"
export const metadata: Metadata = { title: "Dropdown" }
export default function Page() {
  return <Showcase />
}
