import { useEffect, useState } from "react";
import axios from "axios";

interface LinhaDRE {
    description: string;
    months: number[];
    total: number;
}

export function ExportarDRE() {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const [data, setData] = useState<LinhaDRE[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBancos = await axios.get('http://localhost:3000/bancos');
                const responsePlanoDeContas = await axios.get('http://localhost:3000/planoDeContas');
                
                processarDados(responseBancos.data, responsePlanoDeContas.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const processarDados = (bancos: any[], planoDeContas: any[]) => {
        const categoriasDRE = [
            { nome: 'Receitas', faixa: 'Receitas' },
            { nome: 'Deduções', faixa: 'Deduções' },
            { nome: 'Receita Líquida', faixa: 'Receita Líquida' },
            { nome: 'Custos Variáveis', faixa: 'Custos Variáveis' },
            { nome: 'Custos Fixos', faixa: 'Custos Fixos' },
            { nome: 'Lucro Operacional', faixa: 'Lucro Operacional' },
            { nome: 'Receitas Financeiras', faixa: 'Receitas Financeiras' },
            { nome: 'Despesas Financeiras', faixa: 'Despesas Financeiras' },
            { nome: 'Lucro Líquido', faixa: 'Lucro Líquido' }
        ];
    
        const tabela: LinhaDRE[] = categoriasDRE.map(categoria => ({
            description: categoria.nome,
            months: new Array(12).fill(0),
            total: 0,
        }));
    
        bancos.forEach((banco) => {
            banco.transacoes.forEach((transacao: { data: string | number | Date; categoria: string; tipo: string; valor: number; }) => {
                const dataTransacao = new Date(transacao.data);
                const mes = dataTransacao.getMonth();
    
                const planoConta = planoDeContas.find(conta => conta.categoria === transacao.categoria);
    
                if (planoConta) {
                    const linha = tabela.find(row => row.description === planoConta.faixa);
                    if (linha) {
                        linha.months[mes] += transacao.tipo === 'entrada' ? transacao.valor : -transacao.valor;
                    }
                }
            });
        });

        // Calcula totais
        tabela.forEach((row) => {
            row.total = row.months.reduce((acc, val) => acc + val, 0);
        });

        // Calcula Receita Líquida (Receitas - Deduções)
        const receitas = tabela.find(row => row.description === 'Receitas');
        const deducoes = tabela.find(row => row.description === 'Deduções');
        const receitaLiquida = tabela.find(row => row.description === 'Receita Líquida');

        if (receitas && deducoes && receitaLiquida) {
            receitaLiquida.months = receitas.months.map((valorReceita, index) => valorReceita + (deducoes?.months[index] || 0));
            receitaLiquida.total = receitaLiquida.months.reduce((acc, val) => acc + val, 0);
        }

        // Calcula Lucro Operacional (Receita Líquida - Custos Fixos - Custos Variáveis)
        const custosFixos = tabela.find(row => row.description === 'Custos Fixos');
        const custosVariaveis = tabela.find(row => row.description === 'Custos Variáveis');
        const lucroOperacional = tabela.find(row => row.description === 'Lucro Operacional');

        if (receitaLiquida && custosFixos && custosVariaveis && lucroOperacional) {
            lucroOperacional.months = receitaLiquida.months.map((valorLiquido, index) => valorLiquido + (custosFixos?.months[index] || 0) + (custosVariaveis?.months[index] || 0));
            lucroOperacional.total = lucroOperacional.months.reduce((acc, val) => acc + val, 0);
        }

        // Calcula Lucro Líquido (Lucro Operacional + Receitas Financeiras - Despesas Financeiras)
        const receitasFinanceiras = tabela.find(row => row.description === 'Receitas Financeiras');
        const despesasFinanceiras = tabela.find(row => row.description === 'Despesas Financeiras');
        const lucroLiquido = tabela.find(row => row.description === 'Lucro Líquido');

        if (lucroOperacional && receitasFinanceiras && despesasFinanceiras && lucroLiquido) {
            lucroLiquido.months = lucroOperacional.months.map((valorOperacional, index) => valorOperacional + (receitasFinanceiras?.months[index] || 0) - (despesasFinanceiras?.months[index] || 0));
            lucroLiquido.total = lucroLiquido.months.reduce((acc, val) => acc + val, 0);
        }

        setData(tabela);
    };

    const formatCurrency = (value: number) => {
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value);
        let formattedValue = absoluteValue.toFixed(2).replace('.', ',');
        if (isNegative) {
            return `- R$ ${formattedValue}`;
        } else {
            return `R$ ${formattedValue}`;
        }
    };

    const handleExport = () => {
        const headers = ['Descrição', ...monthNames, 'Total'];
        const csvContent = [
            headers.join(';'),
            ...data.map(row => [
                row.description,
                ...row.months.map(val => formatCurrency(val)),
                formatCurrency(row.total)
            ].join(';'))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `DRE_${selectedYear}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl lg:w-3/12">
            <h2 className="text-lg font-bold mb-4"> Exportar DRE</h2>
            <div className="mt-6">
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
                    Escolha o ano:
                </label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="border rounded px-2 py-1 w-full mb-4"
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
                <button
                    onClick={handleExport}
                    className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
                >
                    Exportar como CSV
                </button>
            </div>
        </div>
    );
}
