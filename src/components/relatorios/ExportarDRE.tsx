import { useState } from 'react';

// Exemplo de dados, você pode ajustar para usar os dados reais do seu sistema
const data = [
    {
        description: 'Receita Bruta',
        months: ['90.864,00', '77.616,31', '76.660,90', '81.546,00', '89.033,36', '72.056,50', '57.293,45', '0,00', '0,00', '0,00', '0,00', '0,00'],
        total: '545.070,52',
        percentage: '100%',
    },
    {
        description: 'Deduções Sobre Vendas',
        months: ['3.967,00', '4.784,39', '4.911,09', '5.142,79', '5.856,21', '114,73', '75,76', '0,00', '0,00', '0,00', '0,00', '0,00'],
        total: '24.851,97',
        percentage: '5%',
    },
    {
        description: 'Receita Líquida',
        months: ['86.897,00', '72.831,92', '71.749,81', '76.403,21', '83.177,15', '71.941,77', '57.217,69', '0,00', '0,00', '0,00', '0,00', '0,00'],
        total: '520.218,55',
        percentage: '95%',
    },
    // Adicione mais dados conforme necessário
];

export function ExportarDRE() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleExport = () => {
        const headers = ['Descrição', ...['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], 'Total', '%'];

        // Cria o conteúdo do CSV
        const csvContent = [
            headers.join(';'), // Cabeçalhos
            ...data.map(row => [
                row.description,
                ...row.months,
                row.total,
                row.percentage
            ].join(';'))
        ].join('\n'); // Junta todas as linhas do CSV

        // Cria um Blob com o conteúdo CSV e faz o download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `DRE_${selectedYear}.csv`;
        a.click();
        URL.revokeObjectURL(url);  // Limpa o URL temporário
    };

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl lg:w-3/12">
            <h2 className="text-lg font-bold mb-4">Exportar DRE</h2>
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
                    {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
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
