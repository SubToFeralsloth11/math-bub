import { Link } from "react-router-dom";

import type { ReactNode } from "react";

interface AppHeaderProps {
  /** Optional back link shown before the title. */
  back?: { to: string; label: string };
  /** Optional centre title (e.g. the current track name). */
  title?: string;
  /** Content shown on the right, typically the reward indicators. */
  right?: ReactNode;
}

/**
 * The shared top bar: the MathBub wordmark (linking home), an optional back link
 * and title, and a slot for the persistent reward indicators.
 *
 * @param props - The component props.
 * @param props.back - Optional back-link target and label.
 * @param props.title - Optional centre title.
 * @param props.right - Optional right-aligned content.
 * @returns The rendered header.
 */
export function AppHeader({ back, title, right }: Readonly<AppHeaderProps>) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-4">
      <div className="flex flex-1 items-center gap-3">
        {back ? (
          <Link
            to={back.to}
            className="text-sm text-muted transition hover:text-ink"
          >
            ← {back.label}
          </Link>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-ink"
          >
            <span aria-hidden>🫧</span> MathBub
          </Link>
        )}
      </div>
      {title ? (
        <h1 className="flex-1 text-center font-display text-lg font-semibold text-ink">
          {title}
        </h1>
      ) : null}
      <div className="flex flex-1 items-center justify-end gap-2">{right}</div>
    </header>
  );
}
