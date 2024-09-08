export function NovaCategoriaForm() {
    return (
        <div>
            <form className="flex flex-col gap-4">
                <label className="text-sm" htmlFor="description">Descrição</label>
                <input className="border border-gray-300 rounded-lg p-2" type="text" name="description" id="description" />
                <label className="text-sm" htmlFor="faixa">Faixa na DRE</label>
                <select className="border border-gray-300 rounded-lg p-2" name="faixa" id="faixa">
                    <option value="Receitas">Receitas</option>
                    <option value="Despesas">Despesas</option>
                    <option value="Investimentos">Investimentos</option>
                    <option value="Empréstimos">Empréstimos</option>
                    <option value="Outros">Outros</option>
                </select>
                <button className="bg-orange-500 text-white rounded-lg p-2 hover:bg-orange-600" type="submit">Adicionar</button>
            </form>
        </div>
    )
}