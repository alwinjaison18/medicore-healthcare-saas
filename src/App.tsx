import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { NotFoundPage } from "./components/common/NotFoundPage";
import { Spinner } from "./components/common/Spinner";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { auth, authPersistenceReady } from "./services/firebase";
import { mapFirebaseUser, useAuthStore } from "./store/authStore";

const LoginPage = lazy(() =>
  import("./features/auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const DashboardPage = lazy(() =>
  import("./features/dashboard/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const AnalyticsPage = lazy(() =>
  import("./features/analytics/AnalyticsPage").then((module) => ({
    default: module.AnalyticsPage,
  })),
);
const PatientsPage = lazy(() =>
  import("./features/patients/PatientsPage").then((module) => ({
    default: module.PatientsPage,
  })),
);
const PatientDetail = lazy(() =>
  import("./features/patients/PatientDetail").then((module) => ({
    default: module.PatientDetail,
  })),
);

const queryClient = new QueryClient();

function AuthBootstrap() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    setLoading(true);

    authPersistenceReady
      .then(() => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(mapFirebaseUser(user));
        });
      })
      .catch(() => {
        setError("Unable to initialize authentication. Please refresh.");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setError, setLoading, setUser]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      <BrowserRouter>
        <Suspense fallback={<Spinner fullScreen />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/:id" element={<PatientDetail />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
