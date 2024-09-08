export function ExportarFluxoDeCaixa() {
    return (
        <div className="p-6 rounded-lg bg-white shadow-xl lg:w-3/12">
            <h2 className="text-lg font-bold mb-4">Exportar Fluxo de Caixa</h2>
            <div className="lg:flex lg:flex-row gap-4">
                <div className="mb-4">
                    <label htmlFor="months" className="block mb-2 text-sm font-medium text-gray-700">
                        Escolha o mês:
                    </label>
                    <select
                        id="months"
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
                        Escolha o ano:
                    </label>
                    <select
                        id="year"
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
            </div>
            <button
                className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            >
                Exportar como CSV
            </button>
        </div>
    )
}