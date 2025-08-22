import { ReactNode } from "react";

export default function ErrorDisplay(props: { children: ReactNode }) {
  return <div style={{ color: "red" }}>{props.children}</div>;
}
