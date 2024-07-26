export function Resume() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const firstDay = `1 ${month}, ${year}`;
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const lastDayFormatted = `${lastDay} ${month}, ${year}`;

    return (
        <div className="p-6 rounded-lg bg-white shadow-xl max-h-min max-w-min lg:max-w-min lg:max-h-36 lg:ml-12">
            <div className="flex flex-col mb-6">
                <h5>Resumo</h5>
                <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
            </div>

            <div className="flex gap-4 lg:gap-12">
                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$6.300,00</strong>
                    <span className="text-xs">Entradas</span>
                </div>

                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$3.150,00</strong>
                    <span className="text-xs">Saída</span>
                </div>

                <div className="flex flex-col">
                    <strong className="text-sm lg:text-base">R$3.150,00</strong>
                    <span className="text-xs whitespace-nowrap">Lucro Líquido</span>
                </div>
            </div>
        </div>
    );
}