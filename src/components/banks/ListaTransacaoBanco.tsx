import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FiltrosTransacaoBanco } from './FiltrosTransacaoBanco';
import { format } from 'date-fns';
import axios from 'axios';

interface Transacao {
    descricao: string;
    valor: number;
    categoria: string;
    data: string;
    tipo: string;
}

interface Banco {
    id: string;
    nome: string;
    dataInicio: string;
    saldo: number;
    transacoes: Transacao[];
}

interface ListaTransacaoBancoProps {
    selectedBank: number;
}

export function ListaTransacaoBanco({ selectedBank }: ListaTransacaoBancoProps) {
    const [transactions, setTransactions] = useState<Transacao[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de itens por página

    selectedBank = selectedBank + 1;

    useEffect(() => {
        axios.get('http://localhost:3000/bancos')
            .then(response => {
                const bancos: Banco[] = response.data;
                const bancoSelecionado = bancos.find(banco => banco.id === String(selectedBank));

                if (bancoSelecionado) {
                    setTransactions(bancoSelecionado.transacoes);
                } else {
                    console.error('Banco selecionado não encontrado');
                }

                console.log('Transações:', bancoSelecionado?.transacoes);
            })
            .catch(error => {
                console.error('Erro ao buscar as transações:', error);
            });
    }, [selectedBank]);

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
                    <FiltrosTransacaoBanco />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className='py-3 px-6 text-left'>Data</th>
                            <th className="py-3 px-6 text-left">Descrição</th>
                            <th className="py-3 px-6 text-left">Valor</th>
                            <th className="py-3 px-6 text-left">Categoria</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentTransactions.length > 0 ? (
                            currentTransactions.map((transaction, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-6">{format(new Date(transaction.data), 'dd/MM/yyyy')}</td>
                                    <td className="py-3 px-6">{transaction.descricao}</td>
                                    <td className={`py-3 px-6 ${transaction.tipo === 'entrada' ? 'text-green-500' : 'text-red-500'}`}>{`${transaction.tipo === 'entrada' ? '' : '-'}R$ ${transaction.valor}`}</td>
                                    <td className="py-3 px-6">{transaction.categoria}</td>
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
