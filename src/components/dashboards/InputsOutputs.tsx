import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function InputsOutputs() {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const firstDay = `1 ${month}, ${year}`;
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const lastDayFormatted = `${lastDay} ${month}, ${year}`;

  const [bancoDados, setBancoDados] = useState<any>(null); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento

  // Função para buscar os dados com Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bancos'); // Substitua pela URL do seu JSON Server
        setBancoDados(response.data); // Armazena os dados no estado
        setLoading(false); // Desativa o loading quando os dados são carregados
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false); // Desativa o loading também em caso de erro
      }
    };

    fetchData();
  }, []);

  // Função para filtrar as transações dentro de um intervalo de datas
  const filterTransacoes = (transacoes: any[], startDate: Date, endDate: Date) => {
    return transacoes.filter((transacao) => {
      const transacaoDate = new Date(transacao.data);
      return transacaoDate >= startDate && transacaoDate < endDate; // Ajuste de comparação
    });
  };

  // Função para preparar os dados de entradas e saídas para o gráfico
  const getChartData = () => {
    let labels: Array<number> = [];
    let dataEntradas: number[] = [];
    let dataSaidas: number[] = [];

    if (!bancoDados || bancoDados.length === 0) return { labels, datasets: [] }; // Verifica se os dados foram carregados

    // Inicializa os arrays de entradas e saídas com 0
    labels = Array.from({ length: lastDay }, (_, i) => i + 1); // Dias do mês
    dataEntradas = new Array(lastDay).fill(0);
    dataSaidas = new Array(lastDay).fill(0);

    // Itera sobre todos os bancos
    bancoDados.forEach((banco: any) => {
      const { transacoes } = banco;

      if (transacoes && transacoes.length > 0) {
        // Para cada dia do mês, calcula as entradas e saídas
        labels.forEach((day) => {
          const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1);
          const filteredTransacoes = filterTransacoes(transacoes, startDate, endDate);

          // Soma as entradas e saídas no dia
          filteredTransacoes.forEach((t) => {
            if (t.tipo === 'entrada') {
              dataEntradas[day - 1] += t.valor;
            } else if (t.tipo === 'saida') {
              dataSaidas[day - 1] += t.valor;
            }
          });
        });
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Entradas',
          data: dataEntradas,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Saídas',
          data: dataSaidas,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Começar do 0 no eixo Y
      },
    },
  };

  // Verifica se os dados estão carregando
  if (loading) {
    return <div>Carregando...</div>; // Exibe um indicador de carregamento enquanto os dados não chegam
  }

  // Obtém os dados para o gráfico
  const data = getChartData();

  // Retorna o JSX do componente
  return (
    <div className="p-6 rounded-lg bg-white shadow-xl w-full">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <h5>Entradas e Saídas</h5>
        </div>
        <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}