import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FiltrosTransacao } from './FiltrosTransacao';

export function ListaTransacao() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Número de itens por página

    const transactions = [
        { description: 'Luz', value: 'R$ 100,00', category: 'Energia Elétrica', date: '03/09/2024', datePag: '03/09/2024', type: 'Saída', bank: 'Banco A' },
        { description: 'Receita de Vendas - Cartão', value: 'R$ 200,00', category: 'Depósitos', date: '02/09/2024', datePag: '03/09/2024', type: 'Entrada', bank: 'Banco B' },
        { description: 'Taxas Cartão', value: 'R$ 20,00', category: 'Taxas Cartão', date: '01/09/2024', datePag: '03/09/2024', type: 'Saída', bank: 'Banco B' },
        { description: 'Água', value: 'R$ 100,00', category: 'Água', date: '01/09/2024', datePag: '03/09/2024', type: 'Saída', bank: 'Banco A' },
        { description: 'Receita de Vendas - Cartão', value: 'R$ 200,00', category: 'Depósitos', date: '02/09/2024', datePag: '03/09/2024', type: 'Entrada', bank: 'Banco B' },
        { description: 'Receita de Vendas - Cartão', value: 'R$ 200,00', category: 'Depósitos', date: '02/09/2024', datePag: '03/09/2024', type: 'Entrada', bank: 'Banco B' },
        { description: 'Receita de Vendas - Cartão', value: 'R$ 200,00', category: 'Depósitos', date: '02/09/2024', datePag: '03/09/2024', type: 'Entrada', bank: 'Banco B' },
        { description: 'Receita de Vendas - Cartão', value: 'R$ 200,00', category: 'Depósitos', date: '02/09/2024', datePag: '03/09/2024', type: 'Entrada', bank: 'Banco B' },
        // Adicione mais transações se necessário
    ];

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Transações da página atual
    const currentTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Pesquisa"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    className="ml-4 bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600"
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </button>
            </div>

            {filterOpen && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <FiltrosTransacao />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className="py-3 px-6 text-left">Data</th>
                            <th className='py-3 px-6 text-left'>Data Pagamento</th>
                            <th className="py-3 px-6 text-left">Descrição</th>
                            <th className="py-3 px-6 text-left">Valor</th>
                            <th className="py-3 px-6 text-left">Categoria</th>
                            <th className="py-3 px-6 text-left">Tipo</th>
                            <th className="py-3 px-6 text-left">Banco</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentTransactions.map((transaction, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-6">{transaction.date}</td>
                                <td className="py-3 px-6">{transaction.datePag}</td>
                                <td className="py-3 px-6">{transaction.description}</td>
                                <td className="py-3 px-6">{transaction.value}</td>
                                <td className="py-3 px-6">{transaction.category}</td>
                                <td className="py-3 px-6">{transaction.type}</td>
                                <td className="py-3 px-6">{transaction.bank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className="text-gray-600">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="bg-orange-500 text-white p-2 rounded-lg focus:outline-none hover:bg-orange-600"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}
