import { AuthUser } from "@/types/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (userData: AuthUser | null) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user_session", JSON.stringify(userData));
      if (userData.token) {
        localStorage.setItem("auth_token", userData.token);
      }
    } else {
      localStorage.removeItem("user_session");
      localStorage.removeItem("auth_token");
    }
  };

  const logout = () => {
    setUser(null);
    window.location.href = "/entrar";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_session");

    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao parsear usuário", error);
        localStorage.removeItem("user_session");
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        loading,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
