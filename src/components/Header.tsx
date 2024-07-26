import { useState } from 'react';

import CashFlowPro from '../assets/CashFlowPro.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faChartLine, faDollarSign, faGear, faTableColumns, faBars } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

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

                <div className="hidden lg:flex flex-col space-y-4 rounded-lg bg-white shadow-xl h-auto pl-7 pt-6 pb-6">
                    <div className='flex items-center justify-center mb-9 mt-2 pr-7'>
                        <img src={CashFlowPro} alt="Logo" className="w-44 h-9" />
                    </div>

                    <strong className='text-gray-700 mb-2 text-xs'>Geral</strong>

                    <button className='flex items-center justify-start bg-gradient-to-r from-orange-600 to-orange-300 pt-3 pb-3 pr-5 pl-5 rounded-l-lg text-white'>
                        <FontAwesomeIcon icon={faTableColumns} />
                        <span className='ml-2'>Dashboard</span>
                    </button>
                    <button className='flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg text-gray-700'>
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className='ml-2'>Transações</span>
                    </button>

                    <button className='flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg text-gray-700'>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                        <span className='ml-2'>Bancos</span>
                    </button>

                    <button className='flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg text-gray-700'>
                        <FontAwesomeIcon icon={faChartLine} />
                        <span className='ml-2'>Relatórios</span>
                    </button>

                    <strong className='text-gray-700 mb-2 mt-20 text-xs'>Suporte</strong>

                    <button className='flex items-center justify-start pt-3 pb-3 pr-5 pl-5 rounded-l-lg text-gray-700'>
                        <FontAwesomeIcon icon={faGear} />
                        <span className='ml-2'>Configurações</span>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-y-0 left-0 bg-orange-500 flex flex-col justify-start items-center w-16 space-y-4 pt-4">
                        <button onClick={toggleMenu} className='text-white'>
                            <FontAwesomeIcon icon={faTableColumns} size="lg" />
                        </button>
                        <button onClick={toggleMenu} className='text-white'>
                            <FontAwesomeIcon icon={faDollarSign} size="lg" />
                        </button>
                        <button onClick={toggleMenu} className='text-white'>
                            <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
                        </button>
                        <button onClick={toggleMenu} className='text-white'>
                            <FontAwesomeIcon icon={faChartLine} size="lg" />
                        </button>
                        <button onClick={toggleMenu} className='text-white'>
                            <FontAwesomeIcon icon={faGear} size="lg" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}
