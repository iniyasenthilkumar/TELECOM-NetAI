import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Landing } from '@/pages/Landing';
import { SignIn } from '@/pages/auth/SignIn';
import { SignUp } from '@/pages/auth/SignUp';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Overview } from '@/pages/dashboard/Overview';
import { Incidents } from '@/pages/dashboard/Incidents';
import { IncidentDetails } from '@/pages/dashboard/IncidentDetails';
import { Alerts } from '@/pages/dashboard/Alerts';
import { Devices } from '@/pages/dashboard/Devices';
import { Runbooks } from '@/pages/dashboard/Runbooks';
import { Analytics } from '@/pages/dashboard/Analytics';
import { Settings } from '@/pages/dashboard/Settings';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="incidents/:id" element={<IncidentDetails />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="devices" element={<Devices />} />
        <Route path="runbooks" element={<Runbooks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
