import { BotaoPlanoDeContas } from "./BotaoPlanoDeContas";
import { ListaPlanoDeContas } from "./ListaPlanoDeContas";

export function PlanoDeContas() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl lg:w-1/2 lg:h-full">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Plano de Contas</h2>
                <ListaPlanoDeContas />
                <BotaoPlanoDeContas />
            </div>
        </div>
    )
}