import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  organization: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, organization: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'netsentry-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const signIn = (email: string, _password: string) => {
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const org = email.split('@')[1]?.split('.')[0] || 'Organization';
    const u: User = { name, email, organization: org.charAt(0).toUpperCase() + org.slice(1) };
    setUser(u);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const signUp = (name: string, email: string, organization: string, _password: string) => {
    const u: User = { name, email, organization };
    setUser(u);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
