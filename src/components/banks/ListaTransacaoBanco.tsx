import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FiltrosTransacaoBanco } from './FiltrosTransacaoBanco';
import axios from 'axios';

interface Transaction {
    description: string;
    value: number;
    category: string;
    date: string;
    datePag: string;
    type: string;
    bank: number;
}

interface ListaTransacaoBancoProps {
    selectedBank: number;
}

export function ListaTransacaoBanco({ selectedBank }: ListaTransacaoBancoProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de itens por página

    useEffect(() => {
        axios.get('http://localhost:3000/transactions').then(responde => {
            setTransactions(responde.data);
        }).catch(error => {
            console.error('Erro ao buscar as transações:', error);
        })
    }, []);

    // Função para filtrar as transações com base na pesquisa
    const filteredTransactions = transactions.filter(transactions => transactions.bank === (selectedBank+1)).filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    // Transações da página atual
    const currentTransactions = filteredTransactions.slice(
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
                    <FiltrosTransacaoBanco />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className='py-3 px-6 text-left'>Data Pagamento</th>
                            <th className="py-3 px-6 text-left">Descrição</th>
                            <th className="py-3 px-6 text-left">Valor</th>
                            <th className="py-3 px-6 text-left">Categoria</th>
                            <th className="py-3 px-6 text-left">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentTransactions.length > 0 ? (
                            currentTransactions.map((transaction, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-6">{transaction.datePag}</td>
                                    <td className="py-3 px-6">{transaction.description}</td>
                                    <td className="py-3 px-6">{transaction.value}</td>
                                    <td className="py-3 px-6">{transaction.category}</td>
                                    <td className="py-3 px-6">{transaction.type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-3 px-6 text-center">Nenhuma transação encontrada</td>
                            </tr>
                        )}
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
