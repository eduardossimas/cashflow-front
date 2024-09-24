import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export function Cashflow() {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const firstDay = `1 ${month}, ${year}`;
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const lastDayFormatted = `${lastDay} ${month}, ${year}`;

  const [bancoDados, setBancoDados] = useState<any>(null); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento
  const [isXL, setIsXL] = useState(false); // Estado para detectar se a tela é extra grande

  // Função para buscar os dados com Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bancos'); // Substitua pela URL do JSON Server
        setBancoDados(response.data); // Armazena os dados no estado
        setLoading(false); // Desativa o loading quando os dados são carregados
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false); // Desativa o loading também em caso de erro
      }
    };

    fetchData();
  }, []);

  // Hook para detectar o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsXL(window.innerWidth >= 1280); // Define como extra grande se a largura da tela for maior ou igual a 1280px
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Chama a função uma vez para definir o estado inicial

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Função para filtrar as transações dentro de um intervalo de datas
  const filterTransacoes = (transacoes: any[], startDate: Date, endDate: Date) => {
    return transacoes.filter((transacao) => {
      const transacaoDate = new Date(transacao.data);
      return transacaoDate >= startDate && transacaoDate <= endDate;
    });
  };

  // Função para preparar os dados para o gráfico
  const getChartData = () => {
    let labels: Array<number> = []; // Garantir que os labels são números
    let data: number[] = [];
    let saldoAcumulado = 0; // Variável para manter o saldo acumulado inicial

    if (!bancoDados) return { labels, datasets: [] }; // Verifica se os dados foram carregados

    // Encontra o banco "Nubank"
    const bancoSelecionado = bancoDados.find((banco: any) => banco.nome === 'Nubank') || { saldoInicio: 0, saldo: 0, transacoes: [] };

    const { saldoInicio, transacoes } = bancoSelecionado;
    saldoAcumulado = saldoInicio; // Começa com o saldo inicial do banco

    const currentDate = new Date();
    labels = Array.from({ length: 31 }, (_, i) => i + 1); // Dias do mês
    data = labels.map((day) => {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1);
      const filteredTransacoes = filterTransacoes(transacoes, startDate, endDate);

      // Calcula o saldo diário e acumula o saldo
      saldoAcumulado += filteredTransacoes.reduce((acc, t) => acc + (t.tipo === 'entrada' ? t.valor : -t.valor), 0);
      return saldoAcumulado;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Saldo Acumulado',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Esconder a legenda
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Garante que o eixo Y comece do 0
        min: 0, // Define o valor mínimo para o eixo Y como 0
        ticks: {
          maxTicksLimit: isXL ? 20 : 10, // Aumenta o número de pontos no eixo Y se a tela for extra grande
        },
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
    <div className="p-6 rounded-lg bg-white shadow-xl w-full h-full flex flex-col">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <h5>Fluxo de Caixa</h5>
        </div>
        <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="w-full h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}