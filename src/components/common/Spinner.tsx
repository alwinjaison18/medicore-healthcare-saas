export interface SpinnerProps {
  readonly fullScreen?: boolean;
}

export function Spinner({ fullScreen = false }: SpinnerProps) {
  const containerClass = fullScreen
    ? "flex min-h-screen items-center justify-center bg-surface"
    : "flex items-center justify-center";

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-accent" />
    </div>
  );
}
