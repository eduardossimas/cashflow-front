import { useState } from 'react';
import { Link } from 'react-router-dom';
import CashFlowPro from '../assets/CashFlowPro.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faChartLine, faDollarSign, faGear, faTableColumns, faBars } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('Dashboard'); // Estado para controlar o botão ativo

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleButtonClick = (buttonName : string): void => {
        setActiveButton(buttonName); // Atualiza o estado do botão ativo
    };

    const buttonBaseClass = 'flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg';

    return (
        <header className='top-0 left-0'>
            <div className='flex items-center'>
                <div className='flex'>
                    {!isMenuOpen && (
                        <div className='lg:hidden rounded-lg bg-white shadow-xl p-3'>
                            <button
                                onClick={toggleMenu}
                                className='text-gray-800 hover:text-gray-600 focus:outline-none'
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-end w-full lg:hidden'>
                    <img src={CashFlowPro} alt="Logo" className="w-44 h-9" />
                </div>

                <div className="hidden lg:flex flex-col space-y-4 rounded-lg bg-white shadow-xl pl-7 pt-6 pb-6">
                    <div className='flex items-center justify-center mb-9 mt-2 pr-7'>
                        <img src={CashFlowPro} alt="Logo" className="w-44 h-9" />
                    </div>

                    <strong className='text-gray-700 mb-2 text-xs'>Geral</strong>

                    <Link to="/" onClick={() => handleButtonClick('Dashboard')} className={`${buttonBaseClass} ${activeButton === 'Dashboard' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faTableColumns} />
                        <span className='ml-2'>Dashboard</span>
                    </Link>

                    <Link to="/transactions" onClick={() => handleButtonClick('Transações')} className={`${buttonBaseClass} ${activeButton === 'Transações' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className='ml-2'>Transações</span>
                    </Link>

                    <Link to="/banks" onClick={() => handleButtonClick('Bancos')} className={`${buttonBaseClass} ${activeButton === 'Bancos' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                        <span className='ml-2'>Bancos</span>
                    </Link>

                    <Link to="/reports" onClick={() => handleButtonClick('Relatórios')} className={`${buttonBaseClass} ${activeButton === 'Relatórios' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faChartLine} />
                        <span className='ml-2'>Relatórios</span>
                    </Link>

                    <strong className='text-gray-700 mb-2 mt-20 text-xs'>Suporte</strong>

                    <Link to="/settings" onClick={() => handleButtonClick('Configurações')} className={`${buttonBaseClass} ${activeButton === 'Configurações' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faGear} />
                        <span className='ml-2'>Configurações</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
