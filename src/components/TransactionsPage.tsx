import { ResumoTransacao } from "./transacoes/ResumoTransacao";
import { Title } from "./Title";
import { ListaTransacao } from "./transacoes/ListaTransacao";
import { NovaTransacaoBotao } from "./transacoes/NovaTransacaoBotao";

export function TransactionsPage() {
    return(
        <div className="flex flex-col gap-4 mt-4">
            <Title title="Transações" />
            <div className="lg:flex lg:flex-row lg:content-between lg:relative">
                <ResumoTransacao />
                <div className="lg:absolute lg:bottom-0 lg:right-0 mt-5">
                    <NovaTransacaoBotao />
                </div>
            </div>
            <ListaTransacao />
        </div>
    )
}