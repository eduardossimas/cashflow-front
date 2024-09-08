import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardPage } from './components/DashboardPage';
import { TransactionsPage } from './components/TransactionsPage';
import { NovaTransacaoPage } from './components/transacoes/NovaTransacaoPage';
import { BanksPage } from './components/BanksPage';
import { NovoBancoPage } from './components/banks/NovoBancoPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage'; 
import { NovoPlanoPag } from './components/options/NovoPlanoPag';
import { NovaCategoriaPag } from './components/options/NovaCategoriaPag';

export function App() {
  return (
    <Router>
      <div className='bg-gray-100 lg:w-full min-h-screen'>
        <div className='p-5'>
          <div className='lg:flex lg:flex-row'>
            <Header />
            <main className='lg:ml-5 lg:w-full lg:h-full overflow-x-auto'>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/transactions/new-transaction" element={<NovaTransacaoPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/banks/new-bank" element={<NovoBancoPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/new-plan" element={<NovoPlanoPag />} />
                <Route path="/settings/new-category" element={<NovaCategoriaPag />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}
