import { DemonstrativoDeResultados } from "./relatorios/DemonstrativoDeResultados";
import { ExportarDRE } from "./relatorios/ExportarDRE";
import { ExportarFluxoDeCaixa } from "./relatorios/ExportarFluxoDeCaixa";
import { FluxoDeCaixaDiario } from "./relatorios/FluxoDeCaixaDiario";
import { Title } from "./Title";

export function ReportsPage() {
    return(
        <div className="flex flex-col gap-4 mt-4 w-full max-w-full">
            <Title title="Relatórios" />
            <div className="flex flex-row gap-4">
                <ExportarDRE />
                <ExportarFluxoDeCaixa />
            </div>
            <DemonstrativoDeResultados />
            <FluxoDeCaixaDiario />
        </div>
    )
}