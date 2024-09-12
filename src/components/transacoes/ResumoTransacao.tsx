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

export function ResumoTransacao() {
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
        <div className="flex gap-4">
            <div className="p-6 rounded-lg bg-white shadow-xl w-auto">
                <div className="flex flex-col mb-6">
                    <h5>Entradas</h5>
                    <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
                </div>
                <strong className="text-xl lg:text-base">R$ {totalEntradas.toFixed(2)}</strong>
            </div>

            <div className="p-6 rounded-lg bg-white shadow-xl w-auto">
                <div className="flex flex-col mb-6">
                    <h5>Saídas</h5>
                    <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
                </div>
                <strong className="text-xl lg:text-base">R$ {totalSaidas.toFixed(2)}</strong>
            </div>
        </div>
    )
}