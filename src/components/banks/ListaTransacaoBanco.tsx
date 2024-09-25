import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
        <div className="p-4 bg-white rounded-lg shadow-lg w-full flex flex-col">
            <div className="flex-grow overflow-x-auto">
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
                                <td colSpan={4} className="py-3 px-6 text-center">Nenhuma transação encontrada</td>
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