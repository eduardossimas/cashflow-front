import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CategoriaGastosBanco() {
  // Função para obter os dados do gráfico
  const getChartData = () => {
    const labels = ['Food', 'Transport', 'Rent', 'Entertainment', 'Others'];
    const data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5000));

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
        position: 'right' as const,
      },
    },
  };

  // Função para formatar o texto do período do gráfico
  const formatDateRange = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    return `1 ${month}, ${year} - ${now.getDate()} ${month}, ${year}`;
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-xl w-full h-min">
      <div className="flex flex-col mb-4">
        <h5>Categorias de Gastos</h5>
        <span className="text-gray-600 text-[0.65rem]">{formatDateRange()}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full h-[35vh]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
