import { useEffect, useState } from "react";
import axios from "axios";

interface LinhaDRE {
    description: string;
    months: number[];
    total: number;
}

export function DemonstrativoDeResultados() {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const [data, setData] = useState<LinhaDRE[]>([]);
    const [loading, setLoading] = useState(true);

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
        // Verifica se o valor é negativo e formata como número
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value); // Usa o valor absoluto para a formatação
    
        // Formata o valor como string com duas casas decimais
        let formattedValue = absoluteValue.toFixed(2).replace('.', ',');
    
        // Adiciona o sinal de negativo, se necessário
        if (isNegative) {
            return `- R$ ${formattedValue}`;
        } else {
            return `R$ ${formattedValue}`;
        }
    };    

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl w-full">
            <h2 className="text-lg font-bold mb-4">Demonstrativo de Resultado</h2>
            <div className="overflow-x-auto">
                <table className="table-auto bg-white min-w-full border-separate border-spacing-0 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-2 px-4 text-left sticky left-0 bg-gray-100 whitespace-nowrap">Descrição</th>
                            {monthNames.map((month, i) => (
                                <th key={i} className="py-2 px-4 text-right whitespace-nowrap">{month}</th>
                            ))}
                            <th className="py-2 px-4 text-right whitespace-nowrap">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={
                                    row.description === "Receita Líquida"
                                        ? 'bg-green-200 font-bold'
                                        : row.description === "Lucro Operacional"
                                        ? 'bg-blue-200 font-bold'
                                        : row.description === "Lucro Líquido"
                                        ? 'bg-orange-200 font-bold'
                                        : index % 2 === 0 ? 'bg-gray-50' : ''
                                }
                            >
                                <td className="py-2 px-4 text-left sticky left-0 bg-white whitespace-nowrap">{row.description}</td>
                                {row.months.map((value, i) => (
                                    <td key={i} className="py-2 px-4 text-right whitespace-nowrap">{formatCurrency(value)}</td>
                                ))}
                                <td className="py-2 px-4 text-right font-semibold whitespace-nowrap">{formatCurrency(row.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
