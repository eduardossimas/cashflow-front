import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CashFlowPro from '../assets/CashFlowPro.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faChartLine, faDollarSign, faGear, faTableColumns, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('Dashboard'); // Estado para controlar o botão ativo
    const location = useLocation(); // Hook para obter a localização atual

    useEffect(() => {
        // Definir o botão ativo com base na URL atual
        if (location.pathname.includes('/reports')) {
            setActiveButton('Relatórios');
        } else if (location.pathname.includes('/transactions')) {
            setActiveButton('Transações');
        } else if (location.pathname.includes('/banks')) {
            setActiveButton('Bancos');
        } else if (location.pathname.includes('/settings')) {
            setActiveButton('Configurações');
        } else {
            setActiveButton('Dashboard');
        }
    }, [location.pathname]); // Executar o efeito sempre que a URL mudar

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const buttonBaseClass = 'flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg';
    const buttonMobileClass = 'flex items-center justify-center py-3 text-gray-800'; // Estilo simplificado para mobile

    return (
        <header className='top-0 left-0'>
            <div className='flex items-center'>
                <div className='flex'>
                    {!isMenuOpen && (
                        <div className='lg:hidden p-3'>
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

                <div className="hidden lg:flex flex-col space-y-4 rounded-lg bg-white shadow-xl pl-7 pt-6 pb-6 lg:h-[94vh]">
                    <div className='flex items-center justify-center mb-9 mt-2 pr-7'>
                        <img src={CashFlowPro} alt="Logo" className="w-44 h-9" />
                    </div>

                    <strong className='text-gray-700 mb-2 text-xs'>Geral</strong>

                    <Link to="/" className={`${buttonBaseClass} ${activeButton === 'Dashboard' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faTableColumns} />
                        <span className='ml-2'>Dashboard</span>
                    </Link>

                    <Link to="/transactions" className={`${buttonBaseClass} ${activeButton === 'Transações' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className='ml-2'>Transações</span>
                    </Link>

                    <Link to="/banks" className={`${buttonBaseClass} ${activeButton === 'Bancos' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                        <span className='ml-2'>Bancos</span>
                    </Link>

                    <Link to="/reports" className={`${buttonBaseClass} ${activeButton === 'Relatórios' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faChartLine} />
                        <span className='ml-2'>Relatórios</span>
                    </Link>

                    <strong className='text-gray-700 mb-2 mt-20 lg:pt-10 text-xs'>Suporte</strong>

                    <Link to="/settings" className={`${buttonBaseClass} ${activeButton === 'Configurações' ? 'bg-gradient-to-r from-orange-600 to-orange-300 text-white' : 'text-gray-700'}`}>
                        <FontAwesomeIcon icon={faGear} />
                        <span className='ml-2'>Configurações</span>
                    </Link>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full bg-white shadow-lg lg:hidden">
                    <div className="flex justify-between items-center px-4 py-3">
                        <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-600 focus:outline-none">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <img src={CashFlowPro} alt="Logo" className="w-44 h-9" />
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center space-x-4 py-4">
                        <Link to="/" className={buttonMobileClass}>
                            <FontAwesomeIcon icon={faTableColumns} />
                            <span className='ml-2'>Dashboard</span>
                        </Link>

                        <Link to="/transactions" className={buttonMobileClass}>
                            <FontAwesomeIcon icon={faDollarSign} />
                            <span className='ml-2'>Transações</span>
                        </Link>

                        <Link to="/banks" className={buttonMobileClass}>
                            <FontAwesomeIcon icon={faBuildingColumns} />
                            <span className='ml-2'>Bancos</span>
                        </Link>

                        <Link to="/reports" className={buttonMobileClass}>
                            <FontAwesomeIcon icon={faChartLine} />
                            <span className='ml-2'>Relatórios</span>
                        </Link>

                        <Link to="/settings" className={buttonMobileClass}>
                            <FontAwesomeIcon icon={faGear} />
                            <span className='ml-2'>Configurações</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
