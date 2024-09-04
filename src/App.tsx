import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardPage } from './components/DashboardPage';
import { TransactionsPage } from './components/TransactionsPage';
import { NovaTransacaoPage } from './components/transacoes/NovaTransacaoPage';
import { BanksPage } from './components/BanksPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage'; 

export function App() {
  return (
    <Router>
      <div className='bg-gray-100 lg:min-h-screen lg:w-full'>
        <div className='p-5 lg:h-screen'>
          <div className='lg:flex lg:flex-row'>
            <Header />
            <main className='lg:ml-5 lg:w-full lg:h-full'>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/transactions/new-transaction" element={<NovaTransacaoPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}
