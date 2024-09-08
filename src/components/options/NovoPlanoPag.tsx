import { Title } from "../Title";
import { NovoPlanoForm } from "./NovoPlanoForm";

export function NovoPlanoPag() {
    return (
        <div>
            <div className="mt-4 flex flex-col gap-10">
                <Title title="Novo Plano de Contas" />
                <strong className="text-2xl">Novo Plano de Contas</strong>
                <NovoPlanoForm />
            </div>
        </div>
    )
}