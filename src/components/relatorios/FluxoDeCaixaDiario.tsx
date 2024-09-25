import { useState, useEffect } from 'react';
import axios from 'axios';

export function FluxoDeCaixaDiario() {
  const [bancoDados, setBancoDados] = useState<any>(null); // Dados dos bancos
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [selectedBanco, setSelectedBanco] = useState<string>(''); // Banco selecionado
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // Mês selecionado
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Ano selecionado

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  // Buscar os dados dos bancos com Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bancos'); // Substitua pela URL do seu JSON Server
        setBancoDados(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          setSelectedBanco(response.data[0].id); // Define o primeiro banco como selecionado inicialmente
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtra as transações por intervalo de dias
  const filterTransacoes = (transacoes: any[], startDate: Date, endDate: Date) => {
    return transacoes.filter((transacao) => {
      const transacaoDate = new Date(transacao.data);
      return transacaoDate >= startDate && transacaoDate <= endDate;
    });
  };

  // Função para preparar os dados da tabela para o banco selecionado
  const getTableDataForBank = (banco: any) => {
    let fluxoDeCaixa: any[] = [];
    let saldoAcumulado = banco.saldoInicio; // Começa com o saldo inicial do banco

    const lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // Último dia do mês selecionado

    // Gerar dias do mês e calcular saldos diários
    for (let day = 1; day <= lastDay; day++) {
      const startDate = new Date(selectedYear, selectedMonth, day);
      const endDate = new Date(selectedYear, selectedMonth, day + 1);
      const filteredTransacoes = filterTransacoes(banco.transacoes, startDate, endDate);

      // Calcula o saldo diário e acumula o saldo
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

  // Função para manipular a seleção de banco
  const handleBancoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBanco(event.target.value);
  };

  // Função para manipular a seleção de mês
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  // Função para manipular a seleção de ano
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Encontra o banco selecionado
  const bancoSelecionado = bancoDados.find((banco: any) => banco.id === selectedBanco);

  return (
    <div className="p-6 rounded-lg bg-white shadow-xl w-full">
      <h2 className="text-lg font-bold mb-4">Fluxo de Caixa</h2>

      {/* Filtros de seleção de banco, mês e ano */}
      <div className="flex gap-6 mb-4">
        {/* Selecionar Banco */}
        <div>
          <label htmlFor="bancoSelect" className="block mb-2 text-sm font-medium text-gray-700">Selecione o Banco:</label>
          <select
            id="bancoSelect"
            value={selectedBanco}
            onChange={handleBancoChange}
            className="border rounded px-2 py-1 w-full"
          >
            {bancoDados.map((banco: any) => (
              <option key={banco.id} value={banco.id}>
                {banco.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Mês */}
        <div>
          <label htmlFor="monthSelect" className="block mb-2 text-sm font-medium text-gray-700">Selecione o Mês:</label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 w-full"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Ano */}
        <div>
          <label htmlFor="yearSelect" className="block mb-2 text-sm font-medium text-gray-700">Selecione o Ano:</label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
            className="border rounded px-2 py-1 w-full"
          >
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela do banco selecionado */}
      {bancoSelecionado ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left">Dia</th>
                <th className="py-2 px-3 text-right">Entradas</th>
                <th className="py-2 px-3 text-right">Saídas</th>
                <th className="py-2 px-3 text-right">Saldo Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {getTableDataForBank(bancoSelecionado).map((item) => (
                <tr key={item.dia} className={item.dia % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 px-3">{item.dia}</td>
                  <td className="py-2 px-3 text-right text-green-600">R$ {item.entradas}</td>
                  <td className="py-2 px-3 text-right text-red-500">R$ {item.saidas}</td>
                  <td className="py-2 px-3 text-right">R$ {item.saldoAcumulado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum banco encontrado.</p>
      )}
    </div>
  );
}
