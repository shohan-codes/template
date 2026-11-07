import type { Metadata } from "next"
import Showcase from "./showcase"
export const metadata: Metadata = { title: "Navigation Menu" }
export default function Page() {
  return <Showcase />
}
