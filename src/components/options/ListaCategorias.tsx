export function ListaCategorias() {
    const categoriasPlanoContas = [
        { description: 'Receitas', faixa: 'Receitas' },
        { description: 'Despesas', faixa: 'Despesas' },
        { description: 'Investimentos', faixa: 'Investimentos' },
        { description: 'Empréstimos', faixa: 'Empréstimos' },
        { description: 'Outros', faixa: 'Outros' }
    ]
    
    return (
        <div>
            <table className="bg-white w-full">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Descrição</th>
                        <th className="py-3 px-6 text-left">Faixa no DRE</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {categoriasPlanoContas.map((plano, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{plano.description}</td>
                            <td className="py-3 px-6">{plano.faixa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}