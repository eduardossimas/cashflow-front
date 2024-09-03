import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function InputsOutputs() {
  const [timeframe, setTimeframe] = useState('month');

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  const getChartData = () => {
    let labels: Array<string | number> = [];
    let dataEntradas: number[] = [];
    let dataSaidas: number[] = [];
    
    switch (timeframe) {
      case 'day':
        labels = Array.from({ length: 31 }, (_, i) => i + 1);
        dataEntradas = Array.from({ length: 31 }, () => Math.floor(Math.random() * 5000));
        dataSaidas = Array.from({ length: 31 }, () => Math.floor(Math.random() * 5000));
        break;
      case 'month':
        labels = Array.from({ length: 12 }, (_, i) => i + 1);
        dataEntradas = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000));
        dataSaidas = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000));
        break;
      case 'year':
        const currentYear = new Date().getFullYear();
        labels = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
        dataEntradas = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5000));
        dataSaidas = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5000));
        break;
      default:
        break;
    }
    
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

  const data = getChartData();

  return (
    <div className="p-6 rounded-lg bg-white shadow-xl w-full">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <h5>Entradas e Saídas</h5>
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
        <div className="w-full h-full">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}
