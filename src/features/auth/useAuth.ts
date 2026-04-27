import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../../services/firebase";
import { mapFirebaseUser, useAuthStore } from "../../store/authStore";

interface UseAuthApi {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

function mapAuthError(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Try again.";
    case "auth/too-many-requests":
      return "Account temporarily locked. Reset your password.";
    case "auth/network-request-failed":
      return "Connection error. Check your network.";
    default:
      return "Unable to sign in right now. Please try again.";
  }
}

export function useAuth(): UseAuthApi {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const clearSession = useAuthStore((state) => state.logout);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(mapFirebaseUser(credential.user));
    } catch (error) {
      const code =
        error instanceof Error && "code" in error
          ? String(error.code)
          : "unknown";
      setError(mapAuthError(code));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      await signOut(auth);
      clearSession();
    } catch {
      setError("Unable to logout right now. Please try again.");
    }
  };

  return { login, logout };
}
