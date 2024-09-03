import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { DashboardPage } from './components/DashboardPage';
import { TransactionsPage } from './components/TransactionsPage';
import { BanksPage } from './components/BanksPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage'; 

export function App() {
  return (
    <Router>
      <div className='bg-gray-100 min-h-screen'>
        <div className='p-5'>
          <div className='lg:flex'>
            <Header />
            <main className='lg:ml-5'>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}
