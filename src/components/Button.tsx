import type { ButtonHTMLAttributes } from "react";

/** Visual variants for the shared button. */
export type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to "primary". */
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-bub hover:bg-brand-deep active:translate-y-px",
  secondary:
    "bg-card text-ink ring-2 ring-hairline hover:ring-brand/40 hover:text-brand",
  ghost: "bg-transparent text-muted hover:text-ink hover:bg-cream-deep",
};

/**
 * The shared MathBub button: a chunky rounded pill with consistent focus,
 * hover and disabled treatment across every variant.
 *
 * @param props - Standard button attributes plus an optional `variant`.
 * @param props.variant - The visual style ("primary" by default).
 * @param props.className - Additional classes appended to the variant classes.
 * @param props.type - The button type; defaults to "button".
 * @returns The styled button element.
 */
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 font-display text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    />
  );
}
