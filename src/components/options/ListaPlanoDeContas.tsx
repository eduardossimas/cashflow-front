export function ListaPlanoDeContas() {
    const planoContas = [
        { description: 'Energia Elétrica', category: 'Despesas Fixas' },
        { description: 'Depósitos', category: 'Receitas' },
        { description: 'Taxas Cartão', category: 'Despesas Variáveis' },
        { description: 'Água', category: 'Despesas Fixas' },
    ]
    
    return (
        <div>
            <table className="bg-white w-full">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Descrição</th>
                        <th className="py-3 px-6 text-left">Categoria</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {planoContas.map((plano, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{plano.description}</td>
                            <td className="py-3 px-6">{plano.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}