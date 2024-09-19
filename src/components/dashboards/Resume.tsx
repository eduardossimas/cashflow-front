import { useEffect, useState } from "react";
import axios from "axios";

interface Banco {
    id: string; 
    nome: string;
    saldo: number;
    transacoes: Transacao[];
}
interface Transacao {
    id: number;
    data: string;
    descricao: string;
    valor: number;
    categoria: string;
    tipo: string;
}

export function Resume() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    const firstDay = `1 ${month}, ${year}`;
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const lastDayFormatted = `${lastDay} ${month}, ${year}`;

    const [transactions, setTransactions] = useState<Transacao[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/bancos')
            .then(response => {
                const banks: Banco[] = response.data;

                const allTransactions: Transacao[] = banks.flatMap(bank =>
                    bank.transacoes.map(transaction => ({
                        ...transaction
                    }))
                );

                setTransactions(allTransactions);
            })
            .catch(error => {
                console.error('Erro ao buscar os bancos:', error);
            });
    })

    const entradas = transactions.filter(transaction => transaction.tipo === 'entrada');
    const totalEntradas = entradas.reduce((acc, transaction) => acc + transaction.valor, 0);

    const saidas = transactions.filter(transaction => transaction.tipo === 'saida');
    const totalSaidas = saidas.reduce((acc, transaction) => acc + transaction.valor, 0);

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl w-full">
            <div className="flex flex-col mb-6">
                <h5>Resumo</h5>
                <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$ {totalEntradas.toFixed(2)}</strong>
                    <span className="text-xs">Entradas</span>
                </div>

                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$ {totalSaidas.toFixed(2)}</strong>
                    <span className="text-xs">Saída</span>
                </div>

                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$ {(totalEntradas-totalSaidas).toFixed(2)}</strong>
                    <span className="text-xs whitespace-nowrap">Lucro Líquido</span>
                </div>
            </div>
        </div>
    );
}
