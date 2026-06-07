import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Use the larger, more prominent shadow. */
  raised?: boolean;
}

/**
 * A rounded "bubble" surface used throughout MathBub for grouped content.
 *
 * @param props - Standard div attributes plus an optional `raised` flag.
 * @param props.raised - Whether to use the larger shadow.
 * @param props.className - Additional classes appended to the base classes.
 * @returns The styled card container.
 */
export function Card({
  raised = false,
  className = "",
  ...rest
}: Readonly<CardProps>) {
  return (
    <div
      className={`rounded-bub bg-card ring-1 ring-hairline ${raised ? "shadow-bub-lg" : "shadow-bub"} ${className}`}
      {...rest}
    />
  );
}
