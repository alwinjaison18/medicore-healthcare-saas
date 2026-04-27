import {
  ShieldCheck,
  ShieldEllipsis,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";

import { loginSchema, type LoginFormData } from "./authSchema";
import { useAuth } from "./useAuth";
import { Spinner } from "../../components/common/Spinner";
import { useAuthStore } from "../../store/authStore";

interface EmailInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string;
}

function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-text"
        htmlFor="email"
      >
        Clinical Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg bg-slate-50 px-3 py-2 text-sm text-text placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        placeholder="admin@medicore.com"
      />
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}

interface PasswordInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly visible: boolean;
  readonly onToggleVisible: () => void;
  readonly error?: string;
}

function PasswordInput({
  value,
  onChange,
  visible,
  onToggleVisible,
  error,
}: PasswordInputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-text"
        htmlFor="password"
      >
        Security Password
      </label>
      <div className="flex items-center rounded-lg bg-slate-50 pr-2 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg bg-transparent px-3 py-2 text-sm text-text placeholder:text-slate-400 focus:outline-none"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={onToggleVisible}
          className="rounded p-1 text-slate-500 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <ShieldEllipsis size={16} />
        </button>
      </div>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}

interface LoginButtonProps {
  readonly isSubmitting: boolean;
}

function LoginButton({ isSubmitting }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Authorizing...
        </span>
      ) : (
        "Authorize Access"
      )}
    </button>
  );
}

interface ErrorBannerProps {
  readonly message: string | null;
}

function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div
      className={[
        "overflow-hidden transition-all duration-300",
        message ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
      ].join(" ")}
      role="alert"
      aria-live="assertive"
    >
      {message ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          <TriangleAlert className="mt-0.5" size={16} />
          <p>{message}</p>
        </div>
      ) : null}
    </div>
  );
}

export function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const user = useAuthStore((state) => state.user);
  const storeError = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setError = useAuthStore((state) => state.setError);

  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading && !storeError) {
    return <Spinner fullScreen />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    try {
      await login(values.email, values.password);
      navigate("/dashboard", { replace: true });
    } catch {
      // Error is mapped and stored by useAuth.
    }
  });

  return (
    <main className="grid min-h-screen bg-surface lg:grid-cols-5">
      <section className="relative hidden overflow-hidden bg-primary p-10 text-white lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,150,199,0.22),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.18),transparent_44%)]" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            MediCore
          </p>
          <h1 className="mt-5 max-w-xl font-display text-5xl leading-tight">
            The Precision Ledger for Clinical Excellence.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate-200">
            Real-time operations, encrypted workflows, and reliable identity
            protection for every hospital shift.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.15em] text-accent">
              Compliance
            </p>
            <p className="mt-2 font-medium">
              HIPAA-aligned data handling across sessions.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.15em] text-accent">
              Security
            </p>
            <p className="mt-2 font-medium">
              Secure encrypted sign-in with session continuity.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10 lg:col-span-2">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card">
          <div className="flex items-center gap-2 text-accent">
            <Stethoscope size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Secure Gateway
            </p>
          </div>

          <h2 className="mt-3 font-display text-4xl text-primary">
            Secure Authorize
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in with your clinical account credentials.
          </p>

          <ErrorBanner message={storeError} />

          <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <EmailInput
                  value={field.value}
                  onChange={field.onChange}
                  error={formState.errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  value={field.value}
                  onChange={field.onChange}
                  visible={isPasswordVisible}
                  onToggleVisible={() =>
                    setIsPasswordVisible((current) => !current)
                  }
                  error={formState.errors.password?.message}
                />
              )}
            />

            <LoginButton isSubmitting={formState.isSubmitting || isLoading} />
          </form>

          <div className="mt-6 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-success" />
              <span>HIPAA-style secure workflow controls</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-success" />
              <span>Secure encrypted sign-in session</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
