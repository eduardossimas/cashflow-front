import { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

interface CategoriaGastosBancoProps {
  selectedBank: number;
}

export function CategoriaGastosBanco({ selectedBank }: CategoriaGastosBancoProps) {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const firstDay = `1 ${month}, ${year}`;
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const lastDayFormatted = `${lastDay} ${month}, ${year}`;

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);

  selectedBank++

  useEffect(() => {
    axios.get('http://localhost:3000/bancos')
      .then(response => {
        const bancos: Banco[] = response.data;

        // Encontra o banco selecionado
        const bancoSelecionado = bancos.find(banco => banco.id == selectedBank);

        if (bancoSelecionado) {
          // Mapeia as transações do banco selecionado
          const todasTransacoes = bancoSelecionado.transacoes.map(transacao => ({
            ...transacao, // Mantém as propriedades da transação
            bancoNome: bancoSelecionado.nome,  // Adiciona o nome do banco
          }));

          setTransacoes(todasTransacoes);
        } else {
          setTransacoes([]);
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os bancos:', error);
        setLoading(false);
      });
  }, [selectedBank]);

  const getChartData = () => {
    const categoriaMap: Record<string, number> = {};

    // Agrega os gastos por categoria
    transacoes.forEach(transacao => {
      if (transacao.tipo === 'saida') {
        if (!categoriaMap[transacao.categoria]) {
          categoriaMap[transacao.categoria] = 0;
        }
        categoriaMap[transacao.categoria] += transacao.valor;
      }
    });

    const labels = Object.keys(categoriaMap);
    const data = Object.values(categoriaMap);

    return {
      labels,
      datasets: [
        {
          label: 'Total Gasto',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const data = getChartData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const, // Muda a legenda para o lado direito
      },
    },
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (transacoes.length === 0) {
    return (
      <div className="p-6 rounded-lg bg-white shadow-xl w-full h-full flex flex-col">
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <h5>Categorias de Gastos</h5>
          </div>
          <span className="text-gray-600 text-[0.65rem]">1 Jan, 2024 - 31 Jan, 2024</span>
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <span className="text-gray-600 text-[1rem]">Sem transações cadastradas</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white shadow-xl max-h-min w-full h-full">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <h5>Categorias de Gastos</h5>
        </div>
        <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full h-[35vh]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
