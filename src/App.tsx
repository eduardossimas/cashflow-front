import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { DashboardPage } from './components/DashboardPage';
import { TransactionsPage } from './components/TransactionsPage';
import { NovaTransacaoPage } from './components/transacoes/NovaTransacaoPage';
import { BanksPage } from './components/BanksPage';
import { NovoBancoPage } from './components/banks/NovoBancoPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { NovoPlanoPag } from './components/options/NovoPlanoPag';
import { NovaCategoriaPag } from './components/options/NovaCategoriaPag';
import { LoginPage } from './components/login/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

function AppContent() {
  const location = useLocation(); // Hook para obter a localização atual

  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`bg-gray-100 lg:w-full min-h-screen ${isLoginPage ? '' : 'p-5'}`}>
      <div className={`lg:flex lg:flex-row`}>
        {!isLoginPage && (
          <div className='lg:fixed'>
            <Header />
          </div>
        )}
        <main className={`lg:w-full lg:h-full overflow-x-auto ${isLoginPage ? '' : 'lg:ml-64'}`}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/transactions/new-transaction" element={<NovaTransacaoPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/banks/new-bank" element={<NovoBancoPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/new-plan" element={<NovoPlanoPag />} />
                <Route path="/settings/new-category" element={<NovaCategoriaPag />} />
              </Route>
            </Routes>
          </AuthProvider>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}