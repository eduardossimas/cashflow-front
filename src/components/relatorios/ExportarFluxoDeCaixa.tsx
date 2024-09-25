import { useState, useEffect } from "react";
import axios from "axios";

export function ExportarFluxoDeCaixa() {
    const [bancoDados, setBancoDados] = useState<any[]>([]); // Dados dos bancos
    const [selectedBanco, setSelectedBanco] = useState<string>(''); // Banco selecionado
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mês atual
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Ano atual
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const months = [
        { label: 'Janeiro', value: 1 },
        { label: 'Fevereiro', value: 2 },
        { label: 'Março', value: 3 },
        { label: 'Abril', value: 4 },
        { label: 'Maio', value: 5 },
        { label: 'Junho', value: 6 },
        { label: 'Julho', value: 7 },
        { label: 'Agosto', value: 8 },
        { label: 'Setembro', value: 9 },
        { label: 'Outubro', value: 10 },
        { label: 'Novembro', value: 11 },
        { label: 'Dezembro', value: 12 }
    ];

    // Buscar os dados dos bancos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/bancos'); // Substitua pela URL do seu servidor
                setBancoDados(response.data);
                setLoading(false);
                if (response.data.length > 0) {
                    setSelectedBanco(response.data[0].id); // Define o primeiro banco como selecionado inicialmente
                }
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Função para filtrar as transações por data
    const filterTransacoes = (transacoes: any[], startDate: Date, endDate: Date) => {
        return transacoes.filter((transacao) => {
            const transacaoDate = new Date(transacao.data);
            return transacaoDate >= startDate && transacaoDate <= endDate;
        });
    };

    // Função para preparar os dados do fluxo de caixa para o banco selecionado
    const getFluxoDeCaixa = (banco: any) => {
        let fluxoDeCaixa: any[] = [];
        let saldoAcumulado = banco.saldoInicio; // Começa com o saldo inicial do banco

        const lastDay = new Date(selectedYear, selectedMonth, 0).getDate(); // Último dia do mês selecionado

        for (let day = 1; day <= lastDay; day++) {
            const startDate = new Date(selectedYear, selectedMonth - 1, day); // Ajuste do mês (devido à base 0 no JavaScript)
            const endDate = new Date(selectedYear, selectedMonth - 1, day + 1);

            const filteredTransacoes = filterTransacoes(banco.transacoes, startDate, endDate);

            const entradas = filteredTransacoes
                .filter((transacao) => transacao.tipo === 'entrada')
                .reduce((acc, t) => acc + t.valor, 0);

            const saidas = filteredTransacoes
                .filter((transacao) => transacao.tipo === 'saida')
                .reduce((acc, t) => acc + t.valor, 0);

            saldoAcumulado += entradas - saidas;

            fluxoDeCaixa.push({
                dia: day,
                entradas: entradas.toFixed(2),
                saidas: saidas.toFixed(2),
                saldoAcumulado: saldoAcumulado.toFixed(2),
            });
        }

        return fluxoDeCaixa;
    };

    // Função para exportar como CSV
    const handleExport = () => {
        const bancoSelecionado = bancoDados.find((banco) => banco.id === selectedBanco);

        if (!bancoSelecionado) {
            console.error("Banco selecionado não encontrado");
            return;
        }

        const fluxoDeCaixa = getFluxoDeCaixa(bancoSelecionado);

        const headers = ['Dia', 'Entradas', 'Saídas', 'Saldo Acumulado'];
        const csvContent = [
            headers.join(';'),
            ...fluxoDeCaixa.map(item =>
                `${item.dia};R$ ${item.entradas};R$ ${item.saidas};R$ ${item.saldoAcumulado}`
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `FluxoDeCaixa_${selectedMonth}_${selectedYear}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl lg:w-5/12">
            <h2 className="text-lg font-bold mb-4">Exportar Fluxo de Caixa</h2>
            <div className="lg:flex lg:flex-row gap-4">
                <div className="mb-4">
                    <label htmlFor="months" className="block mb-2 text-sm font-medium text-gray-700">
                        Escolha o mês:
                    </label>
                    <select
                        id="months"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="border rounded px-2 py-1 w-full"
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
                        Escolha o ano:
                    </label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="border rounded px-2 py-1 w-full"
                    >
                        {[...Array(5)].map((_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="bancoSelect" className="block mb-2 text-sm font-medium text-gray-700">
                        Selecione o Banco:
                    </label>
                    <select
                        id="bancoSelect"
                        value={selectedBanco}
                        onChange={(e) => setSelectedBanco(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        {bancoDados.map((banco) => (
                            <option key={banco.id} value={banco.id}>
                                {banco.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={handleExport}
                className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            >
                Exportar como CSV
            </button>
        </div>
    );
}
