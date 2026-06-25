import { Link } from "react-router-dom";

interface NotFoundProps {
  /** The heading describing what was not found. */
  title: string;
  /** Optional supporting message. */
  message?: string;
}

/**
 * A kind, centred "not found" screen with a route back home, used when a route
 * references content that does not exist (FR-028).
 *
 * @param props - The component props.
 * @param props.title - The heading text.
 * @param props.message - Optional supporting message.
 * @returns The rendered not-found screen.
 */
export function NotFound({ title, message }: Readonly<NotFoundProps>) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="text-4xl" aria-hidden>
        🔍
      </div>
      <h1 className="text-2xl text-ink">{title}</h1>
      {message ? <p className="text-muted">{message}</p> : null}
      <Link
        to="/"
        className="rounded-pill bg-brand px-6 py-3 font-display font-semibold text-white shadow-bub transition hover:bg-brand-deep"
      >
        Back home
      </Link>
    </div>
  );
}
