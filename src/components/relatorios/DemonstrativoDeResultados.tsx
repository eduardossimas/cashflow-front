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

export function DemonstrativoDeResultados() {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl w-full">
            <h2 className="text-lg font-bold mb-4">Demonstrativo de Resultado</h2>
            <div className="overflow-x-auto">
                <table className="table-auto bg-white min-w-full border-separate border-spacing-0 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-2 px-2 text-left sticky left-0 bg-gray-100">Descrição</th>
                            {monthNames.map((month, i) => (
                                <th key={i} className="py-2 px-2 text-right">{month}</th>
                            ))}
                            <th className="py-2 px-2 text-right">Total</th>
                            <th className="py-2 px-2 text-right">%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="py-2 px-2 sticky left-0 bg-white">{row.description}</td>
                                {row.months.map((value, i) => (
                                    <td key={i} className="py-2 px-2 text-right">{value}</td>
                                ))}
                                <td className="py-2 px-2 text-right font-semibold">{row.total}</td>
                                <td className="py-2 px-2 text-right">{row.percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}