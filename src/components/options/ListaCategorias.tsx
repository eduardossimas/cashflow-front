export function ListaCategorias() {
    const categoriasPlanoContas = [
        { description: 'Receitas', category: 'Receitas' },
        { description: 'Despesas', category: 'Despesas' },
        { description: 'Investimentos', category: 'Investimentos' },
        { description: 'Empréstimos', category: 'Empréstimos' },
        { description: 'Outros', category: 'Outros' }
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
                    {categoriasPlanoContas.map((plano, index) => (
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