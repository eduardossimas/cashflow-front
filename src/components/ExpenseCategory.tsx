import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ExpenseCategory() {
  const [timeframe, setTimeframe] = useState('month');

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  const getChartData = () => {
    let labels: string[] = [];
    let data: number[] = [];

    switch (timeframe) {
      case 'day':
        labels = ['Food', 'Transport', 'Rent', 'Entertainment', 'Others'];
        data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000));
        break;
      case 'month':
        labels = ['Food', 'Transport', 'Rent', 'Entertainment', 'Others'];
        data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5000));
        break;
      case 'year':
        labels = ['Food', 'Transport', 'Rent', 'Entertainment', 'Others'];
        data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 50000));
        break;
      default:
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: 'Categorias de Gastos',
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
        position: 'right' as const, // Muda a legenda para o topo
      },
    },
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-xl mt-8 lg:mt-4 lg:ml-12 w-full">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <h5>Categorias de Gastos</h5>
          <div className="flex space-x-4">
            <button
              onClick={() => handleTimeframeChange('day')}
              className={`p-2 text-sm ${timeframe === 'day' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
            >
              Dia
            </button>
            <button
              onClick={() => handleTimeframeChange('month')}
              className={`p-2 text-sm ${timeframe === 'month' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
            >
              Mês
            </button>
            <button
              onClick={() => handleTimeframeChange('year')}
              className={`p-2 text-sm ${timeframe === 'year' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
            >
              Ano
            </button>
          </div>
        </div>
        <span className="text-gray-600 text-[0.65rem]">1 Jan, 2024 - 31 Jan, 2024</span>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full h-[35vh]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
