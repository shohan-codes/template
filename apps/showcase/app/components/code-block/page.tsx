import type { Metadata } from "next"
import Showcase from "./showcase"
export const metadata: Metadata = { title: "Code Block" }
export default function Page() {
  return <Showcase />
}
