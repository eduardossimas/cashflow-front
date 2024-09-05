import { Title } from "../Title";
import { NovoBancoForm } from "./NovoBancoForm";

export function NovoBancoPage() {
    return (
        <div className="mt-4 flex flex-col gap-10">
            <Title title="Novo Banco" />
            <strong className="text-2xl">Novo Banco</strong>
            <NovoBancoForm />
        </div>
    )
}