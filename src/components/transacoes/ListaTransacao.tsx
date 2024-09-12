import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FiltrosTransacao } from './FiltrosTransacao';
import { format } from 'date-fns';
import axios from 'axios';

interface Transacao {
    id: number;
    data: string;
    descricao: string;
    valor: number;
    categoria: string;
    tipo: string;
    bancoNome: string;
}

interface Banco {
    id: number;
    nome: string;
    dataInicio: string;
    saldo: number;
    transacoes: Transacao[];
}

export function ListaTransacao() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de itens por página

    const [transactions, setTransactions] = useState<Transacao[]>([]);

    // Carregar as transações ao montar o componente
    useEffect(() => {
        axios.get('http://localhost:3000/bancos')
            .then(response => {
                const bancos: Banco[] = response.data;

                // Mapeia as transações e inclui o nome do banco
                const todasTransacoes: Transacao[] = bancos.flatMap(banco =>
                    banco.transacoes.map(transacao => ({
                        ...transacao, // Mantém as propriedades da transação
                        bancoNome: banco.nome,  // Adiciona o nome do banco
                        categoria: transacao.categoria  // Mapeia a categoria
                    }))
                );

                setTransactions(todasTransacoes);
            })
            .catch(error => {
                console.error('Erro ao buscar os bancos:', error);
            });
    }, []);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Transações da página atual
    const transaction = transactions.slice(
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

    const handleDeleteTransaction = async (transacaoId: number) => {
        try {
            // Carregar os bancos atuais (pode ser necessário dependendo da sua lógica de estado)
            const response = await axios.get('http://localhost:3000/bancos');
            const bancos: Banco[] = response.data;
    
            // Encontrar o banco que contém a transação
            let bancoEncontrado = null;
            let transacoesAtualizadas: Transacao[] = [];
    
            for (const banco of bancos) {
                const transacaoExistente = banco.transacoes.find(transacao => transacao.id === transacaoId);
                if (transacaoExistente) {
                    bancoEncontrado = banco;
                    transacoesAtualizadas = banco.transacoes.filter(transacao => transacao.id !== transacaoId);
                    break;
                }
            }
    
            if (!bancoEncontrado) {
                throw new Error(`Transação com id ${transacaoId} não encontrada.`);
            }
    
            // Atualizar o banco com a lista de transações sem a transação excluída
            bancoEncontrado.transacoes = transacoesAtualizadas;
    
            // Enviar a requisição PUT para atualizar o banco no backend
            await axios.put(`http://localhost:3000/bancos/${bancoEncontrado.id}`, bancoEncontrado);
    
            setTransactions(transacoesAtualizadas);
    
            console.log(`Transação com id ${transacaoId} excluída com sucesso.`);
        } catch (error) {
            console.error(`Erro ao excluir a transação com id ${transacaoId}:`, error);
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
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-200 text-gray-600">
                        <tr>
                            <th className="py-3 px-6 text-left">Data</th>
                            <th className="py-3 px-6 text-left">Descrição</th>
                            <th className="py-3 px-6 text-left">Valor</th>
                            <th className="py-3 px-6 text-left">Categoria</th>
                            <th className="py-3 px-6 text-left">Banco</th>
                            <th className="py-3 px-6 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {transaction.map((transaction, index) => {
                            const dataValida = transaction.data && !isNaN(new Date(transaction.data).getTime());
                            const categoriaValida = transaction.categoria !== undefined && transaction.categoria !== null;
                            const bancoNomeValido = transaction.bancoNome !== undefined && transaction.bancoNome !== null;

                            console.log(`Transação ${index}: Data - ${transaction.data}, Data Válida - ${dataValida}, Categoria - ${transaction.categoria}, Categoria Válida - ${categoriaValida}, Banco Nome - ${transaction.bancoNome}, Banco Nome Válido - ${bancoNomeValido}`);

                            return (
                                <tr key={index} className="border-b">
                                    <td className="py-3 px-6">
                                        {dataValida ? format(new Date(transaction.data), 'dd/MM/yyyy') : 'Data Inválida'}
                                    </td>
                                    <td className="py-3 px-6">{transaction.descricao}</td>
                                    <td className={`py-3 px-6 ${transaction.tipo === 'entrada' ? 'text-green-500' : 'text-red-500'}`}>{`${transaction.tipo === 'entrada' ? '' : '-'}R$ ${transaction.valor}`}</td>
                                    <td className="py-3 px-6">{categoriaValida ? transaction.categoria : 'Categoria Inválida'}</td>
                                    <td className="py-3 px-6">{bancoNomeValido ? transaction.bancoNome : 'Banco Inválido'}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
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